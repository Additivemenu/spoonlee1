import { Controller, Get, Module } from "@nestjs/common";

@Controller('/app') // this is called decorator (Annotation in Java)
export class AppController {
  @Get('/asdf')
  getRootRoute() {
    return "Hello World!";
  }

  @Get('/bye')
  getByeThere() {
    return 'bye there!'
  }
}