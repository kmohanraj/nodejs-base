import { PrismaClient } from '@prisma/client';
import logger from '../src/util/logger';
import userSeeder from '../prisma/seeders/user';
import roleSeeder from '../prisma/seeders/role';

export const prisma = new PrismaClient();

async function main() {
  await roleSeeder();
  logger.info('[Success] Role seed data updated');
  await userSeeder();
  logger.info('[Success] User seed data updated');
}

main()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
