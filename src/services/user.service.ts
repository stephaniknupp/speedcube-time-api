import { User } from "../models/user";
import { UserRepository } from "../repositories/users.repository";

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async create(user: User): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(user.email);

        if (existingUser) {
            throw new Error("E-mail já cadastrado");
        }

        return await this.userRepository.create(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findByEmail(email);
    }

    async findById(id: string): Promise<User | undefined> {
        return await this.userRepository.findById(id);
    }
}