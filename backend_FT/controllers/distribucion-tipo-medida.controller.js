const { response, request } = require('express');
const distribucionTipoMedida = require('../repository/distribucion-tipo-medida.repository');

const getDistribucionTipoMedida = async (request, response)=> {

    let respuesta = await distribucionTipoMedida.getDistribucionTipoMedida(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const saveDistribucionTipoMedida = async (request, response)=> {

    let respuesta = await distribucionTipoMedida.saveDistribucionTipoMedida(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const updateDistribucionTipoMedida = async (request, response)=> {

    let respuesta = await distribucionTipoMedida.updateDistribucionTipoMedida(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const deleteDistribucionTipoMedida = async (request, response)=> {

    let respuesta = await distribucionTipoMedida.deleteDistribucionTipoMedida(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const cambiarOrdenDistribucionTipoMedida = async (request, response)=> {

    let respuesta = await distribucionTipoMedida.cambiarOrdenDistribucionTipoMedida(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const obtenerListaMedidaXGrupo = async (request, response)=> {

    let respuesta = await distribucionTipoMedida.obtenerListaMedidaXGrupo(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const actualizarPorcentajePorProducto = async (request, response)=> {

    let respuesta = await distribucionTipoMedida.actualizarPorcentajePorProducto(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const actualizarEstaticoPorProducto = async (request, response)=> {

    let respuesta = await distribucionTipoMedida.actualizarEstaticoPorProducto(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

module.exports = {
    getDistribucionTipoMedida,
    saveDistribucionTipoMedida,
    updateDistribucionTipoMedida,
    deleteDistribucionTipoMedida,
    cambiarOrdenDistribucionTipoMedida,
    obtenerListaMedidaXGrupo,
    actualizarPorcentajePorProducto,
    actualizarEstaticoPorProducto
}