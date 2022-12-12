const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://andreiono:2547@cluster0.dzy4z7q.mongodb.net/?retryWrites=true&w=majority`);

const User = mongoose.model('Users', {

    email: String,
    password: String,
    token: String,
    isAdmin: Boolean,

})

module.exports = User