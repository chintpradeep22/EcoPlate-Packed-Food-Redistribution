import React, { useEffect, useContext, useRef } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../../components/FoodItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./CategoryFoodDisplay.css";

const CategoryFoodDisplay = () => {
    const {
        productsList,
        hasMore,
        loading,
        setPage,
    } = useContext(StoreContext);

    const scrollContainerRef = useRef(null);

    // On mount: reset and fetch first page
    useEffect(() => {
        setPage(1);
    }, [setPage]); // reset on first mount or when context triggers reset

    // Infinite scroll handler
    useEffect(() => {
        const scrollEl = scrollContainerRef.current;

        const handleScroll = () => {
            if (
                scrollEl &&
                scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 200 &&
                !loading &&
                hasMore
            ) {
                setPage(prev => prev + 1);
            }
        };

        if (scrollEl) {
            scrollEl.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (scrollEl) {
                scrollEl.removeEventListener("scroll", handleScroll);
            }
        };
    }, [loading, hasMore, setPage]);

    return (
        <div className="food-display-wrapper">
            <div className="food-display-scroll" ref={scrollContainerRef}>
                <div className="food-display-grid">
                    {productsList.map(item => (
                        <FoodItem key={item.productId} productDetails={item} />
                    ))}
                </div>

                {loading && <div className="loading-spinner">
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                </div>}
                {!hasMore && !loading && productsList.length === 0 && <p className="loader">Sorry, Item are not avaliable. Please Check out other Products</p>}
            </div>
        </div>
    );
};

export default CategoryFoodDisplay;
