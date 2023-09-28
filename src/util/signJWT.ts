import jwt from 'jsonwebtoken';

interface IPayload {
  userId?: number;
  role_id?: number;
}

export default (payload: IPayload, key: string, expiryTime: number) => {
  return jwt.sign(payload, key, {
    expiresIn: expiryTime
  });
};
