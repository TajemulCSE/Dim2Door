import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Customer", "Retailer", "Delivery Personnel", "Admin"],
    default: "Customer"
  },
  address: {
    type: String,
    required: function() { return this.role === "Customer"; }
  },
  phone: { type: String, required: true },
  businessName: {
    type: String,
    required: function() { return this.role === "Retailer"; }
  },
  shopAddress: {
    type: String,
    required: function() { return this.role === "Retailer"; }
  },
  serviceArea: { type: String },
  vehicleType: {
    type: String,
    required: function() { return this.role === "Delivery Personnel"; }
  },
  vehicleNumber: {
    type: String,
    required: function() { return this.role === "Delivery Personnel"; }
  },
  nidPath: {
    type: String,
    required: function() { return this.role !== "Customer"; }
  }
}, { timestamps: true });

// hash on save
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// compare
userSchema.methods.matchPassword = function(entered) {
  return bcrypt.compare(entered, this.password);
};

export default mongoose.model("User", userSchema)