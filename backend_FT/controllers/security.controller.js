const { response, request } = require('express');
const securityRepository = require('../repository/security.repository');

const validateCredentials = async (request, response)=> {

    let respuesta = await securityRepository.validateCredentials(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}


module.exports = {
    validateCredentials,
}