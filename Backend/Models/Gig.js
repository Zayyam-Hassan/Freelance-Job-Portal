import mongoose from "mongoose";

const GigSchema = new mongoose.Schema({
  freelancer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  delivery_time: { type: Number, required: true },
  images: [{ type: String }],
  coverimage : {type: String} ,
  gig_extras: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],
  gig_tags : [
    {
      tag : { type: String, required: true }
    }
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});

const Gig = mongoose.model('Gig', GigSchema);
export default Gig;
