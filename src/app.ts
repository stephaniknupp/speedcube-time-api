import express, {Express, Request, Response} from 'express';
const app: Express = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.json({ message: "SpeedCube Time API funcionando!"});
});


export default app;