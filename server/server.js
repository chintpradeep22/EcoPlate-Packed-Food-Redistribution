import express, { request, response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productModel from './models/Product.js'
import authMiddleware from "./middleware/auth.js";
import userModel from "./models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v4 as uuidv4 } from 'uuid';
import cartModel from "./models/cartModel.js";
import orderModel from "./models/orderModel.js";
import cors from 'cors';


dotenv.config();
const app = express()
const PORT = process.env.PORT || 4000
connectDB();

app.use(express.json());
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})


// adjust the path as needed

app.get('/products', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search_q = "",
      category = "",
      subCategory = ""
    } = req.query;

    const query = {
      $and: [
        {
          $or: [
            { productName: { $regex: search_q, $options: "i" } },
            { brand: { $regex: search_q, $options: "i" } }
          ]
        }
      ]
    };

    // Add category filter if present
    if (category) {
      query.$and.push({ category });
    }

    // Add subCategory filter if present
    if (subCategory) {
      // Support multiple subCategories as comma-separated string
      const subCats = subCategory.split(",").map(s => s.trim());
      query.$and.push({ subCategory: { $in: subCats } });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await productModel
      .find(query)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await productModel.countDocuments(query);

    res.send({
      success: true,
      data: products,
      total,
      page: parseInt(page),
      hasMore: skip + products.length < total,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).send({ success: false, error: "Failed to fetch products" });
  }
});



app.post("/register/", async (request, response) => {
  const { name, email, password } = request.body;
  try {
    // checking user is already exist
    const exists = await userModel.findOne({ email });
    if (exists) {
      return response.json({ success: false, message: "User already exists" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email) || !email.endsWith('@gmail.com')) {
      return response.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return response.json({
        success: false,
        message: "Please enter strong password",
      });
    }

    // hashing user password

    const hassedPassword = await bcrypt.hash(password, 10)
    const newUser = new userModel({
      userId: uuidv4(),
      name: name,
      email: email,
      password: hassedPassword,
    });

    const user = await newUser.save();

    const role = user.role;
    const userId = user.userId
    await cartModel.create({
      userId,
      cartData: []
    });

    const payload = {
      userId: userId,
    }
    const jwtToken = jwt.sign(payload, process.env.MY_SECRECT_KEY)
    response.json({ success: true, jwtToken, role, userId, });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
});

app.post('/login/', async (request, response) => {
  const { email, password } = request.body
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.json({ success: false, message: "User Doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.json({ success: false, message: "Invalid Credentials" });
    }
    const role = user.role;
    const userId = user.userId
    const payload = {
      userId: userId,
    }
    const jwtToken = jwt.sign(payload, process.env.MY_SECRECT_KEY)
    response.json({ success: true, jwtToken, role, userId, });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: `Error: ${error}` });
  }
})

app.get('/cart/', authMiddleware, async (request, response) => {
  const userId = request.userId;
  try {
    const cart = await cartModel.findOne({ userId }) // .find() fetches all documents
    if (!cart) {
      return response.json({ success: false, message: "Cart not found" });
    }
    response.json({ success: true, cartData: cart.cartData });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: 'Failed to fetch cart items' });
  }
})

app.post('/cart/add/:productId', authMiddleware, async (request, response) => {
  const userId = request.userId;
  const { productId } = request.params;

  try {
    const product = await productModel.findOne({ productId });

    if (!product) {
      return response.status(404).json({ success: false, message: "Product not found" });
    }

    const userCart = await cartModel.findOne({ userId });

    if (!userCart) {
      return response.status(404).json({ success: false, message: "Cart not found" });
    }

    // ✅ FIXED COMPARISON
    const existingItem = userCart.cartData.find(item => item.productId === productId);

    if (existingItem) {
      // ✅ Increment quantity
      const qty = parseInt(existingItem.productQuantity || '1');
      existingItem.productQuantity = String(qty + 1);
    } else {
      // ✅ Add new item with productQuantity initialized
      userCart.cartData.push({
        productId: product.productId,
        productName: product.productName,
        brand: product.brand,
        price: product.price,
        discountPrice: product.discountPrice,
        imageUrl: product.imageUrl,
        quantity: product.quantity,
        category: product.category,
        subCategory: product.subCategory,
        productQuantity: "1", // set initial cart quantity
        absoluteUrl: product.absoluteUrl || '',
      });
    }

    await userCart.save();
    return response.json({ success: true, message: "Product added to cart" });

  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, message: "Server error" });
  }
});


