import bcrypt from 'bcrypt';

export default (saltRounds: number): string => {
  return bcrypt.genSaltSync(saltRounds);
};
