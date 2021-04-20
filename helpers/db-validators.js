const Role = require('../models/role')
const Usuario = require('../models/usuario')
const {Producto} = require("../models");
const {Categoria} = require("../models");

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
// validador personalizado para verificar que existe la categoria
const existeCategoria = async (id) => {
    const categoria = await Categoria.findById(id)
    if(!categoria){
        throw new Error(`La categoria con id: ${id} no existe`)
    }
}

// validador personalizado para verificar que existe el producto

const existeProducto = async (id) => {
    const producto = await Producto.findById(id)
    if(!producto){
        throw new Error(`El producto con id: ${id} no existe`)
    }
}


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto
}