import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function start() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1/library');
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  const PORT = process.env.PORT ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('Library service API')
    .setDescription('Junior Backend Development Task. REST API documentation.')
    .setVersion('1.0')
    .addTag('Vladislav Kondakov')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/library/api/doc', app, document);

  await app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
  });
}

start();
