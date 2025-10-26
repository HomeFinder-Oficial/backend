import { NestFactory } from '@nestjs/core';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

async function bootstrap() {
  const app = await NestFactory.create(InfrastructureModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Application running on: ${await app.getUrl()}`);
}
bootstrap();
