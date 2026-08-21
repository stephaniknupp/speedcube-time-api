import express from 'express';
const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.json({ message: "SpeedCube Time API funcionando!"});
});


export default app;