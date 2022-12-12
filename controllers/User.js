const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = {
    
    async create(req, res){

        const {email, password} = req.body;
        const msg = await this.validaCadastro(email, password)
        if(msg){
            res.status(400).json({msg: msg})
        }else{
        const user = new User({email: `${email}`, password: `${password}`, token:` `, isAdmin: false})
        user.save().then(() =>{
           return res.status(201).json({msg: 'Usuário Cadastrado!'})
        })}

      
    },
    async createAdmin(req, res){

        const {email, password} = req.body;
        const msg = await this.validaCadastro(email, password)
        if(msg){
           return res.status(400).json({msg: msg})
        }else{
        const user = new User({email: `${email}`, password: `${password}`, token:` `, isAdmin: true})
        user.save().then(() =>{
            return res.status(201).json({msg: 'Administrador Cadastrado!'})
        })}
    },

    async login(req, res){

        const {email, password} = req.body;
        const queryRes = await User.findOne({ email: `${email}` });
        if(!queryRes){
            return res.status(400).json({msg: "Usuário não existe!"});
        }if (password != queryRes.password) {
            return res.status(400).json({msg: "Senha Incorreta!"});
        } else {
            try{
                  this.generateToken(queryRes).then(token => {
                    User.updateOne({_id: queryRes._id}, {$set:{token: token}})
                    return res.status(200).json({ msg: "Usuário Autenticado", token: token})
                })
            }catch(error){
                return res.status(400).json({msg: error})
            }
        }
    },

     async validaCadastro(email, password){

        if(!email){
            return 'O email é obrigatório'
        }
    
        if(!password){
            return 'A senha é obrigatória'
        }

        const emailExistente = await User.findOne({ email: email })

        if(emailExistente){
            return   'E-mail já cadastrado!'
        }
        return false
    },

    async generateToken(queryRes){

        const secret = process.env.JWT_SECRET

        const token = jwt.sign({
            id: queryRes._id,
        },
        secret,
        )
        const filter = {_id: queryRes._id}
        const update = {token: token}
        await User.updateOne(filter, update)

        return token;
    }

    
};