const express = require('express');
const Router = express.Router();

Router.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

module.exports = Router