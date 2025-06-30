import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    cartData: [
        {
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
        }
    ]
});


const cartModel = mongoose.model('cart', cartSchema)

export default cartModel
