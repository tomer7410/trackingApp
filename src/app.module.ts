import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [  
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
    sortSchema: true,
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:35001/Tutorial2?directConnection=true'),
    LocationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
