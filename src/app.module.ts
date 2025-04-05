import { Module } from '@nestjs/common';
import { SwaggerModule } from './shared/presentation/swagger/swagger.module';
import { GlobalExceptionFilter } from './shared/infrastructure/exception-filters/global-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { LoggerModule } from 'nestjs-pino';
@Module({
  imports: [SwaggerModule,
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        level: process.env.LOG_LEVEL || 'info',
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              options: {
                colorize: true,
                singleLine: true,
                translateTime: true,
              },
            },
            {
              target: 'pino/file',
              options: {
                destination: 'logs/app.log',
                level: 'error',
                maxSize: 1000000,
                maxFiles: 2,
                ignore: 'pid,hostname',
                compress: true,
                timestamp: true,
                singleLine: true,
                colorize: true,
              },
            },
          ],
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
        provide: APP_FILTER,
        useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}

