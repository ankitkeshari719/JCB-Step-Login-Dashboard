import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { ToastrService } from "ngx-toastr";

import {
  UserLoginRequest,
  InternalResponse,
  createUrl,
  getHeader,
  handleError,
  modifyResponse,
  UserRegistrationRequest,
  forgetPasswordRequest,
  UserLoginResponse,
  INTERNAL_RESPONSE_STATUS,
  BACKEND_RESPONSE_STATUS,
  resetPasswordRequest
} from "src/app/services";
import {
  LOGIN,
  REGISTRATION,
  FORGOT_PASSWORD,
  LOGOUT,
  RESET_PASSWORD
} from "src/app/config/backend.api.urls";
import { Router } from "@angular/router";
import { User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  /**
   * Logins user
   * @param loginDetails
   * @returns user
   */
  loginUser(loginDetails: UserLoginRequest) {
    return this.http
      .post(createUrl(LOGIN), loginDetails, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, LOGIN);
        }),
        map(response => {
          if (response.status === BACKEND_RESPONSE_STATUS[2]) {
            return modifyResponse(response);
          }
          this.handleAuthentication(response);
        })
      );
  }

  /**
   * Registers user
   * @param reqDetails
   * @returns user
   */
  registerUser(
    reqDetails: UserRegistrationRequest
  ): Observable<InternalResponse> {
    return this.http
      .post(createUrl(REGISTRATION), reqDetails, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, REGISTRATION);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Logouts user service
   */
  logout() {
    return this.http.get(createUrl(LOGOUT), { headers: getHeader() }).pipe(
      catchError((unauthorizedResponse: any) => {
        return handleError(unauthorizedResponse, LOGOUT);
      }),
      map(response => {
        if (response.status === BACKEND_RESPONSE_STATUS[0]) {
          this.user.next(null);
        }
        return modifyResponse(response);
      })
    );
  }

  /**
   * Forgots password
   * @param userName
   * @returns
   */
  forgotPassword(reqDetails: forgetPasswordRequest) {
    return this.http
      .post(createUrl(FORGOT_PASSWORD), reqDetails, { headers: getHeader() })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, FORGOT_PASSWORD);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  resetPassword(reqDetails: resetPasswordRequest) {
    return this.http
      .post(createUrl(RESET_PASSWORD), reqDetails, { headers: getHeader() })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, FORGOT_PASSWORD);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  handleAuthentication(responsedata: UserLoginResponse) {
    const user = new User(
      responsedata.accessToken,
      responsedata.bucketAccesskey,
      responsedata.bucketSecretkey,
      responsedata.country,
      responsedata.email,
      responsedata.firstName,
      responsedata.image,
      responsedata.isSecretQuestion,
      responsedata.lastName,
      responsedata.number,
      responsedata.roleName,
      responsedata.smsLanguage,
      responsedata.sysGenPassword,
      responsedata.thumbnail,
      responsedata.timeZone
    );
    this.user.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
    this.toastr.success("Login Successful!");
    this.router.navigate(["/dashboard"]);
  }

  autoLogin() {
    const userData: {
      accessToken: string;
      bucketAccesskey: string;
      bucketSecretkey: string;
      country: string;
      email: string;
      firstName: string;
      image: string;
      isSecretQuestion: boolean;
      lastName: string;
      number: string;
      roleName: string;
      smsLanguage: string;
      sysGenPassword: boolean;
      thumbnail: string;
      timeZone: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.accessToken,
      userData.bucketAccesskey,
      userData.bucketSecretkey,
      userData.country,
      userData.email,
      userData.firstName,
      userData.image,
      userData.isSecretQuestion,
      userData.lastName,
      userData.number,
      userData.roleName,
      userData.smsLanguage,
      userData.sysGenPassword,
      userData.thumbnail,
      userData.timeZone
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }
}
