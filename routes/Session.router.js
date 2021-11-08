const { Router } = require("express");
const cerrarSession = require("../controller/Session.controller");
const router = Router();

router.get('/cerrar-session', cerrarSession)

module.exports = router;