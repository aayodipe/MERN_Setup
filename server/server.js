import express from 'express';
import devBundle from './devBundles';
import path from 'path';
import template from './../template'
import config from '../webpack.config.client';
import connectDB from '../database/db'
const app = express()
devBundle.compile(app)
const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.get('/', (req, res) => {
   res.status(200).send(template())
})
//Connect to Database
connectDB()

let port = process.env.PORT || 3000
app.listen(port, function onStart(err) {
 if (err) {
  console.log(err) 
 }
 console.info('Server started on port %s.', port)
})