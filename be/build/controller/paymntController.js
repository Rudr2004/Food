"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntentController = void 0;
const stripeService_1 = require("./stripeService");
const createPaymentIntentController = async (req, res) => {
    try {
        const { paymentMethodId, amount } = req.body;
        // Validate amount
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, error: "Invalid amount. Must be greater than 0." });
        }
        const response = await (0, stripeService_1.createPaymentIntent)(paymentMethodId, amount);
        res.json(response);
    }
    catch (error) {
        console.error("Stripe Payment Error:", error);
        res.status(500).json({ success: false, error: error.message || "An unknown error occurred" });
    }
};
exports.createPaymentIntentController = createPaymentIntentController;
