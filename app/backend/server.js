const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('express');
const path = require('path');
const userRoute = require('./routes/userRoute.js');
const errorHandler = require('./middlewares/errorMiddleware.js');
const cookieParser = require('cookie-parser')

const app = express();

const PORT = process.env.PORT || 8080;

//MIDDLEWARES

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

// ROUTES MIDDLEWARE 

app.use('/api/users', userRoute)

//ERROR MIDDLEWARE

app.use(errorHandler) 

//CONEXIONES

mongoose.connect(process.env.MONGO_URI)
    .then(console.log('mongoose conectado'))
    .catch((err) => console.log(err))

const server = app.listen(PORT, ()=> console.log(`server listening on port: ${PORT}`));

server.on('error', err => console.log(err))