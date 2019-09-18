import { UserLoginResponse } from "src/app/services";

export class User {
  constructor(
    private accessToken: string,
    public bucketAccesskey: string,
    public bucketSecretkey: string,
    public country: string,
    public email: string,
    public firstName: string,
    public image: string,
    public isSecretQuestion: boolean,
    public lastName: string,
    public number: string,
    public roleName: string,
    public smsLanguage: string,
    public sysGenPassword: boolean,
    public thumbnail: string,
    public timeZone: string,
    public lastLoginTime: string
  ) {}

  get token() {
    //Check is token is exits or not
    return this.accessToken;
  }
}
