const { response, request } = require('express');
const constantesRepository = require('../repository/constantes.repository');

const getConstantes = async (request, response)=> {

    let respuesta = await constantesRepository.getConstantes();

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const saveConstante = async (request, response)=> {

    let respuesta = await constantesRepository.saveConstante(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}


const updateConstante = async (request, response)=> {

    let respuesta = await constantesRepository.updateConstante(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}


const getDolar = async (request, response)=> {

    let respuesta = await constantesRepository.getDolar();

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

module.exports = {
    getConstantes,
    saveConstante,
    updateConstante,
    getDolar
}