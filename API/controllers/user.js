import { User } from "../Models/Users.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const register =async(req,res)=>{
    const {name,gmail,password}=req.body
    try {
        let user=await User.findOne({gmail})
        if(user) return res.json({message:"User already exist"});
        const hashpass=await bcrypt.hash(password,10)
        user= await User.create({name,gmail,password:hashpass})
        res.json({message:"user registered",user})
    }
    catch(error){
        res.json({message:error})
    }
}

export const login= async(req,res)=>{
    const {gmail,password}=req.body
    try {
        let user=await User.findOne({gmail});
        if(!user)return res.json({message:"User not exist"})
        const validpass=await bcrypt.compare(password,user.password);
        if(!validpass)return res.json({message:"Invalid credentials"});
        const token = jwt.sign({userId:user._id},"!@#$%^&*()",{
            expiresIn:'1d'
        })
        res.json({message:`Welcome ${user.name}`,token})
    } catch (error) {
        res.json({message:error.message})
    }
}

export const profile = async (req,res) =>{
    res.json({user : req.user})
}