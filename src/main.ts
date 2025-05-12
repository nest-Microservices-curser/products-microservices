import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { envs } from './config';


async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    //configuracion de la conexion con el microservicio
    transport: Transport.NATS,
    options: {
      // port: envs.port
      servers: envs.natsServers
    }
  });
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,// remove any extra fields that are not in the DTO
      forbidNonWhitelisted: true,// throw an error if extra fields are presents
    }
  ));
  await app.listen();
  logger.log(`product microservice is running on ${envs.port}`);
}
bootstrap();
