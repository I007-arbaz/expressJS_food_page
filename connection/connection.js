const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/studentRegistration', {
    useNewUrlParser: true
}).then(() => {
    console.log('connection success')
}).catch(err => console.log(err))