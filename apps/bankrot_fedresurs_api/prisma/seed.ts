import { PrismaClient, Prisma } from '@prisma/client';
import { dictOkopf } from './seed/dictOkopf';
import { dictRegion } from './seed/dictRegion';
import { dictSro } from './seed/dictSro';
import { dictArbitrationCourts } from './seed/dictArbitrationCourts';
import { dictMessageTypes } from './seed/dictMessageTypes';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  await prisma.dictRegion.createMany({ data: dictRegion });
  console.log(`Created regions dictionary`);
  await prisma.dictSro.createMany({ data: dictSro });
  console.log(`Created SRO dictionary`);
  await prisma.dictArbitrationCourts.createMany({ data: dictArbitrationCourts });
  console.log(`Created arbitration courts dictionary`);
  for (const data of dictOkopf) {
    const okopf = await prisma.dictOkopf.create({
      data
    });
    console.log(`Created okopf with id: ${okopf.id}`);
  }
  for (const data of dictMessageTypes) {
    const messageType = await prisma.dictMessageTypes.create({
      data
    });
    console.log(`Created message type with id: ${messageType.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
