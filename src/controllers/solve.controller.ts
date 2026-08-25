import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";

import { isISolveDTO } from "../dtos/solve.dto";

import { Solve } from "../models/solve";

import SolveService from "../services/solve.service";
import { solveRepository } from "../repositories";


const service = new SolveService(solveRepository);

export const createSolve = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    const solve: unknown = req.body;

    if (!isISolveDTO(solve)) {
        res.status(400).json({
            error: "Informe os dados obrigatórios do solve."
        });

        return;
    }

    const newSolve = new Solve(
        crypto.randomUUID(),
        req.userId!,
        solve.time,
        new Date()
    );

    const id = await service.create(newSolve);

    res.status(201).json({
        id
    });
};

export const getSolveById = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        res.status(400).json({
            error: "ID inválido."
        });

        return;
    }

    const solve = await service.findById(id);

    if (!solve) {
    res.status(404).json({
        error: "Solve não encontrado."
    });

    return;
}

if (solve.userId !== req.userId) {
    res.status(403).json({
        error: "Você não pode acessar este solve."
    });

    return;
}

    
};

export const getAllSolves = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    const solves = await service.findByUserId(req.userId!);

    res.status(200).json(solves);
};

export const updateSolve = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        res.status(400).json({
            error: "ID inválido."
        });

        return;
    }

    const solve: unknown = req.body;

    if (!isISolveDTO(solve)) {
        res.status(400).json({
            error: "Informe os dados obrigatórios do solve."
        });

        return;
    }

    const updated = await service.update(id, solve.time);

    if (!updated) {
        res.status(404).json({
            error: "Solve não encontrado."
        });

        return;
    }

    res.status(200).json({
        message: "Solve atualizado com sucesso."
    });
};

export const deleteSolve = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        res.status(400).json({
            error: "ID inválido."
        });

        return;
    }

    const deleted = await service.delete(id);

    if (!deleted) {
        res.status(404).json({
            error: "Solve não encontrado."
        });

        return;
    }

    res.status(200).json({
        message: "Solve deletado com sucesso."
    });
};