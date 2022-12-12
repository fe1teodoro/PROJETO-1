const Advice = require('../models/Conselhos')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config();

module.exports = {
    
    async create(req, res){

        const {conselho, token} = req.body;
        const queryRes = await User.findOne({ token: token });
        console.log(queryRes)
        if(!queryRes.isAdmin){
            return res.status(400).json({msg: "Apenas o administrador pode publicar"});
        }else{
            try{
                const conselhos = new Advice({conselho: conselho})
                conselhos.save().then(() =>{
                    res.status(201).json({msg: 'Conselho adicionado com sucesso'})
                })
            }catch(error){
                return res.status(400).json({msg: error})
            }
        }
    },

    async find(req, res){

        const keyWord = req.query.keyWord;
        await Advice.find({conselho: {$regex: keyWord}}).then( advices =>{
            return res.status(200).json({conselho: advices})
        }).catch(error => {
            return res.status(400).json({error})
        })
    }


}

