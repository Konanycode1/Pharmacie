const User = require('../model/user')
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');

class UserController {
    static async create(req,res){
        try {
            const {numero, password, ...rest} = req.body;;
            User.findOne({numero})
            .then((data)=>{
                
                if(data){                                                                                                                            
                    res.status(200).json({msg: "La compagnie existe déjà"})
                    
                    return
                }
                else{
                    
                    if(req.body.numero.length != 10){
                        res.status(200).json({msg: "Ceci n'est pas un numéro de la CI !!"})
                        return
                    }
                    else if( req.body.password.length < 4){
                        res.status(200).json({msg: "Mot de passe trop court !!"})
                        return
                    }
                    else{
                        
                        bcrypt.hash(password,10)
                        .then((hash)=> {
                            if(!hash){
                                return
                            }
                            let user = new User({
                                numero: req.body.numero,
                                password: hash,
                                ...rest
                            })
                            user.save()
                            .then((comp)=> {
                                if(comp){
                                    res.status(200).json({msg: "Vous etes enregistré sur E-Phar", success:true})
                                }
                                else{
                                    res.status(400).json({msg: "Inscription échouée😡😡"})
                                }
                            })
                            .catch((error)=>{res.status(400).json({error: error.message})})  
                        })
                        .catch((error)=>{res.status(400).json({error:error.message})})
                    }
                }
            })
            .catch((error)=> res.status(400).json({error: error.message}))
            
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async login(req,res){    
        try {
            
            const {numero, password} = req.body
            User.findOne({numero})
            .then((data)=>{
                if(!data){
                    res.status(400).json({msg:"Email introuvable"})
                    return
                }
                bcrypt.compare(password, data.password)
                .then((com)=>{
                    if(!com){
                        res.status(400).json({msg: "Mot de passe incorrect"})
                        return
                    }
                    else{
                        res.status(201).json({
                            userId:data._id,
                            status: "User",
                            token: jwt.sign({userId: data._id}, "RANDOM_TOKEN_KEY",{
                                expiresIn: 24*3600
                            })
                        })
                    }

                })
                .catch((error)=> error.message)
            })
            .catch((error)=> res.status(400).json({error: error.message}))
        } catch (error) {
            res.status(500).json({error: error.message})
        }
        
    }
    static async update(req,res){
 
        try {
            const {id} = req.params
            console.log(id)
            User.findById(id)
            .then((data)=>{
                if(!data){
                    res.status(404).json({msg: "Compte introuvable"})
                    return
                }
                if(req.body.password){
                    bcrypt.hash(req.body.password,10)
                    .then((hash)=>{
                        let wassaObjet = {password: hash,...req.body};
                        User.updateOne({_id: req.params.id}, {...wassaObjet, _id: req.params.id})
                        .then((valid)=>{
                            if(!valid){
                                res.status(400).json({msg: "Compte non modifié"})
                                return
                            }
                            res.status(201).json({msg: "Compte modifié avec succès"})
                        })
                        .catch((error)=> res.status(400).json({error: error.message}))

                    })
                    .catch((error)=> res.status(400).json({error: error.message}))  
                }
                else{
                    let wassaObjet = {...req.body}
                        User.updateOne({_id: req.params.id}, {...wassaObjet, _id: req.params.id})
                        .then((valid)=>{
                            if(!valid){
                                res.status(400).json({msg: "Compte non modifié"})
                                return
                            }
                            res.status(201).json({msg: "Compte modifié avec succès"})
                        })
                        .catch((error)=> res.status(400).json({error: error.message}))
                }
            })
            .catch((error)=> res.status(400).json({error: error.message}))
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async verifByEmail(req,res){
        compagnie.findOne({email: req.body.email})
        .then((data)=>{
            if(!data){
                res.status(400).json({msg: "Email incorrect !!"})
                return
            }
            else return res.status(201).json({data})
            
        })
        .catch((error)=> res.status(400).json({error: error.message}))
    }
    static async delete(req,res){
        User.findById(req.params.id)
        .then((data)=>{
            if(!data){
                res.status(400).json({msg: "Compte introuvable"})
                return
            }
            User.deleteOne({_id: data._id})
            .then((dele)=> {
                if(dele){
                    res.status(201).json({msg: "Compte supprimés"})
                    return
                }
                else{
                    res.status(201).json({msg: "Compte Non  supprimés"})
                }
            } )
            .catch((error)=> res.status(400).json({error:error.message}))
        })
        .catch((error)=> res.status(400).json({error: error.message}))
    }
    static async readAll(req,res){
        User.find()
        .then((data)=> res.status(200).json({data}))
        .catch((error)=> res.status(400).json({error:error.message}))
    }
    static async readId(req,res){
        console.log(req.params.id)
        User.findById(req.params.id)
        .then((data)=> res.status(200).json({data}))
        .catch((error)=> res.status(400).json({error:error.message}))
    }
    static async authController(req,res){
        console.log("ghjklmkjhgfghjklm")
       try {

        const user = req.auth;
        // Cherche l'utilisateur dans la base de données
        const foundUser = await User.findOne({ _id: user.userId });
        
        if (foundUser) {
            res.status(200).json({ data: foundUser });
        } else {
            res.status(404).json({ message: "User not found" });
        }
        } catch (error) {
                console.log(error)
        }
    }
}

module.exports = UserController;