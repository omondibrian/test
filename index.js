/**
 * @fileOverview this is the main file and serves as the root entry point of the application
 * @author Eucossa
 * @version 0.0.1
 */

const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

//import custom routes
const AuthRoutes = require('./src/routes/auth');
const PostRoutes = require('./src/routes/post_routes');
const ModuleRoutes = require('./src/routes/modules_routes');
const eventsRoutes = require('./src/routes/events_routes');
const moduleRegistrationRoutes = require('./src/routes/moduleRegistrationRoute');
const ReactRoutes = require('./src/routes/react_route')
dotenv.config();

//conect mongoDb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONNECTION_STRING2, { useNewUrlParser: true });

mongoose.connection.once('open', function () {
    console.log('connection made sucessfull');
   
}).on('error', function (error) {
    console.log('connection error:', error)
})
//middlewares
// Serve static files from the React app
if(process.env.NODE_ENV==='production'){
    app.use('/public', express.static(path.join(__dirname, 'client/build')));
   app.use('/eucossa',ReactRoutes)
}
app.use(express.static(path.join(__dirname, 'static')));

app.use('/uploads', express.static('uploads'))
app.use(express.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-origin',"*" );
    res.header('Access-Control-Allow-Headers',"Origin,X-Requested-With,Content-Type,Accept,Authorization,AUTH_TOKEN" );
    if (req.method === 'OPTIONS') {
        req.header('Access-Allow-Methods','PUT,POST,PATCH,GET,DELETE');
        return res.status(200).json({});
    }
        next()
})
app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'static','index.html'))
})
app.get('/blog',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'static','blog.html'))
})
app.get('/executive',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'static','executive.html'))
})
app.get('/about',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'static','about.html'))
})
app.get('/events',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'static','about.html'))
})


//route middleware
app.use('/api/user',AuthRoutes);
app.use('/api/posts',PostRoutes);
app.use('/api/modules', ModuleRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/moduleRegistration', moduleRegistrationRoutes);
app.use('/eucossa', ReactRoutes)



const PORT = process.env.PORT || 3700
app.listen(PORT,()=>{
    console.log('server up and running')
});