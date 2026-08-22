import { User } from "../models/user";

export class UserRepository {
    private users: User[] = [];

    async create(user: User): Promise<User> {
        this.users.push(user);

        return user;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find((user) => user.email === email);
    }

    async findById(id: string): Promise<User | undefined> {
        return this.users.find((user) => user.id === id);
    }
}