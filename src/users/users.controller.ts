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
      firstName: string;
      lastName: string;
      age: number;
      gender: string;
      hasProblems: boolean;
    },
  ): Promise<User> {
    const { firstName, lastName, age, gender, hasProblems } = body;
    return this.usersService.createUser(
      firstName,
      lastName,
      age,
      gender,
      hasProblems,
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
