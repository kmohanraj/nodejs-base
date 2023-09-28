import express from 'express';

export type IErrorStatus = 400 | 500 | 409;

export default (
  status: IErrorStatus,
  message: string,
  res: express.Response
) => {
  return res.status(status).json({ status, info: message });
};