app.post('/cart/remove/:productId', authMiddleware, async (request, response) => {
  const userId = request.userId;
  const { productId } = request.params;

  try {
    const userCart = await cartModel.findOne({ userId });

    if (!userCart) {
      return response.status(404).json({ success: false, message: "Cart not found" });
    }

    const existingItemIndex = userCart.cartData.findIndex(item => item.productId === productId);

    if (existingItemIndex === -1) {
      return response.status(404).json({ success: false, message: "Product not in cart" });
    }

    const existingItem = userCart.cartData[existingItemIndex];
    const qty = parseInt(existingItem.productQuantity || '1');

    if (qty > 1) {
      existingItem.productQuantity = String(qty - 1);
    } else {
      // Remove the item if quantity is 1
      userCart.cartData.splice(existingItemIndex, 1);
    }

    await userCart.save();
    return response.json({ success: true, message: "Product updated in cart" });

  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete('/cart/delete/:productId', authMiddleware, async (request, response) => {
  const userId = request.userId;
  const { productId } = request.params;

  try {
    const userCart = await cartModel.findOne({ userId });

    if (!userCart) {
      return response.status(404).json({ success: false, message: "Cart not found" });
    }

    const initialLength = userCart.cartData.length;
    userCart.cartData = userCart.cartData.filter(item => item.productId !== productId);

    if (userCart.cartData.length === initialLength) {
      return response.status(404).json({ success: false, message: "Product not found in cart" });
    }

    await userCart.save();
    return response.json({ success: true, message: "Product deleted from cart" });

  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, message: "Server error" });
  }
});


app.get('/orders/', authMiddleware, async (request, response) => {
  const userId = request.userId;
  try {
    const order = await orderModel.find({ userId }) // .find() fetches all documents
    if (!order) {
      return response.json({ success: false, message: "Order not found" });
    }
    response.json({ success: true, order: order });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
})

app.post('/orders/place', authMiddleware, async (request, response) => {
  const { address, items, amount } = request.body;
  const userId = request.userId;

  try {
    // Validation
    if (!address || !items || !Array.isArray(items) || items.length === 0 || !amount) {
      return response.status(400).json({ success: false, message: "All fields (address, items, amount) are required" });
    }

    // Create order
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      payment: true,
      status: "Processing",
    });

    await newOrder.save();

    // Clear cart
    await cartModel.updateOne({ userId }, { $set: { cartData: [] } });

    // ✅ Update status: Out for Delivery after 1 minute
    setTimeout(async () => {
      const order = await orderModel.findById(newOrder._id);
      if (order && order.status !== "Cancelled") {
        await orderModel.findByIdAndUpdate(newOrder._id, { status: "Out for Delivery" });
      }
    }, 60 * 1000);

    // ✅ Update status: Delivered after 2 minutes
    setTimeout(async () => {
      const order = await orderModel.findById(newOrder._id);
      if (order && order.status !== "Cancelled") {
        await orderModel.findByIdAndUpdate(newOrder._id, { status: "Delivered" });
      }
    }, 2 * 60 * 1000);

    return response.status(200).json({ success: true, message: "Order placed successfully" });

  } catch (err) {
    console.error("Order placing failed:", err);
    response.status(500).json({ success: false, message: "Order placing failed" });
  }
});

app.delete('/orders/cancel/:orderId', authMiddleware, async (request, response) => {
  try {
    const userId = request.userId;
    const { orderId } = request.params;

    const order = await orderModel.findOne({ _id: orderId, userId });

    if (!order) {
      return response.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.status === "Delivered") {
      return response.status(400).json({ success: false, message: "Cannot cancel a delivered order" });
    }

    if (order.status === "Out for Delivery") {
      return response.status(400).json({ success: false, message: "Cannot cancel a Out for Delivery order" });
    }

    if (order.status === "Cancelled") {
      return response.status(400).json({ success: false, message: "Order already cancelled" });
    }

    order.status = "Cancelled";
    await order.save();

    response.status(200).json({ success: true, message: "Order cancelled successfully" });

  } catch (err) {
    console.error("Cancel order error:", err);
    response.status(500).json({ success: false, message: "Failed to cancel order" });
  }
});

