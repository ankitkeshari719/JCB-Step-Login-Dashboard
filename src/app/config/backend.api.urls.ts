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
