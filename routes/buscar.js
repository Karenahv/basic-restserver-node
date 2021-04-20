const {buscar} = require("../controllers/buscar");
const {check} = require("express-validator");
const {Router} = require('express')
const router = Router()


router.get('/:coleccion/:termino', buscar);


module.exports = router;