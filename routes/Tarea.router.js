const { Router } = require('express');
const { postTarea, putTarea, deleteTarea } = require('../controller/Tarea.controller');
const router = Router();

router.post('/:url', postTarea)
router.put('/:id', putTarea)
router.delete('/:id', deleteTarea)

module.exports = router;