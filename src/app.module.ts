import { Module } from '@nestjs/common';
import { SwaggerModule } from './shared/presentation/swagger/swagger.module';

@Module({
  imports: [SwaggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

