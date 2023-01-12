import crypto from "crypto";
 
const generarToken = () => {
    return crypto.randomBytes(12).toString('hex');
}
 
export default generarToken;