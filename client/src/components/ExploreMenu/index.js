import React, { useContext } from "react";
import "./ExploreMenu.css";
import { StoreContext } from "../../context/StoreContext";

const ExploreMenu = () => {
  const { category, setCategory, setSelectedSubCategories } = useContext(StoreContext);

  const categoryData = [
    {
      category: "All",
      image: "https://cdn-icons-png.flaticon.com/512/5110/5110785.png",
    },
    {
      category: "Baby Care",
      image: "https://cdn-icons-png.flaticon.com/512/2102/2102727.png",
    },
    {
      category: "Bakery, Cakes & Dairy",
      image: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
    },
    {
      category: "Beauty & Hygiene",
      image: "https://cdn-icons-png.flaticon.com/512/1940/1940922.png",
    },
    {
      category: "Beverages",
      image: "https://cdn-icons-png.flaticon.com/512/2722/2722532.png",
    },
    {
      category: "Cleaning & Household",
      image: "https://cdn-icons-png.flaticon.com/512/1059/1059219.png",
    },
    {
      category: "Eggs, Meat & Fish",
      image: "https://cdn-icons-png.flaticon.com/512/11845/11845770.png",
    },
    {
      category: "Foodgrains, Oil & Masala",
      image: "https://cdn-icons-png.flaticon.com/512/869/869636.png",
    },
    {
      category: "Fruits & Vegetables",
      image: "https://cdn-icons-png.flaticon.com/512/2805/2805947.png",
    },
    {
      category: "Gourmet & World Food",
      image: "https://cdn-icons-png.flaticon.com/512/6046/6046279.png",
    },
    {
      category: "Kitchen, Garden & Pets",
      image: "https://cdn-icons-png.flaticon.com/512/8239/8239449.png",
    },
    {
      category: "Snacks & Branded Foods",
      image: "https://cdn-icons-png.flaticon.com/512/8221/8221919.png",
    }
  ];

  return (
    <div className="explore-menu" id="explore-menu">
      <div className="explore-menu-list">
        {categoryData.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setCategory(prev => (prev === item.category ? "All" : item.category))
              setSelectedSubCategories([])
            }
            }
            className="explore-menu-list-item"
          >
            <img
              className={`menu-image ${category === item.category ? "active" : ""}`}
              src={item.image}
              alt={item.category}
            />
            <p>{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
