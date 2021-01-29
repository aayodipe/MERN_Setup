import config from './../config/config.js';
import app from './express.js';
import mongoose from 'mongoose';
import express from 'express';
app.use(express.static('client')) // Server static files like images and css

//Database
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, 
        { useNewUrlParser: true, 
          useCreateIndex: true,         
          useUnifiedTopology: true })

mongoose.connection.on('error', ()=> {
    throw new Error(`Unable to connect to database ${mongoUri}`)})

//Server
app.listen(config.port, err => {
    if(err) console.log('Unable to connect to server')
    console.log('Server on port '+ config.port)
})