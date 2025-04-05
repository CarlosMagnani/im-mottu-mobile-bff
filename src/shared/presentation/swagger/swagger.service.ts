import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerService {
  static setup(app: INestApplication): void {
    try {
      const config = new DocumentBuilder()
        .setTitle('API')
        .setDescription('API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
      const documentFactory = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api', app, documentFactory);
    } catch (error: unknown) {
      console.error('Failed to setup Swagger:', error);
      throw error;
    }
  }
}