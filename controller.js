const users = []

exports.createUser = (req,res) =>{
    const { name, password } = req.body
    if(!name || !password){
        return res.status(400).json({message:"put in your credentials"})
    }
    users.push({name,password})
    res.status(201).json({message:users})
}

exports.getAllUsers = (req,res) =>{
  const user = users
  res.status(200).json({user})
}