import Order from '../models/order.model.js'

// create a new order
export async function orderCreate(req, res) {
  try {
    const { user, items } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'items are required' })
    }

    let total = 0
    for (let i = 0; i < items.length; i++) {
      const price = Number(items[i].price) || 0
      const qty = Number(items[i].qty) || 0
      total += price * qty
    }

    const order = await Order.create({ user, items, total })
    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

