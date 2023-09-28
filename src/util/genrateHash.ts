import bcrypt from 'bcrypt';

export default (plainPassword: string, salt: string) => {
  return bcrypt.hashSync(plainPassword, salt);
};
