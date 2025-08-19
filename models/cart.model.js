import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    quantity: { type: Number, default: 1, min: 1 }
  }]
}, { timestamps: true })

export default mongoose.model('Cart', CartSchema)
