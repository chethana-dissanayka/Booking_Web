import createError from 'http-errors';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

// Register function
export const register = async (req, res, next) => {
    try {
        // Encrypt password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        await newUser.save();
        res.status(200).send("User has been created");
    } catch (err) {
        next(err);
    }
};

// Login function
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found."));

        // Compare given password and hashed password
        const isPasswordCorrect = await bcrypt.compare
        (req.body.password, user.password
        );
        if (!isPasswordCorrect)
             return next(createError(400, "Invalid username or password"));


        //add jwt tokens to verify identity of users
        const token  = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin },
             process.env.JWT);

// get details of relavent  users to login
        const {password, isAdmin, ...otherDetails}= user._doc;

        res
        .cookie("access_token", token, {
            httpOnly:true,
        })
        .status(200)
        .json({...otherDetails});
    } catch (err) {
        next(err);
    }
};
