const {deleteProducto} = require("../controllers/productos");
const {esAdminRole} = require("../middlewares/validar-roles");
const {getProductoById} = require("../controllers/productos");
const {getProductos} = require("../controllers/productos");
const {updateProducto} = require("../controllers/productos");
const {existeProducto} = require("../helpers/db-validators");
const {existeCategoria} = require("../helpers/db-validators");
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
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom(existeCategoria),
    validarCampos
] ,crearProducto)

// editar un nuevo producto- privado - cualquier persona con token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
] ,updateProducto)
//obtener todos los productos
router.get('/', [
    validarJWT,
    validarCampos
], getProductos)

//obtener todos los productos
router.get('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], getProductoById)

//borrar una categoria - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
] ,deleteProducto)

module.exports = router