import React from "react";
import "./FoodDisplay.css";
import CategoryFoodDisplay from "../CategoryFoodDisplay";
import ExploreMenu from "../ExploreMenu";

const FoodDisplay = () => {
    return (
        <div className="food-display" id="food-display">
            <div className="food-display-contents">
                <h2>Affordable Packed Food, Sustainably Sourced</h2>
                <p className="food-display-subtitle">
                    Explore quality-packed food items nearing expiry (1–30 days). Safe, verified & budget-friendly.
                </p>
            </div>
            <div className="food-display-list">
                <h2>Category</h2>
                <ExploreMenu />
                <hr />
                <div className="categories-home-list">
                    <CategoryFoodDisplay />
                </div>
            </div>
        </div>
    );
};

export default FoodDisplay;
