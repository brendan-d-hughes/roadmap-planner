import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  const projects = await prisma.project.findMany();
  console.log('Projects:', projects);
}

main().catch(console.error);
