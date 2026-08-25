import SolveRepository from "../repositories/solves.repository";
import { Solve } from "../models/solve";

export default class SolveService {
    constructor(private repository: SolveRepository) {}

    async create(solve: Solve): Promise<string> {
        return await this.repository.insert(solve);
    }

    async findById(id: string): Promise<Solve | null> {
        return await this.repository.getById(id);
    }

    async findAll(): Promise<Solve[]> {
        return await this.repository.getAll();
    }

    async update(id: string, time: number): Promise<boolean> {
        return await this.repository.update(id, time);
    }

    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id);
    }

    async findByUserId(userId: string): Promise<Solve[]> {
    return await this.repository.getByUserId(userId);
    }
}