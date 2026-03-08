import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import { TaskModule } from './tasks/tasks.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/demo'), TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
