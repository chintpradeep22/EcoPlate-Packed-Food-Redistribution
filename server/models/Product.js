import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  brand: { type: String },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  imageUrl: { type: String },
  quantity: { type: String },
  category: { type: String },
  subCategory: { type: String },
  absoluteUrl: { type: String },
  productQuantity: { type: Number },
  mfgDate: { type: Date, required: true },
  expDate: { type: Date, required: true },
}, {
  timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
