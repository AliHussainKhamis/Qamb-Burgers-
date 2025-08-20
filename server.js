
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import multer from "multer"

import menuRoutes from "./routes/menu.routes.js"
import authRoutes from "./routes/auth.route.js"
import cartRoutes from "./routes/cart.route.js"
import orderRoutes from "./routes/order.route.js"

dotenv.config()

const app = express()

// connect to MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.log("MongoDB error:", error))

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))


app.use("/uploads", express.static("uploads"))


const upload = multer({ dest: "uploads/" })

// upload route
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" })
  }
  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
  res.json({ url })
})

// routes
app.use("/api/auth", authRoutes)
app.use("/api/menu", menuRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
