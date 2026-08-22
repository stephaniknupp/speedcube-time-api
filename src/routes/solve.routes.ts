import { Router } from "express";
import { SolveController } from "../controllers/solve.controller";
import { SolveService } from "../services/solve.service";
import { SolveRepository } from "../repositories/solves.repository";

const router = Router();

const solveRepository = new SolveRepository();
const solveService = new SolveService(solveRepository);
const solveController = new SolveController(solveService);


router.post("/solves", (req, res) => solveController.create(req, res));

export default router;