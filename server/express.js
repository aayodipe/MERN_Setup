import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compress from 'compression';
import helmet from 'helmet';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes'

const app = express();

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(compress())
app.use('/', userRoutes)
app.use('/', authRoutes)


//Error handling for jwt
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"error" : err.name + ": " + err.message})
    }else if (err) {
      res.status(400).json({"error" : err.name + ": " + err.message})
      console.log(err)
    }
  })



export default app

