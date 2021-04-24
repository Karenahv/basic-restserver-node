const {coleccionesPermitidadas} = require("../helpers/db-validators");
const {actualizarImagen} = require("../controllers/uploads");
const {validarCampos} = require("../middlewares/validar-campos");
const {check} = require("express-validator");
const {cargarArchivos} = require('../controllers/uploads');
const {Router} = require('express')
const router = Router()


router.post('/', cargarArchivos)
router.put('/:coleccion/:id',[
    check('id', 'EL id debe ser Mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidadas(c, ['usuarios', 'productos'])),
    validarCampos
] ,actualizarImagen)
module.exports = router