import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle('TODO API')
  .setDescription('The todos API endpoints')
  .setVersion('1.0')
  .build();
