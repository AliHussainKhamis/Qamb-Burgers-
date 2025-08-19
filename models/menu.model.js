import mongoose from 'mongoose'

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: String,
  imageUrl: String,
  category: { type: String, required: true },
  price: { type: Number, required: true }
}, { timestamps: true })

export default mongoose.model('Menu', MenuSchema)
