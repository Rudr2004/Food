import React from 'react';
import FoodItem from './FoodItem';
import foodItems from './FoodItems';

const Home = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Food Items</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {foodItems.map((item) => (
                    <div key={item.id} className="w-full">
                        <FoodItem item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;