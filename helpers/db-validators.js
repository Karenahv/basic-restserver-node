const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol})
    if (!existeRol) {
        throw  new Error(`EL rol ${rol} no está registrado en la bd`)
    }
}

const existeEmail = async (correo='') => {
    const existe = await Usuario.findOne({correo})
    if (existe) {
       throw new Error(`El correo : ${correo}, ya esta registrado`)
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
       throw new Error(`El id : ${id}, no existe`)
    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}