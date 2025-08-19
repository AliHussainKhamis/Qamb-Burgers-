import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.model.js'

const SECRET = process.env.JWT_SECRET || 'supersecret'
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'
const ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '10', 10)

export async function register(req, res) {
  try {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: 'username and password required' })

    const existing = await User.findOne({ username })
    if (existing) return res.status(400).json({ message: 'Username already exists' })

    const passwordHash = await bcrypt.hash(password, ROUNDS)
    const user = await User.create({ username, passwordHash })

    res.status(201).json({ id: user._id, username: user.username })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: 'username and password required' })

    const user = await User.findOne({ username })
    if (!user) return res.status(401).json({ message: 'Invalid username or password' })

    const ok = await user.validatePassword(password)
    if (!ok) return res.status(401).json({ message: 'Invalid username or password' })

    const payload = { id: user._id, username: user.username }
    const token = jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN })
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
