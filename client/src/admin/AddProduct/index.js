import React, { useState, useContext, useEffect } from "react";
import "./Add.css";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const categoryOptions = [
    {
        category: "Baby Care",
        subCategories: [
            "Baby Health", "Maternity Personal Care", "Baby Oil & Shampoo", "Baby Creams & Lotions",
            "Baby Powder", "Baby Bath", "Combs, Brushes, Clippers", "Diapers", "Baby Laundry",
            "Baby Oral Care", "Baby Gift Sets", "Baby Wipes"
        ]
    },
    {
        category: "Bakery, Cakes & Dairy",
        subCategories: [
            "Curd", "Muffins & Cup Cakes", "Bread Sticks & Lavash", "Pastries & Brownies", "Milk", "Rusks",
            "Paneer, Tofu & Cream", "Butter & Margarine", "Tea Cakes & Slice Cakes", "Flavoured, Soya Milk",
            "Doughnuts & Mousses", "Khari & Cream Rolls", "Yogurt & Shrikhand", "Dairy Free (Vegan)",
            "Croissants, Bagels", "Cheese", "Premium Cookies", "Bakery Biscuits, Cookies", "Ice Creams",
            "Breadcrumbs & Croutons"
        ]
    },
    {
        category: "Beauty & Hygiene",
        subCategories: [
            "Ayurveda", "Toothpaste", "Women's Deodorants", "Face Masks & Safety Gears", "Perfume",
            "Body Sprays & Mists", "Eye Care", "Intimate Wash & Care", "Eau De Toilette", "Sanitary Napkins",
            "Tools & Accessories", "Lips", "Face", "Hair Color", "Makeup Kits & Gift Sets", "Hair Styling",
            "Mouthwash", "Bathing Accessories", "Bath Salts & Oils", "Bathing Bars & Soaps", "Adult Diapers",
            "Body Care", "Men's Deodorants", "Eyes", "Nails", "Gift Sets", "Sexual Wellness",
            "Everyday Medicine", "Toothbrush", "Body Scrubs & Exfoliants", "Hair Care & Styling",
            "Aromatherapy", "Makeup Accessories", "Lip Care", "Eau De Parfum", "Supplements & Proteins",
            "Face & Body", "Electric Toothbrush", "Hair Oil & Serum", "Hair & Scalp Treatment",
            "Bath & Shower", "Moustache & Beard Care", "Hand Wash & Sanitizers", "Shower Gel & Body Wash",
            "Shampoo & Conditioner", "Eau De Cologne", "Hair Removal", "Shaving Care",
            "Tampons & Menstrual Cups", "Face Care", "Antiseptics & Bandages"
        ]
    },
    {
        category: "Beverages",
        subCategories: [
            "Exotic & Flavoured Tea", "Children (2-5 Yrs)", "Green Tea", "Non Alcoholic Drinks",
            "Syrups & Concentrates", "Unsweetened, Cold Press", "Leaf & Dust Tea", "Ground Coffee",
            "Cold Drinks", "Juices", "Tea Bags", "Instant Coffee", "Kids (5+Yrs)"
        ]
    },
    {
        category: "Fruits & Vegetables",
        subCategories: [
            "Seasonal Fruits", "Beans, Brinjals & Okra", "Potato, Onion & Tomato", "Cucumber & Capsicum",
            "Lemon, Ginger & Garlic", "Specialty", "Organic Fruits", "Cut Fruit, Tender Coconut",
            "Apples & Pomegranate", "Leafy Vegetables", "Root Vegetables", "Organic Vegetables",
            "Cut & Peeled Veggies", "Exotic Vegetables", "Gourd, Pumpkin, Drumstick", "Indian & Exotic Herbs"
        ]
    },
    {
        category: "Gourmet & World Food",
        subCategories: [
            "International Chocolates",
            "Organic & Cold Press Oil",
            "Beans & Pulses",
            "Chocolate, Peanut Spread",
            "Mustard & Cheese Sauces",
            "Healthy, Baked Snacks",
            "Imported Noodles",
            "Muesli & Rice Cakes",
            "Dry Fruits & Berries",
            "Cereal & Granola Bars",
            "Honey & Maple Syrup",
            "Aerated, Still, Sparkling",
            "Olive, Jalapeno, Gherkin",
            "Gourmet Juices & Drinks",
            "Herbs, Seasonings & Rubs",
            "Marshmallow, Candy, Jelly",
            "Roasted Seeds & Nuts",
            "Imported Oats & Porridge",
            "Tomatoes & Vegetables",
            "Cooking Chocolate, Cocoa",
            "Hummus, Cheese, Salsa Dip",
            "Gourmet Tea & Tea Bags",
            "Extra Virgin Olive Oil",
            "Pastas & Spaghetti",
            "Jams, Marmalade, Spreads",
            "Nachos & Chips",
            "Health Drinks",
            "Salad Dressings",
            "Canola & Rapeseed Oil",
            "Coffee & Pre-Mix",
            "Curry Paste, Coconut Milk",
            "Quinoa & Grains",
            "Flavoured & Greek Yogurt",
            "Milk & Soya Drinks",
            "Balsamic & Cider Vinegar",
            "Thai & Asian Sauces",
            "Non-Alcoholic Beer, Wine",
            "Luxury Chocolates, Gifts",
            "Flours & Pre-Mixes",
            "Pure, Pomace Olive Oil"
        ]
    },
    {
        category: "Kitchen, Garden & Pets",
        subCategories: [
            "Fertilizers & Pesticides",
            "Copper Utensils",
            "Tawa & Sauce Pan",
            "Vacuum Flask",
            "Lunch Boxes",
            "Pet Cleaning & Grooming",
            "Wall Hooks & Hangers",
            "Choppers & Graters",
            "Cook And Serve",
            "Casserole",
            "Plates & Tumblers",
            "Pots, Planters & Trays",
            "Gardening Tools",
            "Cloth Dryer & Iron Table",
            "Microwavable Cookware",
            "Water & Fridge Bottles",
            "CFL & Led Bulbs",
            "Lighters",
            "Glassware",
            "Baking Tools & Brushes",
            "Pet Feeding Support",
            "Dinner Sets",
            "Pet Meals & Treats",
            "Containers Sets",
            "Battery & Electrical",
            "Strainer, Ladle, Spatula",
            "Cups, Mugs & Tumblers",
            "Cookware Sets",
            "Gas Stove",
            "Pressure Cookers",
            "Steel Storage Containers",
            "Steel Lunch Boxes",
            "Kadai & Fry Pans",
            "Bowls & Vessels",
            "Bakeware Accessories",
            "Kitchen Tools & Other Accessories",
            "Knives & Peelers",
            "Pet Collars & Leashes",
            "Plates & Bowls",
            "Racks & Holders",
            "Cutlery, Spoon & Fork",
            "Bakeware Moulds, Cutters"
        ]
    },
    {
        category: "Snacks & Branded Foods",
        subCategories: [
            "Fresh Sweets",
            "Marie, Health, Digestive",
            "Cream Biscuits & Wafers",
            "Non Veg Pickle",
            "Chips & Corn Snacks",
            "Chikki & Gajjak",
            "Chutney Powder",
            "Salted Biscuits",
            "Choco & Nut Spread",
            "Jam, Conserve, Marmalade",
            "Instant Noodles",
            "Frozen Veg Snacks",
            "Oats & Porridge",
            "Frozen Vegetables",
            "Mayonnaise",
            "Hakka Noodles",
            "Gift Boxes",
            "Namkeen & Savoury Snacks",
            "Heat & Eat Ready Meals",
            "Toffee, Candy & Lollypop",
            "Glucose & Milk Biscuits",
            "Granola & Cereal Bars",
            "Pasta & Macaroni",
            "Flakes",
            "Chilli & Soya Sauce",
            "Papads, Ready To Fry",
            "Chocolates",
            "Honey",
            "Frozen Non-Veg Snacks",
            "Muesli",
            "Tinned, Packed Sweets",
            "Kids Cereal",
            "Tomato Ketchup & Sauces",
            "Other Veg Pickle",
            "Frozen Indian Breads",
            "Breakfast & Snack Mixes",
            "Home Baking",
            "Cookies",
            "Dessert Mixes",
            "Instant Pasta"
        ],
    }
];

