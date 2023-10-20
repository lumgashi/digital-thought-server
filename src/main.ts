import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { AllConfigTypes } from 'types/config.types';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import validationOptions from './utils/validation.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  //It allows class-validator to use NestJS dependency injection container.
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const serviceConfig = app.get(ConfigService<AllConfigTypes>);

  //useful in scenarios where you need to perform cleanup or execute specific actions when your NestJS application is shutting down, such as releasing resources, closing connections, or saving state.
  app.enableShutdownHooks();

  // setting a global prefix for all routes in your application
  app.setGlobalPrefix(
    serviceConfig.getOrThrow('app.apiPrefix', { infer: true }),
    { exclude: ['/'] },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe(validationOptions));
  await app.listen(3000);
}
bootstrap();
