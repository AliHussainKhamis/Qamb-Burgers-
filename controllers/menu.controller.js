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

export async function menuShow(req, res) {
  try {
    const id = req.params.id
    const item = await Menu.findById(id)

    if (!item) {
      return res.status(404).json({ error: 'Not found' })
    }

    res.status(200).json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

