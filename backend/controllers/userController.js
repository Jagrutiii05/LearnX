import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

// Register
export const register = async (req, res) => {
    try {
        const {Name, Email, Password, role} = req.body;
        // console.log(Name, Email, Password, role);
        if(!Name || !Email || !Password || !role){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        const user = await User.findOne({Email});
        if(user){
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false
            })
        }
        const hashpassword = await bcrypt.hash(Password, 10);

        await User.create({
            Name,
            Email,
            Password: hashpassword,
            role
        })

        return res.status(201).json({
            message: "User registered successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Login
export const login = async (req, res) => {
    try {
        const {Email, Password, role} = req.body;
        console.log(req.body);
        if(!Email || !Password || !role){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        // Check if user exists in the database
        let user = await User.findOne({Email});
        if(!user){
            return res.status(400).json({
                message: "User does not exist with this email.",
                success: false
            })
        }

        // Check for correct password
        const isPasswordCorrect = await bcrypt.compare(Password, user.Password)
        if(!isPasswordCorrect){
            return res.status(400).json({
                message: "Invalid password",
                success: false
            })
        }

        // Check if correct role is selected
        if(role !== user.role){
            return res.status(400).json({
                message: "Account doesn't exist with current role",
                success: false
            })
        }

        // Create token
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'});

        user = {
            _id: user._id,
            Name: user.Name,
            Email: user.Email,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly: true, sameSite: 'strict'}).json({
            message: `Welcome back ${user.Name}`,
            user,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

// Logout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Update profile
export const updateProfile = async (req, res) => {
    try {
        const {Name, bio, skills} = req.body;
        const file = req.file;

        let skills_array;
        if(skills){
            skills_array = skills.split(", ");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        // update details
        if(Name) user.Name = Name;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skills_array;

        // update profile picture
        // if(file){
        //     const profile = file.path;
        //     user.profile.profile = profile;
        // }

        await user.save();

        user = {
            _id: user._id,
            Name: user.Name,
            Email: user.Email,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

// Get profile
export const getProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        user = {
            _id: user._id,
            Name: user.Name,
            Email: user.Email,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}