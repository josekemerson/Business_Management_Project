const jwt = require('jsonwebtoken')

const authenticate = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.SECRET_CODE)
        req.auth = decode
        next()
    }
    catch(error){
        return res.status(500).send({
            
            message:'Authentication Failed!'
        }
        )
    }
}

module.exports = authenticate