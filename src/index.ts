import app from "./app";

const PORT: number = 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
        return;
    }

    console.log(`server running on port ${PORT}`);
});