import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';

import { Task } from './schemas/task.schame';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getTaskById(id: string): Promise<Task | null> {
    return this.tasksRepository.findOne(id);
  }

  async getTasks(): Promise<Task[] | null> {
    return this.tasksRepository.find();
  }

  async createTask(description: string, done: boolean): Promise<Task | null> {
    return this.tasksRepository.create({
      description,
      done,
    });
  }

  async updateTask(
    id: string,
    taskUpdates: UpdateTaskDto,
  ): Promise<Task | null> {
    return this.tasksRepository.findOneAndUpdate(id, taskUpdates);
  }
  async deleteTask(id: string) {
    return this.tasksRepository.delete(id);
  }
}
