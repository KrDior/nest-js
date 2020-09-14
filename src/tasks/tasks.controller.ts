/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
// import { Task, TaskStatus } from './task.module';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tast-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.module';
// import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
	constructor(private taskService: TasksService) {}

	@Get()
	getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
		if (Object.keys(filterDto).length) {
			return this.taskService.getTaskWithFilter(filterDto);
		} else {
			return this.taskService.getAllTasks();
		}
	}

	// @Get('/:id')
	// getTaskById(@Param('id') id: string): Task {
	// 	return this.taskService.getTaskById(id);
	// }

	// @Get('/:id')
	// getTaskById(@Param('id') id: number): Promise<Task> {
	// 	return this.taskService.getTaskById(id);
	// }

	// @Post()
	// @UsePipes(ValidationPipe)
	// createTask(@Body() createTaskDto: CreateTaskDto): Task {
	// 	return this.taskService.createTask(createTaskDto);
	// }

	// @Patch('/:id/status')
	// changeTaskStatus(
	// 	@Param('id') id: string,
	// 	@Body('status', TaskStatusValidationPipe) status: TaskStatus
	// ): Task {
	// 	return this.taskService.changeTaskStatus(id, status);
	// }

	// @Delete('/:id')
	// deleteTask(@Param('id') id: string): Task {
	// 	return this.taskService.deleteTask(id);
	// }
}
