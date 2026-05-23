import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../../Models/Admin.js";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Email not found" });
    }

    // 2. check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // 3. generate token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. send token
    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};