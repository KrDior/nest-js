/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tast-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
// import { Task } from './task.module';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository
	) {}
	// private tasks: Task[] = [];

	// getAllTasks() {
	// 	return this.tasks;
	// }

	async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
		return this.taskRepository.getTasks(filterDto);
	}

	// getTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
	// 	const { status, search } = filterDto;

	// 	let tasks = this.getAllTasks();

	// 	if (status) {
	// 		tasks = tasks.filter(task => task.status === status);
	// 	}
	// 	if (search) {
	// 		tasks = tasks.filter(task =>
	// 			task.title.includes(search) || task.description.includes(search)
	// 		);
	// 	}

	// 	return tasks;
	// }

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

	async createTask(
		createTaskDto: CreateTaskDto,
		user: User
		): Promise<Task> {
		return this.taskRepository.createTask(createTaskDto, user);
	}

	// deleteTask(id: string): Task {
	// 	const found = this.getTaskById(id);
	// 	this.tasks = this.tasks.filter(task => task.id !== found.id);

	// 	return found;
	// }

	async deleteTask(id: number): Promise<string> {
		const result = await this.taskRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`Task with id = ${id} doesn't exist`);
		} else {
			return `Task with id = ${id} was successfully deleted`;
		}
	}

	async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
		const task = await this.getTaskById(id);
		task.status = status;
		await task.save();

		return task;
	}

	// changeTaskStatus(id: string, status: TaskStatus): Task {
	// 	const task = this.getTaskById(id);
	// 	task.status = status;

	// 	return task;
	// }
}
