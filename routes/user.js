const express = require('express');
const router = express.Router();

router.get('/booInfo.ejs', (req, res) => {
    res.render('auth/booInfo.ejs')
})

router.get('/messages.ejs', (req, res) => {
    res.render('auth/messages.ejs')
})

module.exports = router;