import User from '../models/user.model'
import extend from 'lodash/extend';
import errorHandler from './../helpers/dbErrorHandler';
import path from 'path'



//List Users API
const listAll = async (req, res) => {
    try{
      let users = await User.find().select('name email updated created')
       res.status(200).json({users})
    }catch(err){
      return res.status(400).json({
        error: 'Error from server'
        
      })
    }

}
//Signed up API
const create = async (req, res) => {
  let user = new User(req.body)
  try {
         await user.save() ;
         return res.status(201).json({
           message: 'Successfully signed Up!'
         })
  }
  catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

//This function is trigger whenever user routes to the aip/users/:userid. This will only be trigger once even if the users visited the route multiple times.

// For this to work, the router.param() function needs to me called with the userid and this as a parameter i.e router.param(userid, getUserById)
const getUserById = async (req, res, next, id) => {
  try{
      let user = await User.findById(id);
      if(!user) 
      return res.status(400).json({
        error:'User not found'
      })
        req.profile = user;
      next()
    
  }
  catch(err){
      return res.status('400').json({
      error: "Could not retrieve user"
  })}
}

//Login User API
const read = (req, res) => {

   req.profile.hashed_password = undefined;//remove the hashed_passweord from the res send to client
   req.profile.salt = undefined;// remove the salt from the res sent to the client
   return res.json(req.profile)
}
//Update User API
const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body)// use lodash extend function to merge the update to the req.profile
    user.updated = Date.now();
    await user.save();
    user.hashed_passweord = undefined;
    user.salt = undefined;
    res.status(201).json(user)
  }
  catch(err){
    return res.status(400).json({
       error: errorHandler.getErrorMessage(err)
    })
  }

}
//Delete Use API
const remove = async (req, res) => {
   try {
     let user = req.profile;
    let deletedUser = await user.remove()
    deletedUser.hashed_passweord = undefined;
    deletedUser.salt = undefined;
    res.status(200).json(deletedUser)
   }
   catch(err){
     return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
   }
}

const home =  (req, res) => {
  try {
      res.sendFile(path.join(__dirname, '../client/home.html'))
  }
  catch(err){
    return res.status(400).json({
     error: errorHandler.getErrorMessage(err)
   })
  }
}
const about =  (req, res) => {
  try {
      res.sendFile(path.join(__dirname, '../client/about_us.html'))
  }
  catch(err){
    return res.status(400).send('No page found')
  }
}
const contact =  (req, res) => {
  try {
      res.sendFile(path.join(__dirname, '../client/contact.html'))
  }
  catch(err){
    return res.status(400).json({
     error: errorHandler.getErrorMessage(err)
   })
  }
}
const services =  (req, res) => {
  try {
      res.sendFile(path.join(__dirname, '../client/services.html'))
  }
  catch(err){
    return res.status(400).json({
     error: errorHandler.getErrorMessage(err)
   })
  }
}

export default { create, listAll, read, update, remove, getUserById, home,about, contact,services }