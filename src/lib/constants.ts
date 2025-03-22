export const ERROR_DETAILS = {
  SERVER_ERROR: "The server is currently unavailable. Please try again later.",
  SERVER_TIMEOUT: "The server took too long to respond.",
  NOT_FOUND: (resource = "item") =>
    `The ${resource} you are looking for no longer exists.`,
  INVALID_CREDENTIALS: "Invalid username or password",
} as const
