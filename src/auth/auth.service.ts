import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository
	) {}

	signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
		return this.userRepository.signUp(authCredentialDto);
	}

	async signIn(authCredentialDto: AuthCredentialsDto): Promise<void> {
		const username = await this.userRepository.validateUserPassword(authCredentialDto);

		if (!username) {
			throw new UnauthorizedException('Invalid credentials');
		}
	}
}