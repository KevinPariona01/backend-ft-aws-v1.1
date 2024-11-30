const { response, request } = require('express');
const proveedorRepository = require('../repository/proveedor.repository');
const fs = require('fs'); 
var checksum = require('checksum');
const path = require('path');




const getProveedor = async (request, response)=> {
    let respuesta = await proveedorRepository.getProveedor();

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const saveProveedor = async (request, response)=> {

    let respuesta = await proveedorRepository.saveProveedor(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const updateProveedor = async (request, response)=> {

    let respuesta = await proveedorRepository.updateProveedor(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const deleteProveedor = async (request, response)=> {

    let respuesta = await proveedorRepository.deleteProveedor(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

module.exports = {
    getProveedor,
    saveProveedor,
    updateProveedor,
    deleteProveedor,
}
