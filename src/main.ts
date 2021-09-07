import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function start() {
  const PORT = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  await app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
  });
}

start();
