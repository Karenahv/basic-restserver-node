const validaRoles = require("../middlewares/validar-roles");
const validaCampos = require("../middlewares/validar-campos");
const validaJWT = require("../middlewares/validar-jwt");

module.exports = {
    ... validaCampos,
    ...validaJWT,
    ...validaRoles
}