import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],   // this connects the entity to its parent module -> this creates a repository for the entity
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
