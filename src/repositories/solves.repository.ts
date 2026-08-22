import { Solve } from "../models/solve";


export class SolveRepository {
    private solves: Solve[] = [];


    async create(solve: Solve): Promise<Solve> {
        this.solves.push(solve);

        return solve;
    }


    async findAll(): Promise<Solve[]> {
        return this.solves;
    }


    async findById(id: string): Promise<Solve | undefined> {
        return this.solves.find((solve) => solve.id === id);
    }
}