const Add = () => {
    const navigate = useNavigate();
    const { url, token, admin, loading } = useContext(StoreContext);

    const [data, setData] = useState({
        image: "",
        name: "",
        brand: "",
        price: "",
        discountPrice: "",
        quantity: "",
        absoluteUrl: "",
        category: "Fruits & Vegetables",
        subCategory: "",
        mfgDate: "",
        expDate: ""
    });

    useEffect(() => {
        if (!loading && (!admin || !token)) {
            toast.error("Please login as Admin first!");
            navigate("/");
        }
    }, [loading, token, admin]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "category" ? { subCategory: "" } : {})
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const payload = {
            productQuantity: 1,
            productName: data.name,
            brand: data.brand,
            price: Number(data.price),
            discountPrice: Number(data.discountPrice),
            imageUrl: data.image,
            quantity: data.quantity,
            category: data.category,
            subCategory: data.subCategory,
            absoluteUrl: data.absoluteUrl,
            mfgDate: data.mfgDate,
            expDate: data.expDate
        };

        try {
            const response = await fetch(`${url}/admin/products/add`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success) {
                toast.success(result.message || "Product added successfully!");
                setData({
                    image: "",
                    name: "",
                    brand: "",
                    price: "",
                    discountPrice: "",
                    quantity: "",
                    absoluteUrl: "",
                    category: "Fruits & Vegetables",
                    subCategory: "",
                    mfgDate: "",
                    expDate: ""
                });
            } else {
                toast.error(result.message || "Failed to add product.");
            }
        } catch (err) {
            toast.error("Something went wrong while adding the item.");
            console.error(err);
        }
    };

    const selectedSubCategories =
        categoryOptions.find((item) => item.category === data.category)?.subCategories || [];

    return (
        <div className="add-container">
            <form onSubmit={onSubmitHandler} className="add-form">
                <div className="form-group">
                    <label>Image URL</label>
                    <input name="image" value={data.image} onChange={onChangeHandler} required />
                </div>
                <div className="form-group">
                    <label>Product Name</label>
                    <input name="name" value={data.name} onChange={onChangeHandler} required />
                </div>
                <div className="form-group">
                    <label>Brand</label>
                    <input name="brand" value={data.brand} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    <label>Absolute Product URL</label>
                    <input name="absoluteUrl" value={data.absoluteUrl} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    <label>Quantity (e.g., 5 kg)</label>
                    <input name="quantity" value={data.quantity} onChange={onChangeHandler} />
                </div>
                <div className="form-row">
                    <div className="form-group half">
                        <label>Category</label>
                        <select name="category" value={data.category} onChange={onChangeHandler}>
                            {categoryOptions.map((cat) => (
                                <option key={cat.category}>{cat.category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group half">
                        <label>Subcategory</label>
                        <select name="subCategory" value={data.subCategory} onChange={onChangeHandler} required>
                            <option value="" disabled>-- Select --</option>
                            {selectedSubCategories.map((sub) => (
                                <option key={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group half">
                        <label>MFG Date</label>
                        <input type="date" name="mfgDate" value={data.mfgDate} onChange={onChangeHandler} required />
                    </div>
                    <div className="form-group half">
                        <label>EXP Date</label>
                        <input type="date" name="expDate" value={data.expDate} onChange={onChangeHandler} required />
                    </div>
                </div>
                <div className="form-group">
                    <label>Price (₹)</label>
                    <input type="number" name="price" value={data.price} onChange={onChangeHandler} required />
                </div>
                <div className="form-group">
                    <label>Discount Price (₹)</label>
                    <input type="number" name="discountPrice" value={data.discountPrice} onChange={onChangeHandler} />
                </div>
                <button type="submit" className="btn-submit">Add Product</button>
            </form>
        </div>
    );
};

export default Add;
