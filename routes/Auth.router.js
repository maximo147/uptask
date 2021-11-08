const Router = require("express");
const { iniciarSesion, formIniciarSesion } = require("../controller/auth.controller");
const router = Router();

router.get('/iniciar-sesion', formIniciarSesion)
router.post('/iniciar-sesion', iniciarSesion);

module.exports = router;