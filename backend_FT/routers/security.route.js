const { Router } = require('express');
const securityControllers = require('../controllers/security.controller');

const router = Router();

router.post('/validateCredentials', securityControllers.validateCredentials );

module.exports = router;
