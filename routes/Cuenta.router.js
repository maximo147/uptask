const Router = require('express');
const { getCuenta } = require('../controller/usuario.controller');
const router = Router();

router.get('/crear-cuenta', getCuenta);

module.exports = router