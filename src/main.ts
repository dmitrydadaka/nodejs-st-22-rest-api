import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(3000);
  
  process.on('uncaughtException', (error, origin) => {
    console.error(`captured error: ${error.message}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any, promise) => {
    console.error(`Unhandled rejection detected: ${reason}`);
  });
}
bootstrap();
