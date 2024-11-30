const { pool, db } = require('../database/config');
const util = require('util');
const dbAll = util.promisify(db.all).bind(db);

const getTipoMedida = async ()=> {
    //QUERYS
    let query1 = 'SELECT n_id_tipo_medida, c_nombre_tipo_medida, c_descripcion_tipo_medida FROM tipo_medida WHERE b_estado = 1';
    //OBJECT RESPONSE
    let objectResponse = {
        body:null,
        status:null,
        error: null
    };
    let body = {
        response1:null,
    };
    try{
        let response1 = await dbAll(query1);

        body.response1 = response1;

        objectResponse.body = body;
        objectResponse.status = true;
        
        return objectResponse;

    }catch(error){

        objectResponse.error =  error.toString();
        objectResponse.status = false;
        
        return objectResponse;
    }

}

const saveTipoMedida = async (request)=> {
    //QUERYS
    let c_nombre_tipo_medida = request.body.c_nombre_tipo_medida;
    let c_descripcion_tipo_medida = request.body.c_descripcion_tipo_medida;

    let query1 = `INSERT INTO tipo_medida(c_nombre_tipo_medida, c_descripcion_tipo_medida)
    VALUES('${c_nombre_tipo_medida}', '${c_descripcion_tipo_medida}')`;

    //OBJECT RESPONSE
    let objectResponse = {
        body:null,
        status:null,
        error: null
    };
    let body = {
        response1:null,
    };
    try{
        let response1 = await dbAll(query1);

        body.response1 = response1;

        objectResponse.body = body;
        objectResponse.status = true;
        
        return objectResponse;

    }catch(error){

        objectResponse.error =  error.toString();
        objectResponse.status = false;
        
        return objectResponse;
    }

}

const updateTipoMedida = async (request)=> {
    //QUERYS
    let n_id_tipo_medida = request.body.n_id_tipo_medida;
    let c_nombre_tipo_medida = request.body.c_nombre_tipo_medida;
    let c_descripcion_tipo_medida = request.body.c_descripcion_tipo_medida;

    let query1 = `UPDATE tipo_medida SET c_nombre_tipo_medida = '${c_nombre_tipo_medida}', c_descripcion_tipo_medida = '${c_descripcion_tipo_medida}'
    WHERE n_id_tipo_medida = ${n_id_tipo_medida}`;

    //OBJECT RESPONSE
    let objectResponse = {
        body:null,
        status:null,
        error: null
    };
    let body = {
        response1:null,
    };
    try{
        let response1 = await dbAll(query1);

        body.response1 = response1;

        objectResponse.body = body;
        objectResponse.status = true;
        
        return objectResponse;

    }catch(error){

        objectResponse.error =  error.toString();
        objectResponse.status = false;
        
        return objectResponse;
    }

}

const deleteTipoMedida = async (request)=> {
    //QUERYS
    let n_id_tipo_medida = request.body.n_id_tipo_medida;

    let query1 = `UPDATE tipo_medida SET b_estado = 0 WHERE n_id_tipo_medida = ${n_id_tipo_medida}`;

    //OBJECT RESPONSE
    let objectResponse = {
        body:null,
        status:null,
        error: null
    };
    let body = {
        response1:null,
    };
    try{
        let response1 = await dbAll(query1);

        body.response1 = response1;

        objectResponse.body = body;
        objectResponse.status = true;
        
        return objectResponse;

    }catch(error){

        objectResponse.error =  error.toString();
        objectResponse.status = false;
        
        return objectResponse;
    }

}



module.exports = {
    getTipoMedida,
    saveTipoMedida,
    updateTipoMedida,
    deleteTipoMedida
}