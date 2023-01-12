import Tareas from "../models/Tareas.js"
const registrarTarea = async (req,res) =>{
   
   const tarea = new Tareas(req.body)
   
   tarea.usuario = req.usuario._id
  

   try {
    const tareaSave = await tarea.save()

    return res.json(tareaSave)
   } catch (error) {
    
   }
   
}

const obtenerTareas = async (req,res) =>{
    const listaTareas = await Tareas.find().where('usuario').equals(req.usuario)
   
    return res.json(listaTareas)
}

const eliminarTarea = async (req,res) =>{
    const {id} = req.params
    const tarea = await Tareas.findById(id)
    if(!tarea){
        return res.status(400).json({msg: 'No encontrado'})
    }
   
    //verifico que el usuario sea dueño de la tarea
    if(tarea.usuario._id.toString() !== req.usuario._id.toString()){
        return res.json({msg: 'No valido'})
    }

    try {
        await tarea.deleteOne()
        res.json({msg: 'Tarea Eliminada'})
    } catch (error) {
        console.log(error)
        
    }

}

const editarTarea = async (req,res) =>{
    const {id} = req.params
    const tarea = await Tareas.findById(id)

    if(!tarea){
        return res.status(404).json({msg:'Tarea No encontrada'})
    }

    if(tarea.usuario._id.toString() !== req.usuario._id.toString()){
        return res.json({msg: 'Movimiento Invalido'})
    }

    tarea.nombre = req.body.nombre || tarea.nombre
    tarea.tiempo = req.body.tiempo || req.body.tiempo
    tarea.descripcion = req.body.descripcion || tarea.descripcion

    try {
        const tareasActualizadas = await tarea.save()
        return res.json(tareasActualizadas)
    } catch (error) {
        console.log(error)
    }

}

export{
    registrarTarea,
    obtenerTareas,
    eliminarTarea,
    editarTarea
}