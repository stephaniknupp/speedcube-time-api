import { Request, Response } from "express";
import { Solve } from "../models/solve";
import { SolveService } from "../services/solve.service";
import { isISolveDTO } from "../dtos/solve.dto";

export class SolveController {
    constructor(private solveService: SolveService) {}

    async create(req: Request, res: Response): Promise<Response> {
        if (!isISolveDTO(req.body)) {
            return res.status(400).json({
                message: "Dados inválidos"
            });
        }

        const solve = new Solve(
            crypto.randomUUID(),
            "user-id-temporario",
            req.body.time,
            new Date()
        );

        const createdSolve = await this.solveService.create(solve);

        return res.status(201).json(createdSolve);
    }
}