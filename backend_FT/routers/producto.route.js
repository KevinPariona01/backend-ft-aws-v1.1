const { Router } = require('express');
const productoControllers = require('../controllers/producto.controller');

const router = Router();

router.post('/getProducto', productoControllers.getProducto ); 
router.post('/getProductoXNombre', productoControllers.getProductoXNombre ); 
router.post('/getDatesForEdit', productoControllers.getDatesForEdit ); 
router.post('/saveProducto', productoControllers.saveProducto ); 
router.post('/updateProducto', productoControllers.updateProducto ); 
router.post('/deleteProducto', productoControllers.deleteProducto ); 
router.post('/updateDescripcionPedido', productoControllers.updateDescripcionPedido ); 
router.post('/changeActivo', productoControllers.changeActivo );
router.post('/updateSotck', productoControllers.updateSotck );
router.post('/updatePedido', productoControllers.updatePedido );
router.post('/updatePedidoSegunStock', productoControllers.updatePedidoSegunStock );
router.post('/savePorcentajeDistribucionProducto', productoControllers.savePorcentajeDistribucionProducto ); 
router.post('/updatePorcentajeDistribucionProducto', productoControllers.updatePorcentajeDistribucionProducto ); 
router.post('/getDetalleProducto', productoControllers.getDetalleProducto ); 
router.post('/CambiarPorcentajeGrupal', productoControllers.CambiarPorcentajeGrupal ); 
router.post('/getProductoLike', productoControllers.getProductoLike ); 
router.post('/getProductoSegunMedidaYDistribucion', productoControllers.getProductoSegunMedidaYDistribucion ); 
router.post('/getRepetidoCodigoXGrupo', productoControllers.getRepetidoCodigoXGrupo ); 
router.post('/getPedidoProducto', productoControllers.getPedidoProducto ); 


module.exports = router;
