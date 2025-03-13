import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51R12NLLlTwTInXM6IQazk2inqdBCCYD0xHJyNHCBsLGr4vphF79m0xGpWTjpBfxSBMka2tv0GHmj8onhIct7nMov00YCdMeDTD");

const Payment = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));
        if (storedOrder) {
            setOrder(storedOrder);
            setTotalPrice(storedOrder.price * storedOrder.quantity);
        } else {
            setTimeout(() => navigate("/buy"), 2000);
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.error("Stripe Payment Error:", error);
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                paymentMethodId: paymentMethod.id,
                amount: totalPrice,
            }),
        });

        const data = await response.json();
        if (!data.clientSecret) {
            console.error("Error: clientSecret is missing from response:", data);
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(data.clientSecret);

        if (confirmError) {
            console.error("Payment failed:", confirmError);
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            setShowSuccess(true);
            console.log("Payment successful:", paymentIntent);

            // Remove item from cart in localStorage
            const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
            const updatedCart = cartItems.filter(item => item.id !== order.id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            // Notify CartContext to update cart state
            window.dispatchEvent(new Event("cartUpdated"));

            setTimeout(() => {
                setShowSuccess(false);
                navigate("/");
            }, 2000);
        } else {
            console.error("Payment not successful:", paymentIntent.status);
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 md:px-6">
            <div className="w-full max-w-3xl p-6 md:p-8 bg-white shadow-xl rounded-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                    Secure Payment
                </h2>

                {showSuccess && <div className="fixed top-10 right-10 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-bounce">Payment Successful!</div>}
                {showError && <div className="fixed top-10 right-10 bg-red-500 text-white p-4 rounded-lg shadow-lg animate-bounce">Payment Failed. Try Again!</div>}

                {order && (
                    <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
                        <p className="text-gray-900 font-bold mt-2">Total: ₹{totalPrice}</p>

                        <form onSubmit={handleSubmit}>
                            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                                <CardElement />
                            </div>
                            <button type="submit" disabled={!stripe} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
                                Pay ₹{totalPrice}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

const App = () => <Elements stripe={stripePromise}><Payment /></Elements>;

export default App;
