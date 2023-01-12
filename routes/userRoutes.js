import express from "express";
import { registrar, perfil, confirmar,autenticar, subirImagen, enviarImagen, actualizarPerfil, newPassword } from "../controllers/userController.js";
import checkAuth from "../middleware/authMiddleware.js";
import multerUpload from "../middleware/uploadMiddleware.js";

const router = express.Router();
import {dirname,extname,join} from 'path'
import { fileURLToPath } from "url"
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
console.log(CURRENT_DIR)
router.post("/", registrar);

router.get("/confirmar/:token_TimeMind", confirmar);
router.post("/login",autenticar)

router.get("/perfil",checkAuth, perfil);
router.put('/perfil/imagen',checkAuth,multerUpload.single('name'),subirImagen)
router.use('/perfil/imagen/',enviarImagen, express.static(join(CURRENT_DIR,'../uploads')))
router.put('/perfil/:id',checkAuth,actualizarPerfil)
router.put('/password',checkAuth,newPassword)//no le hagas put al mismo /perfil porque se entrelazan y en vez de newPassword se va a atualizar perfil 


export default router;
