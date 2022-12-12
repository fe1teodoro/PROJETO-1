const express = require('express')
const app  = express()
const path = require('path')
const mongoose = require('mongoose')
const User = require('./controllers/User')
const jwt = require('jsonwebtoken')
const Conselhos = require('./controllers/Conselhos')

app.use(express.json())

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use("/public",express.static(__dirname + "/public"));


app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=> {
    res.render('index', {title: 'aseasda'})
})

app.get('/cadastro', (req, res)=> {
    res.render('cadastro', {title: 'acadastro'})
})

app.get('/cadastro/admin', (req, res)=> {
    res.render('cadastroAdmin', {title: 'acadastroadm'})
})

app.post('/login', async(req, res) => {
    
    await User.login(req, res)

})

app.post('/cadastrar', async(req, res) => {


    await User.create(req, res)

})

app.post('/cadastrar/admin', async(req, res) => {

    await User.createAdmin(req, res)

})


app.post('/conselhos', async(req, res) => {

    await Conselhos.create(req, res)

})

app.get('/conselhos', async(req, res) => {
    await Conselhos.find(req, res)
})





// const andrei = new User({email: 'andreiono@hotmail.com', password: '2547'})
// andrei.save().then( () => {
//     console.log('salvou')
// })


























app.listen(3000, () => {
    console.log('Ouvindo na porta 3000')
})

