const { Router } = require("express");
const router = Router();
const { body } = require("express-validator/check");
const { getProyecto, getProyectos, postProyecto, formPutProyecto, putProyecto, deleteProyecto } = require("../controller/Proyecto.controller");
const validarSession = require('../middleware/validar-session')

router.get("/",
  validarSession,
  getProyectos);

router.get("/:id",
  validarSession,
  getProyecto);

router.post(
  "/",
  body("nombre").not().isEmpty().trim().escape(),
  validarSession,
  postProyecto
);

router.get("/editar/:url",
  validarSession,
  formPutProyecto);

router.post("/editar/:url",
  validarSession,
  putProyecto);
  
router.delete("/:url",
  validarSession,
  deleteProyecto);

module.exports = router;

