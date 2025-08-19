import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

import menuRoutes from './routes/menu.routes.js'
import authRoutes from './routes/auth.route.js'
import cartRoutes from './routes/cart.route.js'


dotenv.config()
const app = express()

// DB connect
mongoose.connect(process.env.DB_URI)
mongoose.connection.on('connected', () => {
  console.log('connected to mongoDB')
})
mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err?.message || err)
})

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/auth', authRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/cart', cartRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`)
})
