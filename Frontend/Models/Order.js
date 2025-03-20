import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
  gig_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  freelancer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total_amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], default: 'Pending' },
  delivery_date: { type: Date },
  requirements: { type: String },
  revision_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
