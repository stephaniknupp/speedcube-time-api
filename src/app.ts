import express, {Express, Request, Response} from 'express';
import solveRoutes from "./routes/solve.routes";
import usersRoutes from "./routes/users.routes";


const app: Express = express();

app.use(express.json());

app.use(solveRoutes);

app.use(usersRoutes);

app.get("/", (req, res) => {
    res.json({ message: "SpeedCube Time API funcionando!"});
});


export default app;