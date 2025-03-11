"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymntController_1 = require("../controller/paymntController");
const paymentRouter = express_1.default.Router();
paymentRouter.post('/create-payment-intent', paymntController_1.createPaymentIntentController);
exports.default = paymentRouter;
