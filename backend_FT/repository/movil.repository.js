const { pool, db } = require('../database/config');
const util = require('util');
const dbAll = util.promisify(db.all).bind(db);
const dbRun = util.promisify(db.run).bind(db);


const getDataMovil = async (request)=> {

    let queryGrupos = 'select * from grupo where b_estado = 1;';
    let queryProductos = 'select * from producto where b_estado = 1;';
    let queryConnstantes = 'select * from constantes where b_estado = 1;';
    let queryDistribucion_tipo_medida = 'select * from distribucion_tipo_medida where b_estado = 1;';
    let queryTipoMedida = 'select * from tipo_medida where b_estado = 1;';
    let queryporcentaje_distribucion_producto = 'select * from porcentaje_distribucion_producto';

    //OBJECT RESPONSE
    let objectResponse = {
        body:null,
        status:null,
        error: null
    };
    let body = {
        grupos:null,
        productos:null,
        constantes:null,
        distribucion_tipo_medida:null,
        tipo_medida:null,
        porcentaje_distribucion_producto:null,
    };

    try{
        let responseGrupos = await dbAll(queryGrupos);
        let responseProductos = await dbAll(queryProductos);
        let responseConstantes = await dbAll(queryConnstantes);
        let responseDistribucionTipoMedida = await dbAll(queryDistribucion_tipo_medida);
        let responseTipoMedida = await dbAll(queryTipoMedida);
        let responsePorcentajeDistribucionProducto = await dbAll(queryporcentaje_distribucion_producto);

        body.grupos = responseGrupos;
        body.productos = responseProductos;
        body.constantes = responseConstantes;
        body.distribucion_tipo_medida = responseDistribucionTipoMedida;
        body.tipo_medida = responseTipoMedida;
        body.porcentaje_distribucion_producto = responsePorcentajeDistribucionProducto;

        objectResponse.body = body;
        objectResponse.status = true;

        return objectResponse;

    }catch(e){
        objectResponse.error =  error.toString();
        objectResponse.status = false;

        return objectResponse;
    }


}

module.exports = {
    getDataMovil,
}