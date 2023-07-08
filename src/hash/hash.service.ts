import {
    Injectable
  } from '@nestjs/common';
  import * as bcrypt from 'bcrypt';
  import * as argon2 from 'argon2';
  
  @Injectable()
  export class HashService {
    async hashPassword(password: string) {
      const saltOrRounds = 10;
      return await bcrypt.hash(password, saltOrRounds);
    }
    hashData(data: string) {
      return argon2.hash(data);
    }
    async comparePassword(password: string, hash: string) {
      return await bcrypt.compare(password, hash)
    }

    async validateToken(headerToken: string ,dbToken: string){
      return await argon2.verify(
        headerToken,
        dbToken,
      );
    }
  }