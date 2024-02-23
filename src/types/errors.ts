const ErrorDetails = {
  SERVER_ERROR:
    "Something went wrong, the server is currently unavailable, please try again later",
  NOT_FOUND: "The campground you are looking for does not exist",
  INVALID_CREDENTIALS: "Invalid username or password",
  FAILED_REGISTER: "Network error: Failed to register user",
  FAILED_LOGIN: "Network error: Failed to login user",
} as const

export default ErrorDetails
