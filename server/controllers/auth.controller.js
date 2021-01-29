import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from './../../config/config.js';


//Sign In API
const signin = async (req, res)=> {
  try {

    let user = await User.findOne({"email" : req.body.email})

    //If user not found
    if(!user){
      return res.status('401').json({error: 'User not found'})
    } 
    //If no password || password do not match
    if(!user.authenticate(req.body.password)){
      return res.status('401').json({error:'Email and password do no match'})
    }
    //if successful authenticated => generate token and send  with cookier back to client
    const token = jwt.sign({'userid': user._id}, config.jwtSecret)
    res.cookie('t', token, {expire: new Date() + 9999})
    return res.json({
      token, 
      user:{
      _id: user._id,
      name: user.name,
      email: user.email
    }})
  }
  catch(err){
    return res.status('401').json({ error: "Could not sign in" })
  }
}

// Sign Out API
const signout =  (req, res)=> {
  res.clearCookie('t')
  return res.status('200').json({
    message:'Signed out successful'
  })
}
//To sign in for protected Route
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ["HS256"]
})
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth 
        && req.profile._id ==  req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {signin, signout, requireSignin, hasAuthorization }