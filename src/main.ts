import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('API de Livros')
  .setDescription('Documentação da API de livros com Swagger')
  .setVersion('1.0')
  .addTag('users')
  .addBearerAuth({ //Esquema JWT Bearer
    type:'http',
    scheme: 'bearer',
    bearerFormat:'JWT',
    name: 'Authorization',
    in: 'header'
  })
  .build()
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )
  
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
  
  await app.listen(3001);
}
bootstrap();
