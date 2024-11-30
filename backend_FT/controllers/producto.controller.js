const { response, request } = require('express');
const productRepository = require('../repository/producto.repository');

const getProducto = async (request, response)=> {

    let respuesta = await productRepository.getProducto(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const getProductoXNombre = async (request, response)=> {

    let respuesta = await productRepository.getProductoXNombre(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const getDatesForEdit = async (request, response)=> {

    let respuesta = await productRepository.getDatesForEdit(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const saveProducto = async (request, response)=> {

    let respuesta = await productRepository.saveProducto(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const updateProducto = async (request, response)=> {

    let respuesta = await productRepository.updateProducto(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const deleteProducto = async (request, response)=> {

    let respuesta = await productRepository.deleteProducto(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const updateDescripcionPedido = async (request, response)=> {

    let respuesta = await productRepository.updateDescripcionPedido(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const changeActivo = async (request, response)=> {

    let respuesta = await productRepository.changeActivo(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const updateSotck = async (request, response)=> {

    let respuesta = await productRepository.updateSotck(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const updatePedido = async (request, response)=> {

    let respuesta = await productRepository.updatePedido(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const updatePedidoSegunStock = async (request, response)=> {

    let respuesta = await productRepository.updatePedidoSegunStock(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const savePorcentajeDistribucionProducto = async (request, response)=> {

    let respuesta = await productRepository.savePorcentajeDistribucionProducto(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const updatePorcentajeDistribucionProducto = async (request, response)=> {

    let respuesta = await productRepository.updatePorcentajeDistribucionProducto(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const getDetalleProducto = async (request, response)=> {

    let respuesta = await productRepository.getDetalleProducto(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const CambiarPorcentajeGrupal = async (request, response)=> {

    let respuesta = await productRepository.CambiarPorcentajeGrupal(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const getProductoLike = async (request, response)=> {

    let respuesta = await productRepository.getProductoLike(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const getProductoSegunMedidaYDistribucion = async (request, response)=> {

    let respuesta = await productRepository.getProductoSegunMedidaYDistribucion(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const getRepetidoCodigoXGrupo = async (request, response)=> {

    let respuesta = await productRepository.getRepetidoCodigoXGrupo(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const getPedidoProducto = async (request, response)=> {

    let respuesta = await productRepository.getPedidoProducto(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

module.exports = {
    getProducto,
    getProductoXNombre,
    getDatesForEdit,
    saveProducto,
    updateProducto,
    deleteProducto,
    updateDescripcionPedido,
    changeActivo,
    updateSotck,
    updatePedido,
    updatePedidoSegunStock,
    savePorcentajeDistribucionProducto,
    updatePorcentajeDistribucionProducto,
    getDetalleProducto,
    CambiarPorcentajeGrupal,
    getProductoLike,
    getProductoSegunMedidaYDistribucion,
    getRepetidoCodigoXGrupo,
    getPedidoProducto
}