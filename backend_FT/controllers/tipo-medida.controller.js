const { response, request } = require('express');
const tipoMedidaRepository = require('../repository/tipo-medida.repository');

const getTipoMedida = async (request, response)=> {

    let respuesta = await tipoMedidaRepository.getTipoMedida();

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const saveTipoMedida = async (request, response)=> {

    let respuesta = await tipoMedidaRepository.saveTipoMedida(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const updateTipoMedida = async (request, response)=> {

    let respuesta = await tipoMedidaRepository.updateTipoMedida(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const deleteTipoMedida = async (request, response)=> {

    let respuesta = await tipoMedidaRepository.deleteTipoMedida(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

module.exports = {
    getTipoMedida,
    saveTipoMedida,
    updateTipoMedida,
    deleteTipoMedida
}