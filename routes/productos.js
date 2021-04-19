const {crearProducto} = require("../controllers/productos");
const {getCategorias} = require("../controllers/categorias");
const {validarJWT} = require("../middlewares/validar-jwt");
const {Router} = require('express')
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");


const router = Router()

// api/productos

// crear una nuevo producto- privado - cualquier persona con token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,crearProducto)


module.exports = router