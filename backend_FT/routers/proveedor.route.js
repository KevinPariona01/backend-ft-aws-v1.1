const { Router } = require('express');
const proveedorController = require('../controllers/proveedor.controller');

const router = Router();

router.post('/getProveedor', proveedorController.getProveedor); 
router.post('/saveProveedor', proveedorController.saveProveedor); 
router.post('/updateProveedor', proveedorController.updateProveedor); 
router.post('/deleteProveedor', proveedorController.deleteProveedor); 
module.exports = router;