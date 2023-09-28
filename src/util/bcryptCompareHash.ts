import bcrypt from 'bcrypt';

export default (plainData: string, hashedData: string): boolean => {
  return bcrypt.compareSync(plainData, hashedData);
};
