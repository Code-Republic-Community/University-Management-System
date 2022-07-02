import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = await app.get(ConfigService);
  const port = config.get<number>('PORT');
  const apiConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('University Management System')
    .setDescription('The University Management System API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, apiConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port || 3000, () => {
    console.log(`listening in ${port || 3000}`);
  });
}
bootstrap();
