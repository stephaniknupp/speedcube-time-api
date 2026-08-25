import UserRepository from "../repositories/users.repository";
import { User } from "../models/user";

export default class UserService {
    constructor(private repository: UserRepository) {}

    async create(user: User): Promise<string> {
        const existingUser = await this.repository.getByEmail(user.email);

        if (existingUser) {
            throw new Error("E-mail já cadastrado");
        }

        return await this.repository.insert(user);
    }

    async findById(id: string): Promise<User | null> {
        return await this.repository.getById(id);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.getByEmail(email);
    }

    async findAll(): Promise<User[]> {
        return await this.repository.getAll();
    }

    async update(
        id: string,
        name: string,
        username: string,
        email: string
    ): Promise<boolean> {
        const existingUser = await this.repository.getByEmail(email);

        if (existingUser && existingUser.id !== id) {
            throw new Error("E-mail já cadastrado");
        }

        return await this.repository.update(
            id,
            name,
            username,
            email
        );
    }

    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id);
    }
}