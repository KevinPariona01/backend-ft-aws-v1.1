const { pool, db } = require('../database/config');
const util = require('util');
const dbAll = util.promisify(db.all).bind(db);
const dbRun = util.promisify(db.run).bind(db);

const getGrupoXPorcentaje = async (request)=> {
    let n_id_grupo = request.body.n_id_grupo || null;
    //QUERYS
    let query1 = `
    WITH RankedPorcentaje AS (
        SELECT
            g.n_id_grupo,
            g.c_nombre_grupo,
            dtm.n_id_distribucion_tipo_medida,
            dtm.c_nombre_distribucion_tipo_medida,
            pdp.f_valor_porcentaje,
            MIN(pdp.f_valor_porcentaje) OVER (PARTITION BY g.n_id_grupo, dtm.n_id_distribucion_tipo_medida) AS f_valor_porcentaje_min,
            MAX(pdp.f_valor_porcentaje) OVER (PARTITION BY g.n_id_grupo, dtm.n_id_distribucion_tipo_medida) AS f_valor_porcentaje_max,
            (SELECT COUNT(DISTINCT pdp_inner.f_valor_porcentaje)
             FROM porcentaje_distribucion_producto pdp_inner
             INNER JOIN producto p on p.n_id_producto = pdp_inner.n_id_producto and p.b_estado = 1
             WHERE pdp_inner.n_id_grupo = g.n_id_grupo AND pdp_inner.n_id_distribucion_tipo_medida = dtm.n_id_distribucion_tipo_medida) AS count_distinct_values,
            ROW_NUMBER() OVER (PARTITION BY g.n_id_grupo, dtm.n_id_distribucion_tipo_medida ORDER BY COUNT(*) DESC) AS rn
        FROM
            grupo g
        INNER JOIN porcentaje_distribucion_producto pdp ON pdp.n_id_grupo = g.n_id_grupo AND g.b_estado = 1
        INNER JOIN distribucion_tipo_medida dtm ON dtm.n_id_distribucion_tipo_medida = pdp.n_id_distribucion_tipo_medida AND dtm.b_estado = 1
        INNER JOIN producto p ON p.n_id_producto = pdp.n_id_producto AND p.b_estado = 1
        GROUP BY
            g.n_id_grupo, dtm.n_id_distribucion_tipo_medida, pdp.f_valor_porcentaje
    )
    SELECT
        n_id_grupo,
        c_nombre_grupo,
        n_id_distribucion_tipo_medida,
        c_nombre_distribucion_tipo_medida,
        f_valor_porcentaje,
        f_valor_porcentaje_min,
        f_valor_porcentaje_max,
        CASE
            WHEN count_distinct_values > 1 THEN 1
            ELSE 0
        END AS hay_valores_diferentes
    FROM
        RankedPorcentaje
    WHERE
        rn = 1 and (n_id_grupo = ${n_id_grupo}) ;
    
    
    `;
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

const updatePorcetanejeXGrupo = async (request)=> {
    //QUERYS
    let n_id_distribucion_tipo_medida = request.body.n_id_distribucion_tipo_medida;
    let n_id_grupo = request.body.n_id_grupo;
    let f_valor_porcentaje = request.body.f_valor_porcentaje;

    let query1 = `UPDATE porcentaje_distribucion_producto SET f_valor_porcentaje = ${f_valor_porcentaje}
    WHERE n_id_grupo = ${n_id_grupo} and n_id_distribucion_tipo_medida = ${n_id_distribucion_tipo_medida}`;

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
    getGrupoXPorcentaje,
    updatePorcetanejeXGrupo
}