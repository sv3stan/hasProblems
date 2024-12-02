import { Controller, Post, Body, Patch, Get } from '@nestjs/common';
// ****************************
import { User } from './users.entity';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-users')
  async createUser(
    @Body()
    body: {
      first_name: string;
      last_name: string;
      age: number;
      gender: string;
      has_problems: boolean;
    },
  ): Promise<User> {
    const userData = {
      first_name: body.first_name,
      last_name: body.last_name,
      age: body.age,
      gender: body.gender,
      has_problems: body.has_problems,
    };
    return this.usersService.createUser(
      userData.first_name,
      userData.last_name,
      userData.age,
      userData.gender,
      userData.has_problems,
    );
  }

  @Get('quantity-problems')
  async quantityProblems() {
    const count = await this.usersService.getProblemsCount();
    return { count };
  }

  @Post('reset-problems')
  async resetProblems() {
    return await this.usersService.resetProblems();
  }

  @Post('reset-and-count-problems')
  async resetAndCountProblems() {
    return await this.usersService.resetAndCountProblems();
  }

  @Post('update-random-problems')
  async updateRandomProblems(@Body() body: { count: number }) {
    return await this.usersService.updateRandomProblems();
  }
}
