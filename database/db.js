import mongoose from 'mongoose';
import sconfig from 'config'
const dbURL = sconfig.get('Mongo_URL')
// Content to Database
const connectDB = async () => {
    try {
        const MongoDB_URL = process.env.MONGODB_URI || dbURL
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