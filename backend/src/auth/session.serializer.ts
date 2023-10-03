// import { PassportSerializer } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';

// @Injectable()
// export class SessionSerializer extends PassportSerializer {
//   serializeUser(
//     user: { email: string },
//     done: (err: Error, user: any) => void,
//   ): any {
//     debugger;
//     done(null, user);
//   }
//   deserializeUser(
//     payload: CreateUserDto,
//     done: (err: Error, payload: CreateUserDto) => void,
//   ) {
//     debugger;
//     done(null, payload);
//   }
// }

import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user);
  }
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    done(null, payload);
  }
}
