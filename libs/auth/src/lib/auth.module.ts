import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { GoogleAuthService } from './google-auth.service';

@Module({
  imports: [ConfigModule],
  providers: [GoogleAuthService],
  exports: [GoogleAuthService],
})
export class AuthModule {}
