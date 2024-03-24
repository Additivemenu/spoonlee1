import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

const cookieSession = require('cookie-session');
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ! make the config module available globally
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      // use dependency injection to get the ConfigService
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('DB_NAME'),
        entities: [User, Report],
        synchronize: true,
      }),
    }),
  //   TypeOrmModule.forRoot({
  //     type: 'sqlite',
  //     database: 'db.sqlite',
  //     entities: [User, Report],
  //     synchronize: true, // ! only in development mode, serves as the same purpose as database migration (this is a special case in TypeORM, normally you would use migrations in other ORM)
  //   }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }), // ! attach a global pipe to the app
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // ! attach a global middleware to the app
    consumer
      .apply(
        cookieSession({
          keys: ['asdfgh'],
        }),
      )
      .forRoutes('*');
  }
}
