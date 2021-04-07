const {googleSignIn} = require("../controllers/auth");
const {validarCampos} = require("../middlewares/validar-campos");
const {login} = require("../controllers/auth");
const {check} = require("express-validator");
const {Router} = require('express')
const router = Router()

router.post('/login',[
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,login);

router.post('/google',[
    check('id_token', 'id_token no existe').not().isEmpty(),
    validarCampos
] ,googleSignIn);

module.exports = router