import Cart from '../models/cart.model.js'

export async function cartGet(req, res) {
  try {
    const userId = req.params.userId
    const found = await Cart.findOne({ user: userId })
    const cart = found || await Cart.create({ user: userId, items: [] })
    res.json(cart)
  } catch (e) { res.status(500).json({ error: e.message }) }
}

export async function cartAddItem(req, res) {
  try {
    const { userId } = req.params
    const { menuItemId, quantity } = req.body || {}
    const cart = await Cart.findOne({ user: userId }) || await Cart.create({ user: userId, items: [] })
    cart.items.push({ menuItem: menuItemId, quantity: quantity || 1 })
    await cart.save()
    res.json(cart)
  } catch (e) { res.status(500).json({ error: e.message }) }
}
