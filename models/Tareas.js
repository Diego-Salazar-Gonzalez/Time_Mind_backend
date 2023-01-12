import mongoose from "mongoose";

const tareasSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    tiempo:{
        type: Number,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

const Tareas = mongoose.model('tareas',tareasSchema)

export default Tareas