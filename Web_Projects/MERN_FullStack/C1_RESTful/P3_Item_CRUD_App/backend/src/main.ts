import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// ! did we set cors?
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with options to allow all access
  app.enableCors({
    origin: '*', // Allows all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.useGlobalPipes(new ValidationPipe()); // for dto validation
  await app.listen(8080);
}
bootstrap();
