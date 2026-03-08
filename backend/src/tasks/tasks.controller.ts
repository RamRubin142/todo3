import { Patch, Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import {Task} from './schemas/task.schame'
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';


@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService : TasksService) {}
    @Get(':_id')
    async getTask(@Param('_id') _id : string) : Promise<Task| null>{
        return this.tasksService.getTaskById(_id);
    }
    @Get()
    async getTasks(): Promise<Task[]| null>{
        return this.tasksService.getTasks();
    }
    @Post()
    async createTask(@Body() createTaskDto : CreateTaskDto) : Promise<Task|null> {
        return this.tasksService.createTask(createTaskDto.description, createTaskDto.done);
    }
    @Patch(':_id')
    async updateTask(@Param('_id') _id : string, @Body() updateTaskDto : UpdateTaskDto) : Promise<Task | null>{
        return this.tasksService.updateTask(_id, updateTaskDto);
    }
    @Delete(':_id')
    async deleteTask(@Param('_id') _id : string) {
        return this.tasksService.deleteTask(_id);
    }
    @Get('query/:desc')
    async searchTask(@Param('desc') desc:string) : Promise<Task[]| null>{
        return this.tasksService.searchTasks(desc);
    }

}