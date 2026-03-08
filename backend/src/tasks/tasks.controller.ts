import { Patch, Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import {Task} from './schemas/task.schame'
import type {CreateTaskDto} from './dto/create-task.dto';
import type {UpdateTaskDto} from './dto/update-task.dto';


@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService : TasksService) {}
    @Get(':id')
    async getTask(@Param('id') id : string) : Promise<Task| null>{
        return this.tasksService.getTaskById(id);
    }
    @Get()
    async getTasks(): Promise<Task[]| null>{
        return this.tasksService.getTasks();
    }
    @Post()
    async createTask(@Body() createTaskDto : CreateTaskDto) : Promise<Task|null> {
        return this.tasksService.createTask(createTaskDto.description, createTaskDto.done);
    }
    @Patch(':id')
    async updateTask(@Param('id') id : string, @Body() updateTaskDto : UpdateTaskDto) : Promise<Task | null>{
        return this.tasksService.updateTask(id, updateTaskDto);
    }
    @Delete(':id')
    async deleteTask(@Param('id') id : string) {
        return this.tasksService.deleteTask(id);
    }
}