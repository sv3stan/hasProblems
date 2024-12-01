import { Controller } from '@nestjs/common';
// ****************************
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Patch('reset-problems')
  async resetProblems(): Promise<{ updatedCount: number }> {
    return this.userService.resetProblems();
  }
}
