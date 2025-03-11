"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default("sk_test_51R12NLLlTwTInXM64IuGNw7322U6zYGtwunZwZrVn3InFGWAPJKdu5KHg7J8eV5oON8iLEN9kfU3CoOetp3RYjI900NL4wBZn5", {});
const createPaymentIntent = async (paymentMethodId, amount) => {
    try {
        console.log("Processing Payment for Amount:", amount);
        console.log("FE", amount);
        const amountInPaise = amount;
        console.log("check", amountInPaise);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInPaise,
            currency: "usd",
            payment_method: paymentMethodId,
            automatic_payment_methods: { enabled: true, allow_redirects: "never" },
        });
        return {
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        };
    }
    catch (error) {
        console.error("Stripe Error:", error);
        return { success: false, error: error.message };
    }
};
exports.createPaymentIntent = createPaymentIntent;
