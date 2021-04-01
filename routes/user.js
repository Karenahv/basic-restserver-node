const {usuariosPatch} = require("../controllers/usuarios");
const {usuariosPut} = require("../controllers/usuarios");
const {usuariosDelete} = require("../controllers/usuarios");
const {usuariosPost} = require("../controllers/usuarios");
const {Router} = require('express')
const router = Router()
const {usuariosGet} = require('../controllers/usuarios')

router.get('/', usuariosGet)
router.put('/:id', usuariosPut)
router.post('/', usuariosPost)

router.delete('/', usuariosDelete)
router.patch('/', usuariosPatch)

module.exports = router