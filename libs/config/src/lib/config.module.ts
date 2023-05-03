import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';

const envFilePath = process.env['NODE' + '_ENV'] === 'production' ? '.prod.env' : '.dev.env';

@Module({
  imports: [ NestConfigModule.forRoot({ isGlobal: true, envFilePath  }) ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
