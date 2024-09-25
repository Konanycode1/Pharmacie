const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    
    try {
        let token = req.headers.authorization.split(" ")[1]
        let decodeToken = jwt.verify(token,"RANDOM_TOKEN_KEY")
        let userId = decodeToken.userId
        console.log(decodeToken)
        req.auth ={
            userId
        }
        console.log("ahhhhh")
        next() 
    } catch (error) {
        res.redirect('/page/login.html');
    }
}