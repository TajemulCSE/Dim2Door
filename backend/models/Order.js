import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        // ← Changed to String so “4” or 4 will no longer try to cast to ObjectId
        product:  { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price:    { type: Number, required: true, min: 0 },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone:    { type: String, required: true },
      street:   { type: String, required: true },
      city:     { type: String, required: true },
      zip:      { type: String },
      country:  { type: String, required: true },
    },
    paymentMethod: { type: String, enum: ["cod", "bkash"], default: "cod" },
    subtotal:      { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
