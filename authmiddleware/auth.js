// const jwt = require("jsonwebtoken");

// exports.auth = async (req, res, next) => {

//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   const token = authHeader.split(" ")[1];
//    console.log(token);
   
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded);
    
//     req.user = decoded;
//    next();
//   } catch (err) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// }
const jwt = require("jsonwebtoken")
exports.auth = async (req,res,next) =>{
    const authHeader = req.headers.authorization; 
  
  try {
      if(!authHeader) {
        return res.status(401).json({message:"No token, authorization denied"})
    }
    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(500).json({message:error.message})
  }

  }