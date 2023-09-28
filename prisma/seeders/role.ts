import CONSTANTS from '../../src/config/constants';
import logger from '../../src/util/logger';
import { prisma } from '../seed';

const data = [
  {
    id: 1,
    name: 'Super Admin'
  },
  {
    id: 2,
    name: 'Org Admin'
  },
  {
    id: 3,
    name: 'Admin'
  },
  {
    id: 4,
    name: 'Employee'
  }
];

export default async function main() {
  for (const ele of data) {
    try {
      await prisma.roles.create({ data: ele });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.code === CONSTANTS.PRISMA.PRIMARY) {
        logger.info(`${ele.name} skipped due to it's presence`);
        continue;
      }
    }
  }
}
