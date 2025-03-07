import React from 'react';

const FoodItem = ({ item }) => {
    return (
        <div className="bg-white rounded shadow-md p-4 md:p-6 lg:p-8">
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-t-md" />
            <div className="p-4 md:p-6 lg:p-8">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">{item.name}</h2>
                <p className="text-sm md:text-base lg:text-lg mb-2">{item.description}</p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold">Price: ₹{item.price}</p>
            </div>
        </div>
    );
};

export default FoodItem;