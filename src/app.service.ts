import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Test task for working with a large amount of data in a postgres database!';
  }
}
