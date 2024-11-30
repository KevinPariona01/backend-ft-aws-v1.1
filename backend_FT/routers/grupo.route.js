const { Router } = require('express');
const grupoController = require('../controllers/grupo.controller');

const router = Router();

router.post('/getGrupo', grupoController.getGrupo); 
router.post('/saveGrupo', grupoController.saveGrupo); 
router.post('/updateGrupo', grupoController.updateGrupo); 
router.post('/deleteGrupo', grupoController.deleteGrupo); 
router.post('/cambiarOrdenGrupo', grupoController.cambiarOrdenGrupo); 
router.post('/uploadimg', grupoController.uploadfile); 

module.exports = router;