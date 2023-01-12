import multer from 'multer'
import {dirname,extname,join} from 'path'
import { fileURLToPath } from "url"

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))//la direccion donde recide este archivo
const MIMETYPES = ["image/jpeg","image/png"]

const multerUpload = multer({
    storage: multer.diskStorage({
        destination: join(CURRENT_DIR,'../uploads'),//le paso la direccion de este archivo + la carpeta que quiero que se suba el contenido
        filename: (req,file,cb) =>{
            const extension = extname(file.originalname)//devuelve la extension del archivo original
            const fileName =file.originalname.split(extension)[0]//separo el nombre de su extension del archivo
            cb(null,`${fileName}-${Date.now()}${extension}`)
        }
    }
       
    ),
   
    fileFilter: (req,file,cb)=>{
        if(MIMETYPES.includes(file.mimetype)){//revisa si el archivo subido(file.mimetype) es del tipo permitido
            cb(null,true)
        }else{
            cb(new Error('Solo se aceptan imagenes de tipo png,jpg'))
        }
    },
    limits:{
        fieldSize: 10000000//peso limite del archivo en bytes en este caso 10MB
    }
})




export default multerUpload