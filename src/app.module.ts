import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    
    }),
    CacheModule.register({ 
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/auth'),
    AuthModule,
    UserModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
