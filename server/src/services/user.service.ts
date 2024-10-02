import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';

export class UserService {
    private userRepository = new UserRepository();

    async getAllUsers() {
        return this.userRepository.findAll();
    }

    async getUser(userId: number) {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error('User not found');
        return user;
    }

    async createUser(dto: CreateUserDTO) {
        const user = await this.userRepository.create(
            { name: dto.name, email: dto.email },
            { phone: dto.phone }
        );
        return user;
    }

    async updateUser(userId: number, dto: UpdateUserDTO) {
        await this.userRepository.update(
            userId,
            { name: dto.name, email: dto.email },
            { phone: dto.phone }
        );
    }

    async deleteUser(userId: number) {
        await this.userRepository.delete(userId);
    }
}
