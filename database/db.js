import config from '../config/config.js';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise
const MongoDB_URL = config.mongoUri
// Content to Database
const connectDB = async () => {
    try {
     
        //connect to mongoose
        await mongoose.connect(MongoDB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
          });
          console.log(`Database Connected`)
    }
    catch(err){
        console.error(err)
        process.exit(1)
    }
    
   
}

export default connectDB