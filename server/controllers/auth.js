import bcrypt from "bcrypt" ;
import jwt from "jsonwebtoken";
import  User from "../models/User.js";

export const register = async(req,res) => {
    try{

        const{

            firstName,
            lastName,
            email,
            passWord,
            picturePath,
            friends,
            location,
            occupation

        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordhash = await bcrypt.hash(passWord,salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            passWord : passwordhash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile : Math.floor(Math.random()*10000),
            impressions : Math.floor(Math.random()*10000),
        });
        

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    }catch (err){
        res.status(500).json({error : err.message});
    }


}


