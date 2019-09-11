import { authorization_key, content_type } from "./../config/const";
import { HttpHeaders } from "@angular/common/http";
import { of } from "rxjs";

export enum BACKEND_RESPONSE_STATUS {
  "SUCCESS",
  "FAILURE",
  "ERROR"
}

export const enum INTERNAL_RESPONSE_STATUS {
  "FAILED",
  "FAILURE",
  "SUCCESS"
}

export interface InternalResponse {
  status: INTERNAL_RESPONSE_STATUS;
  success_data?: any;
  success_message?: any;
  error_message?: string;
  error_params?: {};
  code?: number;
}

/**
 * MODIFYING RESPONSE TO INTERNAL RESPONSE FOR CONSUMING IN COMPONENTS
 * @param response HOLDS THE BACKEND RESPONSE OBJECT
 */
export function modifyResponse(response: any): InternalResponse {
  console.log("response--->", response);
  // SUCCESS && FAILURE
  if (
    response.status === BACKEND_RESPONSE_STATUS[0] ||
    response.status === BACKEND_RESPONSE_STATUS[1]
  ) {
    return {
      status:
        response.status === BACKEND_RESPONSE_STATUS[0]
          ? INTERNAL_RESPONSE_STATUS.SUCCESS
          : INTERNAL_RESPONSE_STATUS.FAILURE,
      success_data: response.data ? response.data : "",
      success_message: response.message
    };
  } else if (response.status === BACKEND_RESPONSE_STATUS[2]) {
    // ERROR: THE BACKEND RETURED AN UNSUCCESSFUL RESPONSE CODE
    let errorParamsObj = {};
    if (response.errorResponse.messageParams.length) {
      response.errorResponse.messageParams.forEach(
        (key: string, index: number) => {
          errorParamsObj[index] = key;
        }
      );
    }

    return {
      status: INTERNAL_RESPONSE_STATUS.FAILED,
      error_message:
        response.error_code === 417
          ? response.error_messgae
          : response.errorResponse.message,
      code: response.errorResponse.code,
      error_params: errorParamsObj
    };
  } else if (response) {
    // SUCCESS WITH ONLY RESPONSE
    return {
      status: INTERNAL_RESPONSE_STATUS.SUCCESS,
      success_data: response
    };
  }
}

/**
 * HANDLE THE ERROR INTERNAL RESPONSE FOR CONSUMING IN COMPONENTS
 * @param errorRes HOLDS THE BACKEND RESPONSE OBJECT
 * @param url HOLDS THE REQUESTED URL
 */
export function handleError(errorRes: any, url: string) {
  errorRes.errorResponse.messageParams.push(url);
  return of(errorRes);
}

/**
 * Gets header
 * @returns
 */
export function getHeader() {
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append("Content-Type", content_type);
  headers = headers.append("Authorization", authorization_key);
  return headers;
}

export function createUrl(url: string, params: string[] = []): string {
  params.forEach((param, index) => {
    url = url.replace("$" + (index + 1), param);
  });
  return url;
}
