import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const origins = process.env.FRONTEND_URL?.split(',').map((s) => s.trim());
  app.enableCors({ origin: origins ?? true });
  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
}
bootstrap();
