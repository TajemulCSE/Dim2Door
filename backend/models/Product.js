import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Local Breeds', 'Farming Breeds', 'Duck', 'Quail', 'Paragon', 'Purnava'],
  },
  subcategory: {
    type: String,
    required: true,
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number, // percentage, e.g., 20 for 20%
    default: 0,
  },
  saleEndsAt: {
    type: Date,
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
