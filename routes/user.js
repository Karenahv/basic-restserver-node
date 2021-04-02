const {check} = require("express-validator");
const {usuariosPatch} = require("../controllers/usuarios");
const {usuariosPut} = require("../controllers/usuarios");
const {usuariosDelete} = require("../controllers/usuarios");
const {usuariosPost} = require("../controllers/usuarios");
const {validarCampos} = require("../middlewares/validar-campos");
const Role = require('../models/role')
const {Router} = require('express')
const router = Router()
const {usuariosGet} = require('../controllers/usuarios')

router.get('/', usuariosGet)
router.put('/:id', usuariosPut)
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El pwd es obligatorio, minimo 6 ch').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(async(rol ='')=>{
        const existeRol = await  Role.findOne({rol})
        if(!existeRol){
            throw  new Error(`EL rol ${rol} no está registrado en la bd`)
        }
    }),
    validarCampos
] , usuariosPost)

router.delete('/', usuariosDelete)
router.patch('/', usuariosPatch)

module.exports = router