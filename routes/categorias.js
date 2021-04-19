const {esAdminRole} = require("../middlewares/validar-roles");
const {deleteCategoria} = require("../controllers/categorias");
const {getCategoriaById} = require("../controllers/categorias");
const {updateCategoria} = require("../controllers/categorias");
const {getCategorias} = require("../controllers/categorias");
const {existeCategoria} = require("../helpers/db-validators");
const {crearCategoria} = require("../controllers/categorias");
const {validarJWT} = require("../middlewares/validar-jwt");
const {Router} = require('express')
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");


const router = Router()

// api/categorias

//obtener todas las categorias
router.get('/', [
    validarJWT,
    validarCampos
], getCategorias)

// obtener una categoria por id
// middleware personalizado para validar id existeCategoria en dbvalidators

router.get('/:id', [
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],getCategoriaById)

// crear una nueva cateogoría- privado - cualquier persona con token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,crearCategoria)

//actualizar registro por id - privado- token  válido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],updateCategoria)

//borrar una categoria - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
] ,deleteCategoria)


module.exports = router