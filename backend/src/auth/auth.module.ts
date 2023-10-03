import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users /users.module';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthService, SessionSerializer, LocalStrategy],
})
export class AuthModule {}
