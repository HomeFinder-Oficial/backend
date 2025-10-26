import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

// Database
import { DatabaseModule } from './database/database.module';

// Adapters
import { PasswordAdapter } from './adapters/password.adapter';
import { JwtAdapter } from './adapters/jwt.adapter';
import { PrismaUserRepository } from './adapters/prisma-user.repository';

// HTTP Server
import { AuthController } from './http-server/controllers/auth.controller';
import { UserController } from './http-server/controllers/user.controller';
import { JwtStrategy } from './http-server/strategies/jwt.strategy';
import { JwtAuthGuard } from './http-server/guards/jwt-auth.guard';

// Core
import { CoreModule } from '../core/core.module';

// Ports
import { USER_REPOSITORY } from '../core/domain/ports/user.repository';
import { PASSWORD_SERVICE } from '../core/domain/ports/password.service';
import { TOKEN_SERVICE } from '../core/domain/ports/token.service';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/logger.config';

@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(configService.get<string>('JWT_EXPIRATION_SECONDS')),
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    CoreModule,
  ],
  controllers: [AuthController, UserController],
  providers: [
    {
      provide: PASSWORD_SERVICE,
      useClass: PasswordAdapter,
    },
    {
      provide: TOKEN_SERVICE,
      useClass: JwtAdapter,
    },
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [USER_REPOSITORY, PASSWORD_SERVICE, TOKEN_SERVICE],
})
export class InfrastructureModule { }
