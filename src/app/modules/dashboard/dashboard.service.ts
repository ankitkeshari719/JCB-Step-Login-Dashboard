import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  createUrl,
  getHeader,
  handleError,
  modifyResponse,
  NewMachineRequest
} from "src/app/services";
import { GET_NEW_MACHINE } from "src/app/config/backend.api.urls";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  title = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) {}

  public setTitle(newTitle: string) {
    this.title.next(newTitle);
  }

  /**
   * Gets dashboard data (GET all activities, all users, all models,
   * all plants, all platform, all projects, all user roles   )
   * @param URL Get the url of the API
   * @returns Return the data a/c to th url
   */
  getDashboardData(URL: string) {
    return this.http.get(createUrl(URL), { headers: getHeader() }).pipe(
      catchError((unauthorizedResponse: any) => {
        return handleError(unauthorizedResponse, URL);
      }),
      map(response => {
        return modifyResponse(response);
      })
    );
  }

  /**
   * Adds new machine
   * @param machineEntryRequest
   * @returns
   */
  addNewMachine(machineEntryRequest: NewMachineRequest) {
    return this.http
      .post(createUrl(GET_NEW_MACHINE), machineEntryRequest, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_NEW_MACHINE);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }
}
