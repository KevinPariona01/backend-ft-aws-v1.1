const { Router } = require('express');
const tipoMedidaControllers = require('../controllers/tipo-medida.controller');

const router = Router();

router.post('/getTipoMedida', tipoMedidaControllers.getTipoMedida); 
router.post('/saveTipoMedida', tipoMedidaControllers.saveTipoMedida); 
router.post('/updateTipoMedida', tipoMedidaControllers.updateTipoMedida); 
router.post('/deleteTipoMedida', tipoMedidaControllers.deleteTipoMedida); 

module.exports = router;