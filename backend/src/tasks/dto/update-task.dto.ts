import { Task } from '../schemas/task.schame';
export type UpdateTaskDto = Omit<Task, '_id'>;
