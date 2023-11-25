import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],    // providers are only accessible inside the module
  exports: [PowerService]   // we want to export the PowerService so that other modules can use it
})
export class PowerModule {}
