import { Module } from '@nestjs/common';
import { ImagesStorageService } from './images-storage.service';

@Module({
  controllers: [],
  providers: [ImagesStorageService],
  exports: [ImagesStorageService],
})
export class StorageModule {}
