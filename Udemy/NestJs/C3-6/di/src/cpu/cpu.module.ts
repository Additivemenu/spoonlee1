import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  imports: [PowerModule],   // easy to see the module dependency
  providers: [CpuService],
  exports: [CpuService],
})
export class CpuModule {}
