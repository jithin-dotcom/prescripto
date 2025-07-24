

export const StatusMessage = {
  OK: "Success",
  CREATED: "Resource created",
  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Resource not found",
  INTERNAL_SERVER_ERROR: "Internal server error",

  MISSING_DATA: "userData and profileData are required",
  NO_CONTENT: "Resource deleted successfully ",
  MISSING_ID: "ID is missing",
} as const
