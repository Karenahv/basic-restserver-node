const{response} = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')


const usuariosGet = (req, res) => {
    const {q, nombre='no name', apikey, page=1, limit} = req.query;
    res.json({
        'msg': 'get Api - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost = async (req, res) => {


    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol})
    // verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        return res.status(400).json({
            msg: 'El correo ya está Registrado'
        })
    }


    // ecryptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt)

    //guardar bd


    await usuario.save();

    res.status(201).json({
        'msg': 'post Api - controlador',
        usuario
    })
}

const usuariosPut = (req, res) => {

    const id = req.params.id
    res.json({
        'msg': 'put Api - controlador',
        id
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        'msg': 'patch Api - controlador'
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        'msg': 'delete Api - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}