//Admin Backend

app.get("/admin/users", authMiddleware, async (request, response) => {
  const userId = request.userId
  try {
    let userData = await userModel.findOne({ userId })
    if (!userData || userData.role !== "admin") {
      return response.status(403).json({ success: false, message: "You are not an admin" });
    }

    const users = await userModel.find()
    response.status(200).json({ success: true, usersData: users })
  }
  catch (err) {
    console.error("Error in /admin/users:", err);
    return response.status(500).json({ success: false, message: "Server error" });
  }
})

app.post('/admin/products/add', authMiddleware, async (request, response) => {
  const userId = request.userId;
  const {
    productName,
    brand,
    price,
    discountPrice,
    imageUrl,
    quantity,
    category,
    subCategory,
    absoluteUrl,
    mfgDate,
    expDate
  } = request.body;

  try {
    // Check if the user is admin
    const userData = await userModel.findOne({ userId });
    if (!userData || userData.role !== "admin") {
      return response.status(403).json({ success: false, message: "You are not an admin" });
    }

    // Check required fields
    if (!productName || !price || !quantity || !category) {
      return response.status(400).json({ success: false, message: "Missing required product fields" });
    }

    // Create new product
    const newProduct = new productModel({
      productId: uuidv4(),
      productName,
      brand,
      price,
      discountPrice,
      imageUrl,
      quantity,
      category,
      subCategory,
      productQuantity: 1,
      absoluteUrl,
      mfgDate,
      expDate
    });

    await newProduct.save();

    return response.status(201).json({ success: true, message: "Product added successfully" });

  } catch (error) {
    console.error("Error adding product:", error);
    response.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete('/admin/product/delete/:productId', authMiddleware, async (request, response) => {
  const userId = request.userId;
  const { productId } = request.params;

  try {
    const userData = await userModel.findOne({ userId });
    if (!userData || userData.role !== "admin") {
      return response.status(403).json({ success: false, message: "You are not an admin" });
    }

    const deletedProduct = await productModel.findOneAndDelete({ productId });

    if (!deletedProduct) {
      return response.status(404).json({ success: false, message: "Product not found" });
    }

    return response.status(200).json({ success: true, message: "Product deleted successfully" });

  }
  catch (error) {
    console.error("Error deleting product:", error);
    response.status(500).json({ success: false, message: "Server error" });
  }
});

/*app.get("/products/category-map", async (req, res) => {
  try {
    const categoryMap = await productModel.aggregate([
      {
        $group: {
          _id: "$category",
          subCategories: { $addToSet: "$subCategory" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          subCategories: 1,
        },
      },
      {
        $sort: { category: 1 }, // optional: sort categories alphabetically
      },
    ]);

    res.send({
      success: true,
      data: categoryMap,
    });
  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).send({
      success: false,
      error: "Failed to fetch category-subcategory mapping",
    });
  }
});*/

app.get("/admin/orders/list", authMiddleware, async (request, response) => {
  const userId = request.userId
  try {
    let userData = await userModel.findOne({ userId })
    if (!userData || userData.role !== "admin") {
      return response.status(403).json({ success: false, message: "You are not an admin" });
    }

    const orders = await orderModel.find()
    response.status(200).json({ success: true, ordersList: orders })
  }
  catch (err) {
    console.error("Error in /admin/order/list:", err);
    return response.status(500).json({ success: false, message: "Server error" });
  }
})

app.put("/orders/update-status", authMiddleware, async (req, res) => {
  const userId = request.userId
  try {
    let userData = await userModel.findOne({ userId })
    if (!userData || userData.role !== "admin") {
      return response.status(403).json({ success: false, message: "You are not an admin" });
    }
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Order ID and status are required." });
    }

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, message: "Order status updated successfully." });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Server error while updating order status." });
  }
});

app.delete("/admin/users/delete/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const requestingUser = await userModel.findOne({ userId: req.userId });

    // Check if requester is admin
    if (!requestingUser || requestingUser.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    const deletedUser = await userModel.findOneAndDelete({ userId });

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ success: false, message: "Server error while deleting user." });
  }
});

app.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Validate new password
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Hash and update the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});