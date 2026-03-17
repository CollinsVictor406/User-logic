require("dotenv").config()
const User = require("../model/usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.registerUser = async (req,res) =>{
    const { name,email,password} = req.body
    try{
        const user = await User.findOne({email})
        console.log(user);
        
        if(user) {
            return res.status(409).json({message:"User already in use"})
        }
        if(!name || !email || !password) {
            return res.status(400).json({message:"All fields must be filled"})
        }
        const hash = await bcrypt.hash(password,12)
        const newUser = new User({ name,email,password:hash})
        
        const savedUser = await newUser.save()
        
        const token = await jwt.sign({id:savedUser._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        return res.status(201).json({token})
    }
    catch(error){
        return res.status(500).json({messsage:error.message})
    }
}

exports.login = async (req,res) =>{
    const { email,password} = req.body
    try{
        const user = await User.findOne({email})
        console.log(user);
        
        if(!user) {
            return res.status(404).json({message:"Invalid credentials"})
        }
        const checkPassword = bcrypt.compare(password,user.password)
        if(!checkPassword){
            return res.status(401).json({message:"Invalid credentials"})
        }
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        return res.status(200).json({token,message:"Login successful"})
    }
    catch (error){
        return res.status(500).json({message:error.message})
    }
}

exports.getAllUsers = async (req,res) =>{
  try {
      const users = await User.find()
    if(users.length === 0){
        return res.status(404).json({message:"No user in the database"})
    }   
    res.status(200).json({users,message:"All users in the database",count:users.length})
  }
    catch (error) {
        return res.status(500).json({message:error.message})
     }
}