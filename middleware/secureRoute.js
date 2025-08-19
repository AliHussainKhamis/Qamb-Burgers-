import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'supersecret'

export function secureRoute(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) return res.status(401).json({ message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(403).json({ message: 'Invalid token' })
  }
}
