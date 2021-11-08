const {Router} = require('express');
const router = Router();
const { getHome } = require('../controller/Home.controller');
const validarSession = require('../middleware/validar-session');

router.get('/', 
    validarSession,
    getHome);

module.exports = router;