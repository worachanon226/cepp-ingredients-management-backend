import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { appConfig } from 'config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (appConfig().version == 'TEST') {
    const config = new DocumentBuilder()
      .setTitle('Ingredients-management')
      .setDescription('Ingredients-management API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  app.enableCors();

  await app.listen(appConfig().port || 3000);
}
bootstrap();
