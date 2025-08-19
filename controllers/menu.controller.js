import Menu from '../models/menu.model.js'

export async function menuIndex(req, res) {
  try {
    const items = await Menu.find(filter)
    res.status(200).json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
