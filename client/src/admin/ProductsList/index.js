import React, { useEffect, useRef, useContext } from "react";
import "./List.css";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const List = () => {
    const navigate = useNavigate();
    const {
        token,
        admin,
        url,
        setHasMore,
        productsList,
        setProductsList,
        fetchProducts,
        hasMore,
        loading,
        page,
        setPage,
        searchQ,
        setSearchQ,
    } = useContext(StoreContext);

    const scrollContainerRef = useRef(null);

    useEffect(() => {
        setPage(1);
    }, [setPage]);

    useEffect(() => {
        fetchProducts();
    }, [page]);

    useEffect(() => {
        const scrollEl = scrollContainerRef.current;

        const handleScroll = () => {
            if (
                scrollEl &&
                scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 200 &&
                !loading &&
                hasMore
            ) {
                setPage((prev) => prev + 1);
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

    const removeProduct = async (productId) => {
        try {
            const response = await fetch(`${url}/admin/product/delete/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();
            if (result.success) {
                toast.success("Product deleted successfully");
                setProductsList([]);
                setHasMore(true);
                setPage(1);
            } else {
                toast.error(result.message || "Failed to delete product.");
            }
        } catch (err) {
            toast.error("Error deleting product.");
            console.error(err);
        }
    };

    useEffect(() => {
        if (!loading && (!admin || !token)) {
            toast.error("Please login as Admin first!");
            navigate("/");
        }
    }, [loading, admin, token]);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    return (
        <div className="admin-list-container">
            <h2 className="admin-list-heading">All Products</h2>
            <div className="admin-search-bar">
                <input
                    type="text"
                    value={searchQ}
                    onChange={(e) => {
                        setSearchQ(e.target.value);
                        setProductsList([]);
                        setPage(1);
                        setHasMore(true);
                    }}
                    placeholder="Search products..."
                />
            </div>

            <div className="admin-list-scroll" ref={scrollContainerRef}>
                <div className="admin-grid-wrapper">
                    {productsList.map((item) => (
                        <div key={item.productId} className="admin-product-card">
                            <div className="admin-product-image-container">
                                <img src={item.imageUrl} alt={item.productName} className="admin-product-image" />
                            </div>

                            <div className="admin-product-details">
                                <h3 className="admin-product-title">{item.productName}</h3>
                                <p className="admin-product-info">Brand: {item.brand}</p>
                                <p className="admin-product-info">Quantity: {item.quantity}</p>
                                <p className="admin-product-info">Category: {item.category}</p>
                                <p className="admin-product-info">Sub-category: {item.subCategory}</p>
                                <p className="admin-product-mfg">MFG: {formatDate(item.mfgDate)}</p>
                                <p className="admin-product-exp">EXP: {formatDate(item.expDate)}</p>
                                <p className="admin-product-price">
                                    <s>₹{item.price}</s> <b>₹{item.discountPrice}</b>
                                </p>
                            </div>

                            <button
                                className="admin-delete-btn"
                                onClick={() => removeProduct(item.productId)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                {loading && <div className="loading-spinner">
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                </div>}
                {!hasMore && <p className="admin-list-status no-more">No more products</p>}
            </div>
        </div>
    );
};

export default List;
