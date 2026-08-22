import app from "./app";

const PORT: number = 3000;

app.listen(PORT, (error) => {
    if (error !== null)

    console.log(`server running on port ${PORT}`);
});