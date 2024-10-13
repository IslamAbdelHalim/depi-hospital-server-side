import AppError from '../utils/appError.js';

export function ErrorRoutes(req, res, next) {
  next(new AppError(`can not find this url ${req.originalUrl}`, 404));
}

export function globalErrorHandling(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorClient(err, res);
  }
}

function sendErrorDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
}

// send to the client less details
function sendErrorClient(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}
