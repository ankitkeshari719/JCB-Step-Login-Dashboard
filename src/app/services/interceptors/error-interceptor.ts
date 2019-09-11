import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error("An error occurred:", err);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(err);
          console.error(
            `Backend returned code ${err.error.code}, body was: ${err.message}`
          );
        }
        return throwError({
          status: "ERROR",
          error_code: err.error.code ? err.error.code : err.error.status,
          error_messgae: err.error.message,
          errorResponse: {
            message: err.message || err.statusText,
            messageParams: []
          }
        });
      })
    );
  }
}
