const { Router } = require('express');
const constantesController = require('../controllers/constantes.controller');

const router = Router();

router.post('/getConstantes', constantesController.getConstantes); 
router.post('/saveConstante', constantesController.saveConstante); 
router.post('/updateConstante', constantesController.updateConstante); 
router.post('/getDolar', constantesController.getDolar); 

module.exports = router;