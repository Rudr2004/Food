import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"
const Buy = () => {
    const navigate = useNavigate()
    const { currentOrder } = useCart();
    const [order, setOrder] = useState(null);

    const handleOnClick = () => {
        navigate('/payment')
    }
    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));
        if (storedOrder) {
            setOrder(storedOrder);
        }
    }, []);

    if (!order) {
        return <p className="text-center text-lg font-semibold">No product selected for checkout.</p>;
    }

    return (
        <div className="max-w-4xl my-4 mx-auto p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-2xl font-semibold">Checkout</h2>
            <div className="mt-4 space-y-4">
                <img src={order.image} alt={order.name} className="w-32 h-32 object-cover border rounded-md" />
                <h3 className="text-lg font-semibold">{order.name}</h3>
                <p className="text-gray-600">₹{order.price}</p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-md text-lg font-medium cursor-pointer hover:bg-green-700" onClick={handleOnClick}>
                    Proceed to Payment
                </button>
            </div>

            {/* Back to Cart */}
            <div className="mt-6 text-center">
                <button
                    onClick={() => navigate("/cart")}
                    className="text-blue-600 font-medium hover:text-blue-700 transition duration-300 cursor-pointer"
                >
                    ← Back to Cart
                </button>
            </div>
        </div>
    );
};

export default Buy;
