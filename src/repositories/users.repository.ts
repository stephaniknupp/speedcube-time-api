import { User } from "../models/user";

export default abstract class UserRepository {
    abstract insert(user: User): Promise<string>;
    abstract getById(id: string): Promise<User | null>;
    abstract getByEmail(email: string): Promise<User | null>;
    abstract getAll(): Promise<User[]>;
    abstract update(
        id: string,
        name: string,
        username: string,
        email: string
    ): Promise<boolean>;
    abstract delete(id: string): Promise<boolean>;
}

export class UserRepositoryMemory extends UserRepository {
    users: User[] = [];

     constructor() {
        super();

        this.users.push(
            new User(
                "admin-id",
                "Administrador",
                "admin",
                "admin@email.com",
                "$2b$10$esTul4lnTupYiZRA7HT58O8vy7HDwlHlLP8Sf/5EnrodYJOo/rGZO",
                "admin"
            )
        );
    }

    async insert(user: User): Promise<string> {
        this.users.push(user);

        return user.id;
    }

    async getById(id: string): Promise<User | null> {
        return this.users.find(user => user.id === id) ?? null;
    }

    async getByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) ?? null;
    }

    async getAll(): Promise<User[]> {
        return this.users;
    }

    async update(
        id: string,
        name: string,
        username: string,
        email: string
    ): Promise<boolean> {
        const user = this.users.find(user => user.id === id);

        if (!user) return false;

        user.updateData(name, username, email);

        return true;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.users.findIndex(user => user.id === id);

        if (index === -1) return false;

        this.users.splice(index, 1);

        return true;
    }
}