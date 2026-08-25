import { Response, NextFunction } from "express";

import { AuthRequest, UserRole } from "./auth.middleware";

export function requireRole(role: UserRole) {
    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ): void => {
        if (req.role !== role) {
            res.status(403).json({
                error: "Acesso negado."
            });

            return;
        }

        next();
    };
}