import { UserRepositoryMemory } from "./users.repository";
import { SolveRepositoryMemory } from "./solves.repository";

export const userRepository = new UserRepositoryMemory();

export const solveRepository = new SolveRepositoryMemory();