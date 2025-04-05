import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerService } from './shared/presentation/swagger/swagger.service';
import { Logger } from 'nestjs-pino';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  app.useLogger(app.get(Logger));
  
  SwaggerService.setup(app);
  await app.listen(process.env.NODE_PORT ?? 3000);
}
bootstrap();
