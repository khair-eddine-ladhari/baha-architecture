import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Admin from './Models/Admin.js'

dotenv.config()
await mongoose.connect(process.env.MONGO_URI)

await Admin.deleteMany({})

await Admin.create({
  email: "admin@baha.com",
  password: "admin123",  // plain text - model will hash it
  role: "admin"
})

console.log("✅ Admin created! Login with admin123")
process.exit()