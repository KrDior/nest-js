import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetTaskFilterDto {
	@IsOptional()
	@IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.IN_PROGRESS])
	status: TaskStatus;

	@IsOptional()
	@IsNotEmpty()
	search: string;
}
