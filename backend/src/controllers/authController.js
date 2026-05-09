import bcrypt from "bcrypt";
import { UserModel } from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";

export const signup = async (req, res) => {
  try {
    const { email, password, full_name, gender, mobile_no } = req.body;

    const exists = await UserModel.findByEmail(email);
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await UserModel.createUser({
      email,
      password: hashed,
      full_name,
      gender,
      mobile_no
    });

    const { password: _, ...safeUser } = newUser;
const token = generateToken(safeUser);

res.status(201).json({
  message: "Signup successful",
  user: safeUser
});

  } catch (error) {
    console.log("🔥 SIGNUP ERROR:", error); // FULL ERROR LOG

    return res.status(500).json({
        message: "Signup failed",
        error: error.message || error
    });
}
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Incorrect password" });

    const token = generateToken(user);

    res.json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};