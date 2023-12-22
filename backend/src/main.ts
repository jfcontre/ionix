import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT || 3000;

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('swagger', app, document)

  app.enableCors({
    origin: 'http://localhost:3001',
  });
  await app.listen(port);
}
bootstrap();
