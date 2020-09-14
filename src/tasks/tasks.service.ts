/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tast-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
// import { Task } from './task.module';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository
	) {}
	private tasks: Task[] = [];

	getAllTasks() {
		return this.tasks;
	}

	getTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
		const { status, search } = filterDto;

		let tasks = this.getAllTasks();

		if (status) {
			tasks = tasks.filter(task => task.status === status);
		}
		if (search) {
			tasks = tasks.filter(task =>
				task.title.includes(search) || task.description.includes(search)
			);
		}

		return tasks;
	}

	// getTaskById(id: string): Task {
	// 	const found = this.tasks.find(task => task.id === id);

	// 	if (!found) {
	// 		throw new NotFoundException(`Task with id = ${id} not found`);
	// 	}

	// 	return found;
	// }

	async getTaskById(id: number): Promise<Task> {
		const found = await this.taskRepository.findOne(id);

		if (!found) {
			throw new NotFoundException(`Task with id = ${id} not found`);
		}

		return found;
	}

	// createTask(createTaskDto: CreateTaskDto): Task {
	// 	const { title, description } = createTaskDto;
	// 	const task: Task = {
	// 		id: uuidv1(),
	// 		title,
	// 		description,
	// 		status: TaskStatus.OPEN,
	// 	}

	// 	this.tasks.push(task);
	// 	return task;
	// }

	// deleteTask(id: string): Task {
	// 	const found = this.getTaskById(id);
	// 	this.tasks = this.tasks.filter(task => task.id !== found.id);

	// 	return found;
	// }

	// changeTaskStatus(id: string, status: TaskStatus): Task {
	// 	const task = this.getTaskById(id);
	// 	task.status = status;

	// 	return task;
	// }
}
