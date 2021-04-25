const {actualizarImagenCloudinary} = require("../controllers/uploads");
const {mostrarImagen} = require("../controllers/uploads");
const {validarArchivoSubir} = require("../middlewares/validar-archivo");
const {coleccionesPermitidadas} = require("../helpers/db-validators");
const {actualizarImagen} = require("../controllers/uploads");
const {validarCampos} = require("../middlewares/validar-campos");
const {check} = require("express-validator");
const {cargarArchivos} = require('../controllers/uploads');
const {Router} = require('express')
const router = Router()


router.post('/', validarArchivoSubir ,cargarArchivos)
router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id', 'EL id debe ser Mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidadas(c, ['usuarios', 'productos'])),
    validarCampos
] ,actualizarImagenCloudinary)

router.get('/:coleccion/:id',[
    check('id', 'EL id debe ser Mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidadas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)
module.exports = router