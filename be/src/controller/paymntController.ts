import { Request, Response } from "express";
import { createPaymentIntent } from "./stripeService";

export const createPaymentIntentController = async (req: Request, res: Response) => {
    try {
        const { paymentMethodId, amount } = req.body;

        // Validate amount
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, error: "Invalid amount. Must be greater than 0." });
        }

        const response = await createPaymentIntent(paymentMethodId, amount);
        res.json(response);
    } catch (error) {
        console.error("Stripe Payment Error:", error);
        res.status(500).json({ success: false, error: error.message || "An unknown error occurred" });
    }
};
