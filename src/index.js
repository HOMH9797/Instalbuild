const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app= express();

const {mongoose} = require('./database');

//Setting
app.set('port', process.env.PORT || 3300);

//Middleware
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/construccion',require('./routes/construccion.routes'));

//static files
app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'), ()=>{
    console.log(`server on port ${app.get('port')}`);
})