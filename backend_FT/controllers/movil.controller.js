const { response, request } = require('express');
const movilRepository = require('../repository/movil.repository');

const getDataMovil = async (request, response)=> {
    console.log("ingreso");
    let respuesta = await movilRepository.getDataMovil();
    console.log("devolvio");
        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

module.exports = {
    getDataMovil
}