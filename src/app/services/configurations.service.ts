/* THIS FILE CONTAINS ALL THE STRUCTURAL INTERFACES OF JCB-ENDURANCE-TESTING APPLICATION */

// All Auth modules interface
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
  lastLoginTime: string;
}

export interface ForgetPasswordRequest {
  email: string;
  resetPasswordUrl: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

// All dashboard modules interface
export interface ProjectType {
  value: string;
  viewValue: string;
}

export interface NewMachineRequest {
  description: string;
  machineName: string;
  modelId: string;
  platformId: string;
  vin: string;
}

export interface Machine {
  plant: string;
  platform: string;
  model: string;
  vin: string;
  hours: string;
}

export interface User {
  plant: string;
  role: string;
  user: string;
  phone: string;
}

export interface EnduranceCycle {
  activity: string;
  instructions: string;
  hours: string;
}

interface SecretQuestion {
  identification: string;
  question: string;
}

export interface SecretQuestions extends Array<SecretQuestion> {}
