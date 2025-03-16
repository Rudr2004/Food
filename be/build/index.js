"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./db/db");
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./routes/route"));
const foodRoute_1 = __importDefault(require("./routes/foodRoute"));
const payment_1 = __importDefault(require("./routes/payment"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(express_1.default.json());
app.use("/api/user", route_1.default);
app.use("/api/food", foodRoute_1.default);
app.use("/api", payment_1.default);
// Ensure the database is connected before starting the server
db_1.sequelize.authenticate()
    .then(async () => {
    console.log("Connected to DB");
    await (0, db_1.syncDB)();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((e) => {
    console.error("Error connecting to DB:", e);
});
