// SERVER ADDRESS TO BE FETCHED FROM app.config.json
export const URLS = {
  HTTP_BASE_URL: "http://localhost:8082/"
};

// API'S FOR USER AND APP CONFIG RELATED STUFF
export const LOGIN = "/api/v1/endurance-local/user/login";
export const REGISTRATION = "/api/v1/endurance-local/user/register";
export const LOGOUT = "/api/v1/endurance-local/user/logout";
export const FORGOT_PASSWORD = "/api/v1/endurance-local/user/forgotpassword";
export const RESET_PASSWORD = "/api/v1/endurance-local/user/resetpassword";

// API'S FOR USER DASHBOARD RELATED STUFF
export const GET_ACTIVITY = "/api/v1/endurance-local/dashboard/getactivity";
export const GET_ALL_USERS = "/api/v1/endurance-local/dashboard/getallusers";
export const GET_MODELS = "/api/v1/endurance-local/dashboard/getmodels";
export const GET_PLANTS = "/api/v1/endurance-local/dashboard/getplants";
export const GET_PLATFORMS = "/api/v1/endurance-local/dashboard/getplatforms";
export const GET_PROJECT_DETAILS =
  "/api/v1/endurance-local/dashboard/getprojectdetails";
export const GET_PROJECT_LIST =
  "/api/v1/endurance-local/dashboard/getprojectlist";
export const GET_USER_ROLES = "/api/v1/endurance-local/dashboard/getuserroles";
export const GET_NEW_MACHINE = "/api/v1/endurance-local/dashboard/newmachine";
export const GET_NEW_PROJECT = "/api/v1/endurance-local/dashboard/newproject";
