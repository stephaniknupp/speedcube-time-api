import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isIUserDTO } from "../dtos/user.dto";
import { User } from "../models/user";
import UserService from "../services/user.service";
import { userRepository } from "../repositories";

const service = new UserService(userRepository);

export const createUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const userData: unknown = req.body;

    if (!isIUserDTO(userData)) {
        res.status(400).json({
            error: "Informe os dados obrigatórios do usuário."
        });

        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User(
            crypto.randomUUID(),
            userData.name,
            userData.username,
            userData.email,
            hashedPassword,
            "user"
        );

        const id = await service.create(user);

        res.status(201).json({
            id
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "E-mail já cadastrado"
        ) {
            res.status(409).json({
                error: error.message
            });

            return;
        }

        res.status(500).json({
            error: "Erro interno do servidor."
        });
    }
};

export const getUserById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        res.status(400).json({
            error: "ID inválido."
        });

        return;
    }

    const user = await service.findById(id);

    if (!user) {
        res.status(404).json({
            error: "Usuário não encontrado."
        });

        return;
    }

    res.status(200).json({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
    });
};

export const getAllUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
    const users = await service.findAll();

    res.status(200).json(
        users.map(user => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
        }))
    );
};

export const updateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        res.status(400).json({
            error: "ID inválido."
        });

        return;
    }

    const userData: unknown = req.body;

    if (!isIUserDTO(userData)) {
        res.status(400).json({
            error: "Informe os dados obrigatórios do usuário."
        });

        return;
    }

    try {
        const updated = await service.update(
            id,
            userData.name,
            userData.username,
            userData.email
        );

        if (!updated) {
            res.status(404).json({
                error: "Usuário não encontrado."
            });

            return;
        }

        res.status(200).json({
            message: "Usuário atualizado com sucesso."
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "E-mail já cadastrado"
        ) {
            res.status(409).json({
                error: error.message
            });

            return;
        }

        res.status(500).json({
            error: "Erro interno do servidor."
        });
    }
};

export const deleteUser = async (
    req: Request,
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
            error: "Usuário não encontrado."
        });

        return;
    }

    res.status(200).json({
        message: "Usuário deletado com sucesso."
    });
};

export const loginUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { email, password } = req.body;

    if (
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        res.status(400).json({
            error: "E-mail e senha são obrigatórios."
        });

        return;
    }

    const user = await service.findByEmail(email);

    if (!user) {
        res.status(401).json({
            error: "E-mail ou senha inválidos."
        });

        return;
    }

    const passwordIsValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordIsValid) {
        res.status(401).json({
            error: "E-mail ou senha inválidos."
        });

        return;
    }

    const token = jwt.sign(
        {
            userId: user.id,
            role: user.role
        },
        process.env.JWT_SECRET || "secret",
        {
            expiresIn: "1h"
        }
    );

    res.status(200).json({
        token
    });
};