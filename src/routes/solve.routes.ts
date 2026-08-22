import { Router } from "express";
import { SolveController } from "../controllers/solve.controller";
import { SolveService } from "../services/solve.service";
import { SolveRepository } from "../repositories/solves.repository";

const router = Router();

const solveRepository = new SolveRepository();
const solveService = new SolveService(solveRepository);
const solveController = new SolveController(solveService);


router.post("/solves", (req, res) => solveController.create(req, res));

router.get("/solves", (req, res) => solveController.findAll(req, res));

router.get("/solves/:id", (req, res) => solveController.findById(req, res));

router.put("/solves/:id", (req, res) => solveController.update(req, res));

router.delete("/solves/:id", (req, res) => solveController.delete(req, res));

export default router;