import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiModule } from './api/api.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import passport from '@fastify/passport';
import fastifySecureSession from '@fastify/secure-session';
import fastifyMultipart from '@fastify/multipart';
import { BackgroundJobsModule } from './background-jobs/background-jobs.module';

const rolesMapBootstrap = {
  api: async () => {
    const port = process.env.PORT || 3000;

    const app = await NestFactory.create<NestFastifyApplication>(
      ApiModule,
      new FastifyAdapter()
    );
    app.enableShutdownHooks();

    // Setup @fastify/passport with @fastify/secure-session
    // @ts-ignore
    await app.register(fastifySecureSession, {
      secret: process.env?.SECURE_SESSIONS_SECRET,
      salt: process.env?.SECURE_SESSIONS_SALT
    });
    // @ts-ignore
    await app.register(passport.initialize());
    // @ts-ignore
    await app.register(passport.secureSession());

    // Setup @fastify/multipart
    // @ts-ignore
    await app.register(fastifyMultipart, {
      limits: {
        fieldNameSize: 1024, // Max field name size in bytes
        fieldSize: 65535, // Max field value size in bytes
        fields: 100, // Max number of non-file fields
        fileSize: 2 * 1024 * 1024, // For multipart forms, the max file size
        files: 100, // Max number of file fields
        headerPairs: 2000, // Max number of header key=>value pairs
        parts: 1000 // For multipart forms, the max number of parts (fields + files)
      }
    });

    app.setGlobalPrefix('api');
    // CORS: Allow `*`
    app.enableCors({
      allowedHeaders: '*',
      origin: '*'
    });
    // Enable Swagger
    const options = new DocumentBuilder()
      .setTitle('Swagger')
      .setDescription(
        'Bankrupt REST API (by default all methods require an auth-token)'
      )
      .setVersion('1.0')
      .addBearerAuth(
        {
          description: `Enter token in following format: Bearer <JWT>`,
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header'
        },
        'access-token'
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        tagsSorter: 'alpha',
        operationsSorter: 'alpha'
      }
    });
    // Global DTO validation setup
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (errors) => {
          const response = Object.fromEntries(
            errors.map((i) => [i.property, Object.values(i.constraints)[0]])
          );

          throw new BadRequestException(response);
        }
      })
    );

    await app.listen(port || 3000, '0.0.0.0');

    return app;
  },
  backgroundJobs: async () => {
    return await NestFactory.createApplicationContext(BackgroundJobsModule);
  }
};

async function bootstrap() {
  const appRole = (process.env?.CONTAINER_ROLE ||
    'api') as keyof typeof rolesMapBootstrap;

  const app = await rolesMapBootstrap[appRole]();
}
bootstrap();
