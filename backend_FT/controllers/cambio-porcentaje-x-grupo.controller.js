const { response, request } = require('express');
const cambioPorcentajeXGrupo = require('../repository/cambio-porcentaje-x-grupo.repository');

const getGrupoXPorcentaje = async (request, response)=> {

    let respuesta = await cambioPorcentajeXGrupo.getGrupoXPorcentaje(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const updatePorcetanejeXGrupo = async (request, response)=> {

    let respuesta = await cambioPorcentajeXGrupo.updatePorcetanejeXGrupo(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

module.exports = {
    getGrupoXPorcentaje,
    updatePorcetanejeXGrupo
}
