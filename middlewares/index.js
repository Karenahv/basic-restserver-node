const validaRoles = require("../middlewares/validar-roles");
const validaCampos = require("../middlewares/validar-campos");
const validaJWT = require("../middlewares/validar-jwt");
const validarArchivo =  require('../middlewares/validar-archivo')

module.exports = {
    ... validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validarArchivo,
}