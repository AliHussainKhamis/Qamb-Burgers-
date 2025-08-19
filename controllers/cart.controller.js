import Cart from '../models/cart.model.js'

export async function cartGet(req, res) {
  try {
    const userId = req.params.userId
    const found = await Cart.findOne({ user: userId })
    const cart = found || await Cart.create({ user: userId, items: [] })
    res.json(cart)
  } catch (error) { res.status(500).json({ error: error.message }) }
}

export async function cartAddItem(req, res) {
  try {
    const { userId } = req.params
    const { menuItemId, quantity } = req.body || {}
    const cart = await Cart.findOne({ user: userId }) || await Cart.create({ user: userId, items: [] })
    cart.items.push({ menuItem: menuItemId, quantity: quantity || 1 })
    await cart.save()
    res.json(cart)
  } catch (error) { res.status(500).json({ error: error.message }) }
}

export async function cartRemoveItem(req, res) {
  try {
    const { userId, lineId } = req.params
    const cart = await Cart.findOne({ user: userId })
    if (!cart) return res.status(404).json({ error: 'Cart not found' })
    const line = cart.items.id(lineId)
    if (!line) return res.status(404).json({ error: 'Line not found' })
    line.deleteOne()
    await cart.save()
    res.json(cart)
  } catch (error) { res.status(500).json({ error: error.message }) }
}

export async function cartClear(req, res) {
  try {
    const userId = req.params.userId
    const cart = await Cart.findOne({ user: userId })
    if (!cart) return res.status(404).json({ error: 'Cart not found' })
    cart.items = []
    await cart.save()
    res.json(cart)
  } catch (error) { res.status(500).json({ error: error.message }) }
}
