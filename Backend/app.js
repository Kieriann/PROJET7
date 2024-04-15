const express = require ('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');


const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

app.use(express.json());

mongoose.connect('mongodb+srv://CELINE:mdpdeceline@projet7.4ynkktp.mongodb.net/')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !', err.message));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app;
