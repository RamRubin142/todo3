import { Task } from '../schemas/task.schame';
export type CreateTaskDto = Omit<Task, '_id'>;
