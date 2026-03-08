import { MongooseModule } from "@nestjs/mongoose";
import {Task, TaskSchema} from "./schemas/task.schame";
import {Module} from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksRepository } from "./tasks.repository";
import { TasksService } from "./tasks.service";


@Module({
    imports : [MongooseModule.forFeature([{name : Task.name,schema : TaskSchema}])],
    controllers : [TasksController],
    providers : [TasksRepository, TasksService]
})
export class TaskModule {}