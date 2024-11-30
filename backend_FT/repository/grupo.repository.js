const { pool, db } = require('../database/config');
const util = require('util');
const dbAll = util.promisify(db.all).bind(db);

const getGrupo= async ()=> {
    //QUERYS
    let query1 = `SELECT n_id_grupo, c_nombre_grupo, c_descripcion_grupo, n_orden, c_ruta_img FROM grupo WHERE b_estado = 1 ORDER BY n_orden ASC NULLS LAST;`;
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

const saveGrupo= async (request)=> {
    //QUERYS
    let c_nombre_grupo = request.body.c_nombre_grupo;
    let c_descripcion_grupo = request.body.c_descripcion_grupo;
    let c_ruta_img = request.body.c_ruta_img;

    let query1 = `INSERT INTO grupo(c_nombre_grupo, c_descripcion_grupo, c_ruta_img)
    VALUES('${c_nombre_grupo}', '${c_descripcion_grupo}', '${c_ruta_img}')`;

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

const updateGrupo = async (request)=> {
    //QUERYS
    let n_id_grupo = request.body.n_id_grupo;
    let c_nombre_grupo = request.body.c_nombre_grupo;
    let c_descripcion_grupo = request.body.c_descripcion_grupo;
    let c_ruta_img = request.body.c_ruta_img;

    let query1 = `UPDATE grupo SET c_nombre_grupo = '${c_nombre_grupo}', c_descripcion_grupo = '${c_descripcion_grupo}', c_ruta_img = '${c_ruta_img}'
    WHERE n_id_grupo = ${n_id_grupo}`;

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

const deleteGrupo = async (request)=> {
    //QUERYS
    let n_id_grupo = request.body.n_id_grupo;

    let query1 = `UPDATE grupo SET b_estado = 0 WHERE n_id_grupo = ${n_id_grupo}`;

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

const cambiarOrdenGrupo = async (request)=> {
    //QUERYS
    let n_id_grupo = request.body.n_id_grupo;
    let n_orden = request.body.n_orden;

    let query1 = `UPDATE grupo SET n_orden = ${n_orden}
    WHERE n_id_grupo = ${n_id_grupo}`;

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
    getGrupo,
    saveGrupo,
    updateGrupo,
    deleteGrupo,
    cambiarOrdenGrupo
}