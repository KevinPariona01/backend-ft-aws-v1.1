const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (request, response, next)=>{

    const tokenRequest = request.header('Authorization');
    //console.log("header => ", request.header('Authorization'));
    let token = getToken(tokenRequest);
    //console.log("token que ya llego => ", token);
    if(!token){
        response.status(401).json({
            msg:'No hay token en la peticion'
        });
    }

    try{
        jwt.verify(token, process.env.SECRETPRIVATEKEY);
        next();
    }catch(error){
        //console.log("Error => ", error);
        response.status(401).json({
            msg:"Token no valido"
        });
    }

}

const getToken = (tokenParameter) =>{
    token = '';
    if(tokenParameter!=null){
        token = tokenParameter.split(" ");
        //console.log("token  => ", token[1]);
    }
    return token[1];
}

module.exports = {
    validarJWT
}