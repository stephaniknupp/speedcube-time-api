import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export enum UserRole {
    USER = "user",
    ADMIN = "admin"
}

export interface AuthRequest extends Request {
    userId?: string;
    role?: UserRole;
}

export function requireAuth(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({
            error: "Token não informado."
        });

        return;
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        res.status(401).json({
            error: "Formato do token inválido."
        });

        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "secret"
        );

        if (
            typeof decoded !== "object" ||
            decoded === null ||
            typeof decoded.userId !== "string" ||
            typeof decoded.role !== "string"
        ) {
            res.status(401).json({
                error: "Token inválido."
            });

            return;
        }

        req.userId = decoded.userId;
        req.role = decoded.role as UserRole;

        next();
    } catch {
        res.status(401).json({
            error: "Token inválido ou expirado."
        });
    }
}