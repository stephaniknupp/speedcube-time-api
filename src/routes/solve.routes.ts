import express from "express";

import {
    createSolve,
    getSolveById,
    getAllSolves,
    updateSolve,
    deleteSolve
} from "../controllers/solve.controller";

import { requireAuth } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/solves", requireAuth, createSolve);

router.get("/solves", requireAuth, getAllSolves);

router.get("/solves/:id", requireAuth, getSolveById);

router.put("/solves/:id", requireAuth, updateSolve);

router.delete("/solves/:id", requireAuth, deleteSolve);

export default router;