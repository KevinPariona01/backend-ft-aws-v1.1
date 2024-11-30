const { Router } = require('express');
const distribucionTipoMedida = require('../controllers/distribucion-tipo-medida.controller');

const router = Router();

router.post('/getDistribucionTipoMedida', distribucionTipoMedida.getDistribucionTipoMedida); 
router.post('/saveDistribucionTipoMedida', distribucionTipoMedida.saveDistribucionTipoMedida); 
router.post('/updateDistribucionTipoMedida', distribucionTipoMedida.updateDistribucionTipoMedida); 
router.post('/deleteDistribucionTipoMedida', distribucionTipoMedida.deleteDistribucionTipoMedida); 
router.post('/cambiarOrdenDistribucionTipoMedida', distribucionTipoMedida.cambiarOrdenDistribucionTipoMedida); 
router.post('/obtenerListaMedidaXGrupo', distribucionTipoMedida.obtenerListaMedidaXGrupo); 
router.post('/actualizarPorcentajePorProducto', distribucionTipoMedida.actualizarPorcentajePorProducto); 
router.post('/actualizarEstaticoPorProducto', distribucionTipoMedida.actualizarEstaticoPorProducto); 
//router.post('/deleteTipoMedida', distribucionTipoMedida.deleteTipoMedida); 

module.exports = router;
