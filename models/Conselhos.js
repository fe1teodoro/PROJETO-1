const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://andreiono:2547@cluster0.dzy4z7q.mongodb.net/?retryWrites=true&w=majority`);

const Conselho = mongoose.model('Conselhos', {

   conselho: String

})

module.exports = Conselho