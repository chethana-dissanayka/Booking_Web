import User from "../models/User.js";

// we created users in register so we didnt want it here

//update a User details
export const updateUser =async(req, res, next)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(updatedUser)
        
    } catch (err) {
        next(err)
    }
}

// delete a User
export const deleteUser =async(req, res, next)=>{
    try {
        await User.findByIdAndDelete(
            req.params.id,
        )
        res.status(200).json("User has been deleted")
        
    } catch (err) {
        next(err)
    }
}

//get a User
export const getUser =async(req, res, next)=>{
    try {
        const user = await User.findById(
            req.params.id,
          
        )
        res.status(200).json(user)
        
    } catch (err) {
        next(err)
    }
}

//get all Users
export const getUsers =async(req, res, next)=>{
    try {
        const users = await User.find();
        res.status(200).json(users)
        
    } catch (err) {
        next(err)
    }
}