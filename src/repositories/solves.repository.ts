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

    async update(id: string, time: number): Promise<Solve | undefined> {
    const solve = this.solves.find((solve) => solve.id === id);

    if (!solve) {
        return undefined;
    }

    solve.updateTime(time);

    return solve;
    }

    async delete(id: string): Promise<Solve | undefined> {
    const index = this.solves.findIndex((solve) => solve.id === id);

    if (index === -1) {
        return undefined;
    }

    const deletedSolve = this.solves.splice(index, 1);

    return deletedSolve[0];
    }
}