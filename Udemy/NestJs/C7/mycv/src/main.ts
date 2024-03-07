import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session'); // old way of importing

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cookieSession({
      keys: ['asdfgh'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // stripe out any other fields that is not defined in the DTO
    }),
  );
  
  await app.listen(3000);
}
bootstrap();
