const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('home')
})

router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/signup', (req, res) => {
    res.render('signUp')
})
router.get('/recipe', (req, res) => {
    res.render('recipe')
})
router.get('/feature', (req, res) => {
    res.render("feature")
})
router.get('/vege', (req, res) => {
    res.render('vege')
})
router.get('/shop', (req, res) => {
    res.render('shop')
})

module.exports = router