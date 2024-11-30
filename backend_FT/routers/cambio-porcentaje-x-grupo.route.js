const { Router } = require('express');
const cambioPorcentajeXGrupo = require('../controllers/cambio-porcentaje-x-grupo.controller');

const router = Router();

router.post('/getGrupoXPorcentaje', cambioPorcentajeXGrupo.getGrupoXPorcentaje); 
router.post('/updatePorcetanejeXGrupo', cambioPorcentajeXGrupo.updatePorcetanejeXGrupo); 

module.exports = router;