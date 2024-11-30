const { Router } = require('express');
const movilController = require('../controllers/movil.controller');

const router = Router();

router.post('/getDataMovil', movilController.getDataMovil); 

module.exports = router;