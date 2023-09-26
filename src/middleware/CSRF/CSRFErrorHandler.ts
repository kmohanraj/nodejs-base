import express from 'express';
import { CSRFEvents } from '../../util/logger';

const CSRFHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }

  // Logging CSRF Failure events for incident response
  CSRFEvents.info(`{info: "Token Tampered", cause: ${err}}`);
  return res.status(403).json({ status: 403, message: 'CSRF Token Tampered' });
};

export default CSRFHandler;
