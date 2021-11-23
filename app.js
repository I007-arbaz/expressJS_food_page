require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const router = require('./router')
require('./connection/connection')
const studentData = require('./schema/schema')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




let publicPath = path.join(__filename, '../public')
app.use('/css',express.static( __dirname + '/templates/views/css'))
app.use('/style', express.static(__dirname+ '/templates/partials' ))
app.use('/', router)
app.use('/img', express.static(__dirname + '/templates/views/img'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json())
let partials = path.join(__filename, '../templates/partials')
let views = path.join(__filename, '../templates/views')
app.set('view engine', 'hbs')
app.set('views' , views)
hbs.registerPartials(partials)

router.get('/', (req, res) => {
    res.render('home', {
        content: 'this is content',
        date: new Date().getHours()
    })
})

app.post('/signup', (req, res) => {
    let {username, password, confirmPassword, email} = req.body
    if(!username || !password || !confirmPassword || !email) {
        res.render('signUp', {
            instruction: 'fill the field'
        })
    }

    else if(password == confirmPassword) {
            let student = new studentData({
            name: username,
            password,
            confirmPassword,
            email
        })

        let token = jwt.sign({_id: student._id}, process.env.PRIVATE_KEY)
        student.token = token

        student.save().then(() => {
            console.log('data saved');
        }).catch((err) => {
            console.log(err);
        })
        res.send('data saved')
    }else {
        res.send('invalid password')
    }
    
})
let loginUserName 
app.post('/login',async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let dataIndb = await studentData.findOne({name: username})
    try {
        let passCompare = await bcrypt.compare(password, dataIndb.password)
        if(passCompare) {
            /* res.render('homeWithLogged', {
                user: dataIndb.name
            }) */
            loginUserName = dataIndb.name;
            res.redirect('/home')
            console.log('successfull')
        }else {
            res.render('login', {
                failedPassword: 'password is wrong'
            })
        }
    }catch {
        res.send('invalid data')
    }
    console.log('username' + username, 'password' + password);
})

app.get('/home', (req, res) => {
    res.render('homeWithLogged', {
        user: `welcome ${loginUserName}`
    })
})

app.get('*', (req, res) => {
    res.render('errorPage')
})

/* let createToken = async () => {
        let newToken = await jwt.sign({_id: '616ff5f20773b6db508ecc6f'}, 'thisisjasonwebtokencode')
        let userVer = await jwt.verify(newToken, 'thisisjasonwebtokencode')
        console.log('user verification via jwt = ' + userVer);
    }
 */
//createToken()


app.listen(8000, () => {
    console.log('listening at 8000 port')
})