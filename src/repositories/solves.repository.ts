import { Solve } from "../models/solve";

export default abstract class SolveRepository {
    abstract insert(solve: Solve): Promise<string>;
    abstract getById(id: string): Promise<Solve | null>;
    abstract getAll(): Promise<Solve[]>;
    abstract update(id: string, time: number): Promise<boolean>;
    abstract delete(id: string): Promise<boolean>;
    abstract getByUserId(userId: string): Promise<Solve[]>;
}

export class SolveRepositoryMemory extends SolveRepository {
    solves: Solve[] = [];

    async insert(solve: Solve): Promise<string> {
    this.solves.push(solve);

    return solve.id;
}

async getById(id: string): Promise<Solve | null> {
    return this.solves.find(solve => solve.id === id) ?? null;
}

async getByUserId(userId: string): Promise<Solve[]> {
    return this.solves.filter(solve => solve.userId === userId);
}

async getAll(): Promise<Solve[]> {
    return this.solves;
}

async update(id: string, time: number): Promise<boolean> {
    const solve = this.solves.find(solve => solve.id === id);

    if (!solve) return false;

    solve.updateTime(time);

    return true;
}

async delete(id: string): Promise<boolean> {
    const index = this.solves.findIndex(solve => solve.id === id);

    if (index === -1) return false;

    this.solves.splice(index, 1);

    return true;
}
}