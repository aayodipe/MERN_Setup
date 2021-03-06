import mongoose from 'mongoose';
import crypto from 'crypto';
const {Schema} = mongoose;

// name email password, create and updated
const UserSchema = new Schema({
firstname:{
    type: String,
    trim:true,
    require: 'Name is Required'
},
lastname:{
    type: String,
    trim:true,
    require: 'Name is Required'
},
email: {
    type:String,
    trim:true,
    unique:'Email already exits',
    required:'Email is required',
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
},
hashed_password:{
  type: String,
  required: "Password is require"
},
salt: String,
updated:Date, 
created : {
    type:Date,
    default: Date.now
}
})

//Hash Password
UserSchema
.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})
//Password Validation
UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

//Authenticate users
UserSchema.methods = {
    authenticate: function(plainText) {
      return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
      if (!password) return ''
      try {
        return crypto
          .createHmac('sha1', this.salt)
          .update(password)
          .digest('hex')
      } catch (err) {
        return ''
      }
    },
    makeSalt: function() {
      return Math.round((new Date().valueOf() * Math.random())) + ''
    }
  }


export default mongoose.model('User', UserSchema)