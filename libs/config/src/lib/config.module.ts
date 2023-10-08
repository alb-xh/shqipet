import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import { getEnvFile } from '@shqipet/common';

@Module({
  imports: [ NestConfigModule.forRoot({ isGlobal: true, envFilePath: getEnvFile()  }) ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
