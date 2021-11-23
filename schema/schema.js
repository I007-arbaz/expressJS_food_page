const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({
    name: String,
    password: String,
    confirmPassword: String,
    token: String,
    email: String

}) 

/* studentSchema.methods.generateAuthToken = async function() {
    try {
        console.log(this._id)
        let token = await jwt.sign({_id: this._id}, 'thisisjasonwebtokencode')
        this.token = token
        console.log(token);

    } catch(err) {
        console.log(err);
   }
}
 */
studentSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10)
    this.confirmPassword = 1000
    console.log(`password is ${this.password} and encrypted password is ${this.confirmPassword}`);
    next()
})

const studentData = new mongoose.model('studentData', studentSchema)

module.exports = studentData;