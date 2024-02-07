const userSchema = require("../models/userModel");
const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken")

const registerUser= asyncHandler(async(req,res)=>{
    const {username, email, password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("details required!")
    }
    const userAvailable= await userSchema.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("user already registered!")
    }
    const hashPassword= await bcrypt.hash(password, 10);
    console.log("hash password:", hashPassword)
    const user= await userSchema.create({
        username,
        email,
        password: hashPassword,
    })

    console.log(`user created ${user}`)
    if(user){
        res.status(201).json({id:user.id, email:user.email})
    }
    else{
        res.status(404);
        throw new Error("data not valid");
    }

    res.json({
        message:"register the user"
    })
});

const loginUser= asyncHandler(async(req,res)=>{
    const{email, password}=req.body;
    if(!email|| !password){
        res.status(400);
        throw new Error("all fields mandatory");
    }
    const user= await userSchema.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
      const accessToken= jwt.sign({
        user:{
            username: user.username,
            email: user.email,
            id: user.id,
        }
      },
      process.env.ACCESS_TOKEN,{expiresIn: "1m"})
    }
    else{
        throw new Error("email and password invalid");
    }
    res.json(accessToken);
});
const CurrentUser= asyncHandler(async(req,res)=>{
    res.json({
        messgae:"current user"
    })
});

module.exports={
    registerUser,
    loginUser,
    CurrentUser
}