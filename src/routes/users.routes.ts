import express from "express";

import {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    loginUser
} from "../controllers/users.controller";

import { requireAuth, UserRole } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = express.Router();

router.post("/users", createUser);

router.post("/login", loginUser);

router.get(
    "/users",
    requireAuth,
    requireRole(UserRole.ADMIN),
    getAllUsers
);

router.get(
    "/users/:id",
    requireAuth,
    getUserById
);

router.put(
    "/users/:id",
    requireAuth,
    updateUser
);

router.delete(
    "/users/:id",
    requireAuth,
    requireRole(UserRole.ADMIN),
    deleteUser
);


export default router;