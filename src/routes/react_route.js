const express = require('express');
const Router = express.Router();

Router.get('/register', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

module.exports = Router