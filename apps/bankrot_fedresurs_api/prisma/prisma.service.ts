import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';

const modelsWithSoftDeleteField = Prisma.dmmf.datamodel.models.filter((model) =>
  model.fields.some((field) => field.name === 'deleted_at')
);

function getExtendedClient() {
  const client = () =>
    new PrismaClient().$extends(
      // But this version prisma-extension-soft-delete breaks prisma.$transaction
      createSoftDeleteExtension({
        models: Object.fromEntries(
          modelsWithSoftDeleteField.map((model) => [model.name, true])
        ),
        defaultConfig: {
          field: 'deleted_at',
          createValue: (deleted) => {
            if (deleted) return new Date();
            return null;
          }
        }
      })
    );

  return class {
    // wrapper with type-safety 🎉
    constructor() {
      return client();
    }
  } as new () => ReturnType<typeof client>;
}

@Injectable()
export class PrismaService extends getExtendedClient() implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
