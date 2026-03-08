import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { QueryFilter, Model} from "mongoose";
import { Task, TaskDocument } from "./schemas/task.schame";

@Injectable()
export class TasksRepository{
    constructor(@InjectModel(Task.name) private taskModel : Model<TaskDocument>) {}

    async findOne(taskFilterQuery : QueryFilter<TaskDocument>) : Promise<Task | null> {
        return this.taskModel.findOne(taskFilterQuery).exec();
    }

    async find(taskFilterQuery : QueryFilter<TaskDocument>) : Promise<Task[] | null> {
        return this.taskModel.find(taskFilterQuery).exec();
    }   

    async findOneAndUpdate(taskFilterQuery : QueryFilter<TaskDocument>, task : Partial<Task>) : Promise<Task | null> {
        return this.taskModel.findOneAndUpdate(taskFilterQuery, task).exec();
    }

    async create(task : Task): Promise<Task> {
        const newTask = new this.taskModel(task);
        return newTask.save()
    }

    async delete(taskFilterQuery : QueryFilter<TaskDocument>)  {
        return this.taskModel.deleteOne(taskFilterQuery).exec();
    }
    
}