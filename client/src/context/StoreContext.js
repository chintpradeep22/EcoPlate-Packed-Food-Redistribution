import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [productsList, setProductsList] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [searchQ, setSearchQ] = useState("");
    const [category, setCategory] = useState("All")
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [admin, setAdmin] = useState(false);
    const subCategoryParam = selectedSubCategories.length > 0 ? selectedSubCategories.join(",") : "";

    const url = "https://ecoplate-packed-food-redistribution.onrender.com";

    useEffect(() => {
        setProductsList([]);
        setPage(1);
        setHasMore(true);
        fetchProducts()
    }, [category, searchQ, selectedSubCategories]);

    // Actual fetch logic when page changes
    useEffect(() => {
        fetchProducts();
    }, [page]); // Always fetch when page changes


    const addToCart = async (productId) => {
        if (token) {
            try {
                const response = await fetch(`${url}/cart/add/${productId}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (data.success) {
                    toast.success("Item added to cart", { autoClose: 800 });
                    loadCartData(token); // Refresh local cart state
                } else {
                    toast.error(data.message || "Add to cart failed", { autoClose: 800 });
                }
            } catch (err) {
                toast.error("Server error", { autoClose: 800 });
            }
        } else {
            // ✅ Guest user logic: match product from context list
            const product = productsList.find((item) => item.productId === productId);

            if (!product) {
                toast.error("Product not found in local list", { autoClose: 800 });
                return;
            }

            setCartItems((prev) => {
                const existing = prev[productId];

                const quantity = existing?.productQuantity || 0;

                return {
                    ...prev,
                    [productId]: {
                        productId: product.productId,
                        productName: product.productName,
                        brand: product.brand,
                        price: product.price,
                        discountPrice: product.discountPrice,
                        imageUrl: product.imageUrl,
                        quantity: product.quantity,
                        category: product.category,
                        subCategory: product.subCategory,
                        productQuantity: quantity + 1,
                        absoluteUrl: product.absoluteUrl || "",
                    },
                };
            });

            toast.success("Item added to cart", { autoClose: 800 });
        }
    };

    const removeFromCart = async (productId) => {
        if (token) {
            try {
                const response = await fetch(`${url}/cart/remove/${productId}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (data.success) {
                    toast.success("Item removed from cart", { autoClose: 800 });
                    loadCartData(token);
                } else {
                    toast.error(data.message || "Remove from cart failed", { autoClose: 800 });
                }
            } catch (err) {
                toast.error("Server error", { autoClose: 800 });
            }
        } else {
            // Guest user: Decrease quantity or remove
            setCartItems((prev) => {
                const existing = prev[productId];
                if (!existing) return prev;

                const updatedQuantity = existing.productQuantity - 1;

                if (updatedQuantity <= 0) {
                    const newCart = { ...prev };
                    delete newCart[productId];
                    return newCart;
                }

                return {
                    ...prev,
                    [productId]: {
                        ...existing,
                        productQuantity: updatedQuantity,
                    },
                };
            });
            toast.success("Item removed from cart", { autoClose: 800 });
        }
    };

    const deleteFromCart = async (productId) => {
        if (token) {
            try {
                const response = await fetch(`${url}/cart/delete/${productId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (data.success) {
                    toast.success("Item deleted from cart", { autoClose: 800 });
                    loadCartData(token);
                } else {
                    toast.error(data.message || "Delete from cart failed", { autoClose: 800 });
                }
            } catch (err) {
                toast.error("Server error", { autoClose: 800 });
            }
        } else {
            const updatedCart = { ...cartItems };
            delete updatedCart[productId];
            setCartItems(updatedCart);
            toast.success("Item deleted from cart", { autoClose: 800 });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        let totalAmountAfterDiscount = 0
        for (const item of Object.values(cartItems)) {
            totalAmount += (item.price || 0) * (parseInt(item.productQuantity) || 1);
            totalAmountAfterDiscount += (item.discountPrice) * (parseInt(item.productQuantity));
        }
        return { totalAmount, totalAmountAfterDiscount };
    };

    const loadCartData = async (token) => {
        try {
            const response = await fetch(`${url}/cart/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (data.success) {
                const cartMap = [];
                for (const item of data.cartData) {
                    cartMap[item.productId] = item;
                }
                setCartItems(cartMap);
            }
        } catch (err) {
            console.error("Failed to load cart data:", err);
        }
    };

    const fetchProducts = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const query = new URLSearchParams({
                page,
                limit: 50,
                search_q: searchQ,
                category: category === "All" ? "" : category,
                subCategory: subCategoryParam,
            });
            const response = await fetch(`${url}/products?${query.toString()}`);
            const json = await response.json();

            if (json.success) {
                if (json.data.length === 0) {
                    setHasMore(false);
                } else {
                    setProductsList(prev => {
                        const map = new Map();
                        prev.forEach(item => map.set(item.productId, item));
                        json.data.forEach(item => map.set(item.productId, item));
                        return Array.from(map.values());
                    });
                }
            } else {
                console.error("Fetch error:", json.message);
            }
        } catch (err) {
            console.error("Error fetching:", err);
        } finally {
            setLoading(false);
        }
    }, [url, page, hasMore, loading, searchQ, category, subCategoryParam]);


    useEffect(() => {
        const initialize = async () => {
            const localToken = localStorage.getItem("token");
            const localRole = localStorage.getItem("role")
            if (localRole) {
                setAdmin(localRole === "admin");
            }
            if (localToken) {
                setToken(localToken);
                await loadCartData(localToken);
            }
        };
        initialize();
    }, []);

    const contextValue = {
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        category,
        setCategory,
        selectedSubCategories,
        setSelectedSubCategories,
        searchQ,
        setSearchQ,
        fetchProducts,
        productsList,
        setProductsList,
        page,
        setPage,
        hasMore,
        setHasMore,
        loading,
        setLoading,
        admin,
        setAdmin
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
