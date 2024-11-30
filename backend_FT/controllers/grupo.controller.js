const { response, request } = require('express');
const grupoRepository = require('../repository/grupo.repository');
const fs = require('fs'); 
const multer = require('multer');
var checksum = require('checksum');
const path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const destinationPath = path.join(__dirname.replace('controllers', ''), '/archivos/grupoImg/');
      callback(null, destinationPath);
    },
    filename: function (req, file, callback) {
      callback(null, req.query.extension);
    }
  });
var upload = multer({ storage: storage }).single('DA');



const getGrupo = async (request, response)=> {
    let respuesta = await grupoRepository.getGrupo();

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const saveGrupo = async (request, response)=> {

    let respuesta = await grupoRepository.saveGrupo(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const updateGrupo = async (request, response)=> {

    let respuesta = await grupoRepository.updateGrupo(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const deleteGrupo = async (request, response)=> {

    let respuesta = await grupoRepository.deleteGrupo(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const cambiarOrdenGrupo = async (request, response)=> {

    let respuesta = await grupoRepository.cambiarOrdenGrupo(request);

        if(respuesta.status){
            response.status(200).json({ msg: 'Conexión exitosa', body: respuesta.body, status:true});
        }else{
            response.status(200).json({ msg: respuesta.error , body:null, status:false });
        }
}

const uploadfile = async (request, response)=> {

    const extension = request.query.extension; // Obtiene el parámetro "extension" de la URL
    const n_id_grupo = request.query.n_id_grupo;
    let dir = path.join(__dirname.replace('controllers', ''), '/archivos/grupoImg/');
    console.log("dir => ", dir);
    let rutaCorta = "/archivos/grupoImg/";
    let rutaCorta2 = "grupoImg/"+extension;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    
      request.query.c_ruta = dir;
      request.query.extension = extension;
      dir = dir + '' + extension;
      
      try{
        upload(request, response, function (err) {
            if (err) {
                request.status(200).json({ estado: false, mensaje: "No se pudo cargar el archivo: " + err.stack, data: null })
            } else {
              checksum.file(dir, function (err, sum) {        
                //console.log("Ruta check: ",dir);  
                //console.log("sum",sum);
                nuevoNombreArchivo = (__dirname.replace('\dal', '').replace('controllers', ''))+rutaCorta+sum+path.extname(extension);
                //console.log("nuevoNombreArchivo: "+nuevoNombreArchivo);
                fs.rename(dir, nuevoNombreArchivo, function(err) {
                  if ( err ) console.log('ERROR: ' + err);
                });
                newRuta = 'grupoImg/'+sum+path.extname(extension);
                //console.log("nombre: ", newRuta);
                response.status(200).json({ estado: true, mensaje: "Archivo cargado", c_ruta: newRuta, extension: extension, c_checksum: sum+path.extname(extension) });
                //console.log("ERror",err)
              })
            }
        });
    }catch(e){
        console.log("error");
    }

}

module.exports = {
    getGrupo,
    saveGrupo,
    updateGrupo,
    deleteGrupo,
    cambiarOrdenGrupo,
    uploadfile
}
