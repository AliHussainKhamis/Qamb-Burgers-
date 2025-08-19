import Menu from '../models/menu.model.js'

export async function menuIndex(req, res) {
  try {
    const filter = {}

    if (req.query && req.query.category) {
      filter.category = req.query.category
    }

    if (req.query && req.query.q) {
      filter.name = { $regex: req.query.q, $options: 'i' }
    }

    const items = await Menu.find(filter)
    res.status(200).json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
