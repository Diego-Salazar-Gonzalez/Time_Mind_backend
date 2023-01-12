import users from "../models/User.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  const { email } = req.body;

  const existEmail = await users.findOne({ email });
  if (existEmail) {
    const error = new Error("Usuario Ya Registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = users(req.body);
    const userSave = await user.save();
    res.json(userSave);
  } catch (error) {
    console.log(error);
  }
};
const perfil = (req, res) => {
  const { usuario } = req;

  return res.json(usuario);
};

const confirmar = async (req, res) => {
  const { token_TimeMind } = req.params;

  const userConfirm = await users.findOne({ token_TimeMind });

  if (!userConfirm) {
    const error = new Error("token_TimeMind no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  try {
    userConfirm.token_TimeMind = null;
    userConfirm.confirmado = true;
    await userConfirm.save();

    res.json({ msg: "usuario confirmado exitosamente" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  const Usuario = await users.findOne({ email });
  if (!Usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (await Usuario.comparePass(password)) {
    console.log(Usuario);
    return res.json({
      _id: Usuario._id,
      nombre: Usuario.nombre,
      email: Usuario.email,
      token_TimeMind: generarJWT(Usuario.id),
      imagen: Usuario.imagen || ''
    });
  } else {
    const error = new Error("La contraseña es incorrecta");
    return res.status(403).json({ msg: error.message });
  }
};

const subirImagen = async (req, res) => {
  const usuario = req.usuario;
 
  usuario.imagen = req.file.filename;
  await usuario.save();
  return res.status(200).json(usuario);
};

const enviarImagen = async (req,res,next) =>{
  //  console.log('en enviar')
    
  //   const imagen = req.usuario.imagen
  
  //   if(imagen){
  //       req.url = `/${imagen}`
  //       next()
  //       return

  //   }
  //   res.json({})
   next()
}

const actualizarPerfil = async(req,res)=>{
  console.log('hola')
  const forwardUser = await users.findById(req.params.id)
  console.log(req.params.id)
  if(!forwardUser){
      const error = new Error('Hubo un error')
      return res.status(400).json({msg:error.message})
  }
  const {email} = req.body
  if(forwardUser.email !== req.body.email){
      const existeEmail = await users.findOne({email})
      if(existeEmail){
          const error = new Error('Ese email ya esta en uso')
          return res.status(400).json({msg:error.message})
      }
  }
  try {
    forwardUser.nombre = req.body.nombre
    forwardUser.email = req.body.email
    const usuarioActualizado = await forwardUser.save()
     return res.json({
      data: {
        nombre : usuarioActualizado.nombre,
        email : usuarioActualizado.email,
        _id : usuarioActualizado._id,
        imagen : usuarioActualizado.imagen || ''
      },
      msg : 'Datos Actualizados'
      
     })
  } catch (error) {
    console.log(error)
  }



}

const newPassword =  async (req,res) =>{
  console.log('ey')
  const {id} = req.usuario
 
  
    const {pwd_actual,pwd_nuevo} = req.body
    //comprobando que el usuario exista
    const forwardUser = await users.findById(id)
   
   
    if(!forwardUser){
        const error = new Error('Hubo un error')
        return res.status(400).json({msg:error.message})
    }
    

    if(await forwardUser.comparePass(pwd_actual)){
      //guardando new pass
      forwardUser.password = pwd_nuevo
      await forwardUser.save();
      res.json({msg:'Password Guardado Correctamente'})
  }else{
      const error = new Error('Password Incorrecto')
      return res.status(400).json({msg:error.message})
  }
}

export { registrar, perfil, confirmar, autenticar, subirImagen,enviarImagen,actualizarPerfil,newPassword };
