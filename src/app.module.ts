import { Module } from '@nestjs/common';
import { SwaggerModule } from './shared/presentation/swagger/swagger.module';
import { GlobalExceptionFilter } from './shared/infrastructure/exception-filters/global-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { LoggerModule } from 'nestjs-pino';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import configuration from './shared/infrastructure/config/configuration';
import { PairsModule } from './modules/pairs/pairs.module';
@Module({
  imports: [SwaggerModule,
    PairsModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      ttl: 60,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
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
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}

