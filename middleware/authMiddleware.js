import jwt from 'jsonwebtoken'
import users from '../models/User.js';
const checkAuth = async (req,res,next) =>{
    let key
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         
        try {
            //quitando el "bearer de la key"
             key = req.headers.authorization.split(' ')[1];

            //verificiando el token_TimeMind con la firma
            const decode = jwt.verify(key,process.env.JWT_SECRET)
            req.usuario = await users.findById(decode.id).select("-password -confirmado -token_TimeMind")


           
            return next()
        } catch (error) {
            const errores = new Error("token_TimeMind no valido");
            res.status(403).json({msg: errores.message});
        }
       
        if(!key){
            const error = new Error ('token_TimeMind invalido')
            return  res.status(403).json({msg: error.message})
            
        }

        

        


        next()
       
    }

    next()
   
    
   
    
    
}

export default checkAuth