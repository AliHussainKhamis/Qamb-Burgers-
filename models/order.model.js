import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: String,   
  items: [
    {
      name: String,
      price: Number,
      qty: { type: Number, default: 1 }
    }
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Order', orderSchema)
