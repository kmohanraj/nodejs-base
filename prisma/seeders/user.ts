import { Prisma } from '@prisma/client';
import logger from '../../src/util/logger';
import { prisma } from '../seed';
import CONSTANTS from '../../src/config/constants';

const data: Prisma.usersUncheckedCreateInput[] = [
  {
    id: 1,
    name: 'Super Admin',
    email: 'superadmin@gmail.com',
    password: '$2a$10$BOPJZWbu/PPXZXDcU4t7gumtCRsEHBdeikbolL1xXhdJNN/wTYt6y',
    phone: '9876543210',
    created_by: 'SYSTEM',
    updated_by: 'SYSTEM',
    role_id: 1,
    isFirstLogin: false
  }
  // {
  //   id: 2,
  //   name: 'Org Admin',
  //   email: 'orgadmin@gmail.com',
  //   password: '$2a$10$BOPJZWbu/PPXZXDcU4t7gumtCRsEHBdeikbolL1xXhdJNN/wTYt6y',
  //   phone: '9876543210',
  //   created_by: 'SYSTEM',
  //   updated_by: 'SYSTEM',
  //   role_id: 2
  // },
  // {
  //   id: 3,
  //   name: 'Admin',
  //   email: 'admin@gmail.com',
  //   password: '$2a$10$BOPJZWbu/PPXZXDcU4t7gumtCRsEHBdeikbolL1xXhdJNN/wTYt6y',
  //   phone: '9876543210',
  //   created_by: 'SYSTEM',
  //   updated_by: 'SYSTEM',
  //   role_id: 3
  // },
  // {
  //   id: 4,
  //   name: 'Employee',
  //   email: 'emp@gmail.com',
  //   password: '$2a$10$BOPJZWbu/PPXZXDcU4t7gumtCRsEHBdeikbolL1xXhdJNN/wTYt6y',
  //   phone: '9876543210',
  //   created_by: 'SYSTEM',
  //   updated_by: 'SYSTEM',
  //   role_id: 4
  // }
];

export default async function main() {
  for (const ele of data) {
    try {
      await prisma.users.create({ data: ele });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.code === CONSTANTS.PRISMA.PRIMARY) {
        logger.info(`${ele.name} is skipped due to its presence`);
        continue;
      }
    }
  }
}
