import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors(); // Наш CORS
  
  // Меняем порт на 3001
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();