// All Auth interface
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

// All dashboard interface
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

export const MACHINE_DATA: Machine[] = [
  {
    plant: "Pune",
    platform: "Excavators",
    model: "JCB124495",
    vin: "ABC74549330",
    hours: "1000"
  },
  {
    plant: "Pune",
    platform: "Excavators",
    model: "JCB124495",
    vin: "ABC74549330",
    hours: "1000"
  }
];

export const USER_DATA: User[] = [
  {
    plant: "Pune",
    role: "Operators",
    user: "Ankit K",
    phone: "1234567890"
  },
  {
    plant: "Pune",
    role: "Operators",
    user: "Ankit K",
    phone: "1234567890"
  }
];

export const ENDURANCE_CYCLE_DATA: EnduranceCycle[] = [
  {
    activity: "Digging",
    instructions:
      "Lorem Ipsum is simply dummy text of the printing and typesetting ",
    hours: "3000"
  },
  {
    activity: "Pune",
    instructions:
      "Lorem Ipsum is simply dummy text of the printing and typesetting ",
    hours: "4000"
  }
];

interface SecretQuestion {
  identification: string;
  question: string;
}

export interface SecretQuestions extends Array<SecretQuestion> {}
