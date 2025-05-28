import { CreateTaskDto } from './create-task.dto';
export declare class BulkCreateTasksDto {
    tasks: CreateTaskDto[];
    workerIds?: string[];
}
