import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

@Module({
  controllers: [AppController], // Nest will instantiate it
})
export class AppModule {}
