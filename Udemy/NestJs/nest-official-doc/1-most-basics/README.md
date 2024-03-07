1





# Controller 

A controller's purpose is to receive specific requests for the application. The **routing** mechanism controls which controller receives which requests. Frequently, each controller has more than one route, and different routes can perform different actions.



## request objects

https://docs.nestjs.com/controllers#request-object

listed common used decorators to extract request object



## decorators in a controller

`@HttpCode(...)`

```ts
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```



`@Header()`

```ts
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```



`@Redirect()`

```ts
@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}

```



`@Param()`

```ts
@Get(':id')
findOne(@Param() params: any): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```



`@Body()`

```ts
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```



```ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```









# Provider

`Providers` (in SpringBoot, it is Bean) are a fundamental concept in Nest. Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. The main idea of a provider is that it can be **injected** as a dependency; this means objects can create various relationships with each other, and the function of "wiring up" these objects can largely be delegated to the Nest runtime system.





# Module