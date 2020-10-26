const express = require('express');
const router = express.Router();

router.get('/booInfo.ejs', (req, res) => {
    res.render('user/booInfo.ejs')
})

router.get('/messages.ejs', (req, res) => {
    res.render('user/messages.ejs')
})

smodule.exports = router;