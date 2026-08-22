import { Solve } from "../models/solve";
import { SolveRepository } from "../repositories/solves.repository";

export class SolveService {
    private solveRepository: SolveRepository;

    constructor(solveRepository: SolveRepository) {
        this.solveRepository = solveRepository;
    }

    async create(solve: Solve): Promise<Solve> {
        return await this.solveRepository.create(solve);
    }

    async findAll(): Promise<Solve[]> {
        return await this.solveRepository.findAll();
    }

    async findById(id: string): Promise<Solve | undefined> {
        return await this.solveRepository.findById(id);
    }
}