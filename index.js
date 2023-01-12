import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import tareaRouter from './routes/tareaRoutes.js'

const app = express(); //creando el server
app.use(express.json());
dotenv.config();
conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      // lo encontro
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
};
app.use(cors(corsOptions));

app.use("/api/users", userRouter);
app.use("/api/tareas",tareaRouter );

app.listen(process.env.PORT, () => {
  console.log(`server is connected ${process.env.PORT}`);
});
