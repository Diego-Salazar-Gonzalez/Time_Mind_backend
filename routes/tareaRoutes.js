import express from "express"
import { registrarTarea,obtenerTareas,eliminarTarea,editarTarea } from "../controllers/tareaController.js";
import checkAuth from "../middleware/authMiddleware.js";
const router = express.Router()


router.get('/',checkAuth,obtenerTareas)
router.post('/',checkAuth,registrarTarea)
router.delete('/:id',checkAuth,eliminarTarea)
router.put('/:id',checkAuth,editarTarea)
export default router;