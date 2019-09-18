import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { User } from "./user.model";

import {
  UserLoginRequest,
  InternalResponse,
  createUrl,
  getHeader,
  handleError,
  modifyResponse,
  UserRegistrationRequest,
  ForgetPasswordRequest,
  UserLoginResponse,
  BACKEND_RESPONSE_STATUS,
  ResetPasswordRequest
} from "src/app/services";
import {
  LOGIN,
  REGISTRATION,
  FORGOT_PASSWORD,
  LOGOUT,
  RESET_PASSWORD
} from "src/app/config/backend.api.urls";
import { Router } from "@angular/router";

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
   * FUNCTION TO LOGIN WITH VALID CREDENCIAL
   * @param loginDetails HOLDS THE REQUIRED LOGIN REQUEST DETAILS
   * @returns user: OBJECT CONTAIN ALL THE DATA OF LOGGED-IN USER
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
   * FUNCTION REGISTER NEW USER
   * @param reqDetails HOLDS THE REQUIRED REGISTER DETAILS
   * @returns SUCCESSFUL/FAILDED MESSAGE
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
   * FUNCTION TO LOGOUT THE USER
   * @returns SUCCESSFUL/FAILDED MESSAGE
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
   * FUNCTION THAT HELPS TO FORGETED PASSWORD USER
   * @param userName: VALID EMAIL OF USER
   * @returns SUCCESSFUL/FAILDED MESSAGE
   */
  forgotPassword(reqDetails: ForgetPasswordRequest) {
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

  /**
   *FUNCTION THAT HELPS TO RESET PASSWORD USER
   * @param reqDetails HOLDS THE REQUIRED REQUEST DETAILS
   * @returns  SUCCESSFUL/FAILDED MESSAGE
   */
  resetPassword(reqDetails: ResetPasswordRequest) {
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

  /**
   * FUNCTION THAT HELPS THE USER TO AUTO LOGIN ON REFRESH IF THE TOKEN IS VALID
   * @returns
   */
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
      lastLoginTime: string;
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
      userData.timeZone,
      userData.lastLoginTime
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  /**
   * FUNCTION TO HANDLE THE RESPONSE OF LOGIN REST API CALL
   * @param responsedata HOLD THE RESPONSE OF LOGIN REST API CALL
   */
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
      responsedata.timeZone,
      responsedata.lastLoginTime
    );
    this.user.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
    this.toastr.success("Login Successful!");
    this.router.navigate(["/dashboard"]);
  }
}
