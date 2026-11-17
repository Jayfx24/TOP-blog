export const  ErrorCode = {
  // Generic HTTP error codes
  Unauthorized : "unauthorized_error",
  Forbidden : "forbidden_error",
  NotFound : "not_found_error",
  BadRequest : "bad_request_error",
  InternalServerError : "internal_server_error",

  
  IncorrectUsernamePassword : "incorrect-username-password",
  UserNotFound : "user-not-found",
  IncorrectPassword : "incorrect-password",
} as const
