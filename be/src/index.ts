import express from "express";
import dotenv from "dotenv"
dotenv.config()
import { sequelize, syncDB } from "./db/db";  
import cors from "cors";
import router from "./routes/route";
import foodRoute from "./routes/foodRoute";
import paymentRouter from "./routes/payment";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.use("/api/user", router);
app.use("/api/food",foodRoute)
app.use("/api",paymentRouter)

// Ensure the database is connected before starting the server
sequelize.authenticate()
    .then(async () => {
        console.log("Connected to DB");
        await syncDB(); 
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((e) => {
        console.error("Error connecting to DB:", e);
    });
