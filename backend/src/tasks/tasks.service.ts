import { Injectable } from "@nestjs/common";
import { TasksRepository } from "./tasks.repository";

import {Task} from  "./schemas/task.schame"
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable() 
export class TasksService{
    constructor(private readonly tasksRepository : TasksRepository) {}

    async getTaskById(_id : string): Promise<Task | null> {
        return this.tasksRepository.findOne({_id});
    }

    async getTasks(): Promise<Task[] | null> {
        return this.tasksRepository.find({});
    }

    async searchTasks(desc : string) : Promise<Task[] | null> {
        return this.tasksRepository.find({
            description: new RegExp(desc, 'i') 
        });
    }

    async createTask(description : string, done : boolean): Promise<Task| null>{
        return this.tasksRepository.create({
            description, 
            done
        })
    }

    async updateTask(_id : string, taskUpdates : UpdateTaskDto): Promise<Task | null> {
        return this.tasksRepository.findOneAndUpdate({_id}, taskUpdates);
    }
    async deleteTask(_id :string) {
        return this.tasksRepository.delete({_id});
    }

}