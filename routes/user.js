const {existeUsuarioPorId} = require("../helpers/db-validators");
const {existeEmail} = require("../helpers/db-validators");
const {esRolValido} = require("../helpers/db-validators");
const {check} = require("express-validator");
const {usuariosPatch} = require("../controllers/usuarios");
const {usuariosPut} = require("../controllers/usuarios");
const {usuariosDelete} = require("../controllers/usuarios");
const {usuariosPost} = require("../controllers/usuarios");
const {validarCampos} = require("../middlewares/validar-campos");

const {Router} = require('express')
const router = Router()
const {usuariosGet} = require('../controllers/usuarios')

router.get('/', usuariosGet)
router.put('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom((rol)=>esRolValido(rol)),
    validarCampos
] ,usuariosPut)
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El pwd es obligatorio, minimo 6 ch').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom(existeEmail),
    check('rol').custom((rol)=>esRolValido(rol)),
    validarCampos
] , usuariosPost)

router.delete('/:id',[
     check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
] ,usuariosDelete)
router.patch('/', usuariosPatch)

module.exports = router