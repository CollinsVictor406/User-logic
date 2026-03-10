require("dotenv").config()
const User = require("../model/usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "email already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        user = new User({ name, email, password: hashedPassword })
        const newUser = await user.save()

        // ✅ Same structure as login
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1day" })
        res.status(201).json({ token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        console.log(user);
        
        if (!user) {
            return res.status(400).json({ message: "invalid credentials" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "invalid credentials" })
        }

        // ✅ Same structure as register
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1day" })
        res.status(200).json({ token, message: "Login successful" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
