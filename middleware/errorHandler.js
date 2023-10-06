import CustomError from "../service/CustomError";

const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      status: false,
      error: {
        status: error.statusCode,
        message: error.message,
      },
    });
  } else {
    res.status(500).json({
      status: false,
      error: {
        status: 500,
        message: "Internal server error",
      },
    });
  }
};

export default errorHandler;
