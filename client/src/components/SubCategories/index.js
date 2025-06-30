import React, { useContext } from "react";
import "./SubCategories.css";
import { StoreContext } from "../../context/StoreContext";

const subCategoriesData = [
    {
        category: "All",
        subCategories: [
            "Baby Health",
            "Maternity Personal Care",
            "Bread Sticks & Lavash",
            "Pastries & Brownies",
            "Milk",
            "Ayurveda",
            "Toothpaste",
            "Women's Deodorants",
            "Face Masks & Safety Gears",
            "Exotic & Flavoured Tea",
            "Children (2-5 Yrs)",
            "Green Tea",
            "Non Alcoholic Drinks",
            "Soap Cases & Dispensers",
            "Agarbatti, Incense Sticks",
            "Utensil Scrub-Pad, Glove",
            "Toilet Paper",
            "Farm Eggs",
            "Fresh Mutton",
            "Fresh Chicken",
            "Seasonal Fruits",
            "Beans, Brinjals & Okra",
            "Potato, Onion & Tomato",
            "International Chocolates",
            "Organic & Cold Press Oil",
            "Beans & Pulses",
            "Fertilizers & Pesticides",
            "Copper Utensils",
            "Tawa & Sauce Pan",
            "Fresh Sweets",
            "Marie, Health, Digestive",
            "Cream Biscuits & Wafers",
            "Non Veg Pickle",
        ]
    },
    {
        category: "Baby Care",
        subCategories: [
            "Baby Health",
            "Maternity Personal Care",
            "Baby Oil & Shampoo",
            "Baby Creams & Lotions",
            "Baby Powder",
            "Baby Bath",
            "Combs, Brushes, Clippers",
            "Diapers",
            "Baby Laundry",
            "Baby Oral Care",
            "Baby Gift Sets",
            "Baby Wipes"
        ]
    },
    {
        category: "Bakery, Cakes & Dairy",
        subCategories: [
            "Curd",
            "Muffins & Cup Cakes",
            "Bread Sticks & Lavash",
            "Pastries & Brownies",
            "Milk",
            "Rusks",
            "Paneer, Tofu & Cream",
            "Butter & Margarine",
            "Tea Cakes & Slice Cakes",
            "Flavoured, Soya Milk",
            "Doughnuts & Mousses",
            "Khari & Cream Rolls",
            "Yogurt & Shrikhand",
            "Dairy Free (Vegan)",
            "Croissants, Bagels",
            "Cheese",
            "Premium Cookies",
            "Bakery Biscuits, Cookies",
            "Ice Creams",
            "Breadcrumbs & Croutons"
        ]
    },
    {
        category: "Beauty & Hygiene",
        subCategories: [
            "Ayurveda",
            "Toothpaste",
            "Women's Deodorants",
            "Face Masks & Safety Gears",
            "Perfume",
            "Body Sprays & Mists",
            "Eye Care",
            "Intimate Wash & Care",
            "Eau De Toilette",
            "Sanitary Napkins",
            "Tools & Accessories",
            "Lips",
            "Face",
            "Hair Color",
            "Makeup Kits & Gift Sets",
            "Hair Styling",
            "Mouthwash",
            "Bathing Accessories",
            "Bath Salts & Oils",
            "Bathing Bars & Soaps",
            "Adult Diapers",
            "Body Care",
            "Men's Deodorants",
            "Eyes",
            "Nails",
            "Gift Sets",
            "Sexual Wellness",
            "Everyday Medicine",
            "Toothbrush",
            "Body Scrubs & Exfoliants",
            "Hair Care & Styling",
            "Aromatherapy",
            "Makeup Accessories",
            "Lip Care",
            "Eau De Parfum",
            "Supplements & Proteins",
            "Face & Body",
            "Electric Toothbrush",
            "Hair Oil & Serum",
            "Hair & Scalp Treatment",
            "Bath & Shower",
            "Moustache & Beard Care",
            "Hand Wash & Sanitizers",
            "Shower Gel & Body Wash",
            "Shampoo & Conditioner",
            "Eau De Cologne",
            "Hair Removal",
            "Shaving Care",
            "Tampons & Menstrual Cups",
            "Face Care",
            "Antiseptics & Bandages"
        ]
    },
    {
        category: "Beverages",
        subCategories: [
            "Exotic & Flavoured Tea",
            "Children (2-5 Yrs)",
            "Green Tea",
            "Non Alcoholic Drinks",
            "Syrups & Concentrates",
            "Unsweetened, Cold Press",
            "Leaf & Dust Tea",
            "Ground Coffee",
            "Cold Drinks",
            "Juices",
            "Tea Bags",
            "Instant Coffee",
            "Kids (5+Yrs)"
        ]
    }, {
        category: "Cleaning & Household",
        subCategories: [
            "Soap Cases & Dispensers",
            "Agarbatti, Incense Sticks",
            "Utensil Scrub-Pad, Glove",
            "Toilet Paper",
            "Mops, Wipers",
            "Caps, Balloons & Candles",
            "Mosquito Repellent",
            "Floor & Other Cleaners",
            "Dustbins",
            "Fabric Pre, Post Wash",
            "Seasonal Accessories",
            "Dishwash Bars & Powders",
            "Paper Napkin, Tissue Box",
            "Scissor, Glue & Tape",
            "Erasers & Sharpeners",
            "Shoe Shiners & Brushes",
            "Holi Colours & Pichkari",
            "Other Pooja Needs",
            "Dust Cloth & Wipes",
            "Exam Pads & Pencil Box",
            "Bath Stool, Basin & Sets",
            "Electronic Accessories",
            "Lamp & Lamp Oil",
            "Notebooks, Files, Folders",
            "Dishwash Liquids & Pastes",
            "Rakhi",
            "Detergent Powder, Liquid",
            "Aluminium Foil, Clingwrap",
            "Toilet & Other Brushes",
            "Air Freshener",
            "Toilet Cleaners",
            "Disinfectant Spray & Cleaners",
            "Kitchen, Glass & Drain",
            "Laundry, Storage Baskets",
            "Candles & Match Box",
            "Brooms & Dust Pans",
            "Decorations",
            "Disposable Cups & Plates",
            "Pooja Thali & Bells",
            "Hangers, Clips & Rope",
            "Buckets & Mugs",
            "Games & Calculators",
            "Colours & Crayons"
        ]
    },
    {
        category: "Eggs, Meat & Fish",
        subCategories: [
            "Farm Eggs",
            "Marinated Meat",
            "Marine Water Fish",
            "Prawns & Shrimps",
            "Fresh Mutton",
            "Fresh Chicken",
            "Fresh Water Fish",
            "Chicken Sausages",
            "Other Seafood",
            "Frozen Fish & Seafood",
            "Protein Eggs"
        ]
    },
    {
        category: "Foodgrains, Oil & Masala",
        subCategories: [
            "Blended Cooking Oils",
            "Almonds",
            "Ghee & Vanaspati",
            "Organic Edible Oil, Ghee",
            "Cereals & Millets",
            "Boiled & Steam Rice",
            "Cooking Coconut Oil",
            "Sunflower, Rice Bran Oil",
            "Organic Millet & Flours",
            "Blended Masalas",
            "Atta Whole Wheat",
            "Poha, Sabudana & Murmura",
            "Mukhwas",
            "Organic Dals & Pulses",
            "Olive & Canola Oils",
            "Whole Spices",
            "Organic Rice, Other Rice",
            "Powdered Spices",
            "Herbs & Seasoning",
            "Raisins",
            "Toor, Channa & Moong Dal",
            "Sugarfree Sweeteners",
            "Organic Flours",
            "Urad & Other Dals",
            "Salts",
            "Other Dry Fruits",
            "Raw Rice",
            "Rice & Other Flours",
            "Basmati Rice",
            "Cooking Pastes",
            "Cashews",
            "Sugar & Jaggery",
            "Organic Sugar, Jaggery",
            "Sooji, Maida & Besan",
            "Gingelly Oil",
            "Organic Dry Fruits",
            "Organic Masalas & Spices"
        ]
    },
    {
        category: "Fruits & Vegetables",
        subCategories: [
            "Seasonal Fruits",
            "Beans, Brinjals & Okra",
            "Potato, Onion & Tomato",
            "Cucumber & Capsicum",
            "Lemon, Ginger & Garlic",
            "Specialty",
            "Organic Fruits",
            "Cut Fruit, Tender Coconut",
            "Apples & Pomegranate",
            "Leafy Vegetables",
            "Root Vegetables",
            "Organic Vegetables",
            "Cut & Peeled Veggies",
            "Exotic Vegetables",
            "Gourd, Pumpkin, Drumstick",
            "Indian & Exotic Herbs"
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

const SubCategories = ({ featureMode = false }) => {
    const {
        category,
        selectedSubCategories,
        setSelectedSubCategories,
    } = useContext(StoreContext);

    const matched = subCategoriesData.find(item => item.category === category);

    if (!matched) return null;

    const handleSelect = sub => {
        setSelectedSubCategories(prev =>
            prev.includes(sub)
                ? prev.filter(item => item !== sub)
                : [...prev, sub]
        );
    };

    return (
        <div className="subcategory-list">
            {matched.subCategories.map((sub, idx) => (
                <div
                    key={idx}
                    className={`subcategory-item ${selectedSubCategories.includes(sub) ? "active" : ""}`}
                    onClick={() => !featureMode && handleSelect(sub)}
                >
                    {featureMode ? (
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedSubCategories.includes(sub)}
                                onChange={() => handleSelect(sub)}
                            />
                            {sub}
                        </label>
                    ) : (
                        sub
                    )}
                </div>
            ))}
        </div>
    );
};

export default SubCategories;