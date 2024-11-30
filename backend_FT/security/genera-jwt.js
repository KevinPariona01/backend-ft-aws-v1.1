const jwt = require('jsonwebtoken');
const { resolve } = require('path');

const generarJWT = ( c_username = '' ) => {

    return new Promise((resolve, reject)=>{

        const payload = {c_username};

        jwt.sign(payload, process.env.SECRETPRIVATEKEY, {
            expiresIn: '1m'
        }, (err, token) =>{
            if(err){
                //console.log("error => ", err);
                reject("No se pudo generar el web token");
            }else{
                resolve(token);
            }
        }
        );

    });

}



module.exports = {
    generarJWT
}