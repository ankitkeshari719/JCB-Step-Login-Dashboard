export interface RoleType {
  value: string;
  viewValue: string;
}

export interface Locations {
  value: string;
  viewValue: string;
}

export interface UserRegistrationRequest {
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  roleName: string;
  loginUrl: string;
}

export interface UserLoginRequest {
  enableNotification: boolean;
  os: string;
  password: string;
  pushNotificationToken: string;
  email: string;
}

export interface UserLoginResponse {
  accessToken: string;
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  image: string;
  thumbnail: string;
  country: string;
  smsLanguage: string;
  timeZone: string;
  sysGenPassword: boolean;
  roleName: string;
  bucketAccesskey: string;
  bucketSecretkey: string;
  isSecretQuestion: boolean;
}

export interface forgetPasswordRequest {
  email: string;
  resetPasswordUrl: string;
}

export interface resetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface ForgotUserNameRequest {
  email: string;
  mobileNumber: string;
  questions: [
    {
      answer: string;
      identification: string;
      question: string;
    }
  ];
}

interface SecretQuestion {
  identification: string;
  question: string;
}

export interface SecretQuestions extends Array<SecretQuestion> {}
