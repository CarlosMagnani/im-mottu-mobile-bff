import { Module } from '@nestjs/common';
import { SwaggerModule } from './shared/presentation/swagger/swagger.module';
import { GlobalExceptionFilter } from './shared/infrastructure/exception-filters/global-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
@Module({
  imports: [SwaggerModule],
  controllers: [AppController],
  providers: [
    {
        provide: APP_FILTER,
        useClass: GlobalExceptionFilter,
    }
  ],
})
export class AppModule {}

