require("dotenv").config()
const User = require("../model/usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.registerUser = async (req,res) => {
    const { name,email,password } = req.body;
    try {
        let user = await User.findOne({ email })
        if(user){
         return res.status(400).json({message:"email already exist"})
        }
       const hashedPassword = await bcrypt.hash(password,12)
       console.log(hashedPassword);
       
      user = new User({ name,email,password:hashedPassword })

       const newUser =  await user.save()
       const paload = { user:{ _id:newUser._id } }
       const token = jwt.sign(paload,process.env.JWT_SECRET,{expiresIn:"1day"})
       res.status(201).json({token})
    } catch (error) {
        res.status(500).json({message:error})
    }
}

exports.login = async (req,res)  => {
    const { email,password } = req.body
    try {
        const user = await User.findOne({email})
        if(!email){
            return res.status(400).json({message:"invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"invalid credentials"})
        }           
        const payload = {user:{ _id:user._id } }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1day"})
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}