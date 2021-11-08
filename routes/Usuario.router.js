const Router = require('express');
const { crearUsuario,
    reestablecerForm,
    reestablecerPost,
    reestablecerResetForm,
    reestablecerReset
    } = require('../controller/usuario.controller');
const router = Router();
const { body } = require('express-validator');
const validarCampos = require('../middleware/validar-campos');


router.post('/crear-usuario', crearUsuario);
router.get('/reestablecer', reestablecerForm);

router.post('/reestablecer', reestablecerPost);
router.get('/reestablecer/:token', reestablecerResetForm);
router.post('/reestablecer/:token', reestablecerReset);



module.exports = router
