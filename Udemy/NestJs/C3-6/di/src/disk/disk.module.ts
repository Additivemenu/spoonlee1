import { Module } from '@nestjs/common';
import { DiskService } from './disk.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  imports: [PowerModule], // easy to see the module dependency
  providers: [DiskService],
  exports: [DiskService],
})
export class DiskModule {}
