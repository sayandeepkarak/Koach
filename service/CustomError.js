class CustomError {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
  static unauthorized(message = "Unauthorized data") {
    return new CustomError(401, message);
  }
  static forbidden(message = "Expired data") {
    return new CustomError(403, message);
  }
  static notFoundError(message = "No data found") {
    return new CustomError(404, message);
  }
  static conflictData(message = "Data already exist") {
    return new CustomError(409, message);
  }
  static invalidData(message = "Invalid data") {
    return new CustomError(422, message);
  }
  static invalidToken(message = "Invalid token") {
    return new CustomError(498, message);
  }
}

export default CustomError;
