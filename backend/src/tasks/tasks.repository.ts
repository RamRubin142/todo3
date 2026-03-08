import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schame';

@Injectable()
export class TasksRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async findOne(_id: string): Promise<Task | null> {
    return this.taskModel.findOne({ _id }).exec();
  }

  async find(): Promise<Task[] | null> {
    return this.taskModel.find({}).exec();
  }

  async findOneAndUpdate(
    _id: string,
    task: Partial<Task>,
  ): Promise<Task | null> {
    return this.taskModel.findOneAndUpdate({ _id }, task).exec();
  }

  async create(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return newTask.save();
  }

  async delete(_id: string) {
    return this.taskModel.deleteOne({ _id }).exec();
  }
}
