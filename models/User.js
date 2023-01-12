import mongoose from "mongoose";
import generarToken from "../helpers/generarToken.js";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    token_TimeMind:{
        type: String,
        default: generarToken
    },
    confirmado:{
        type: Boolean,
        default: false
    },
    imagen:{
        type: String,
        required:false
    }
    
})

userSchema.pre("save", async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(5)
    this.password = await bcrypt.hash(this.password, salt)
})


userSchema.methods.comparePass = async function(passUser){
    
    return await bcrypt.compare(passUser,this.password)
}



const users = mongoose.model('users',userSchema)

export default users
