import React, { useContext, useEffect, useState } from "react";
import "./Categories.css";
import CategoryFoodDisplay from "../../components/CategoryFoodDisplay";
import ExploreMenu from "../../components/ExploreMenu";
import SubCategories from "../../components/SubCategories";
import { StoreContext } from "../../context/StoreContext";

const Categories = () => {
  const {
    category,
    selectedSubCategories,
    setSelectedSubCategories,
    fetchProducts,
    setProductsList,
    setPage,
    setHasMore,
    searchQ
  } = useContext(StoreContext);
  const [showMobileFilter, setShowMobileFilter] = useState(false);


  const [featureMode, setFeatureMode] = useState(false);

  useEffect(() => {
    setProductsList([]);
    setPage(1);      // ← triggers fetchProducts via useEffect
    setHasMore(true);
    fetchProducts();
  }, [category, searchQ, selectedSubCategories]); // ← inside StoreContext


  return (
    <div className="categories-wrapper">
      <div className="categories-hero">
        <h1>Browse by Food Category</h1>
        <p>
          Discover a wide range of packed food items collected from local stores
          before their expiry. From quick bites to full meals, EcoPlate offers
          safe, affordable, and sustainable choices for every taste.
        </p>
      </div>

      <div className="categories">
        <h2>Category</h2>
        <ExploreMenu />
        <hr />

        <button className="mobile-filter-btn" onClick={() => setShowMobileFilter(prev => !prev)}>
          {showMobileFilter ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="categories-content">
          {/* Always render for desktop, toggle visibility for mobile */}
          <div className={`categories-sidebar ${showMobileFilter ? "mobile-visible" : ""}`}>
            <h2>Sub Category</h2>
            <hr />
            <SubCategories
              category={category}
              selectedSubCategories={selectedSubCategories}
              setSelectedSubCategories={setSelectedSubCategories}
              featureMode={featureMode}
              setFeatureMode={setFeatureMode}
            />
          </div>


          <div className="categories-main">
            <CategoryFoodDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
