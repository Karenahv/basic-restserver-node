const {response} = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')


const usuariosGet = async (req, res) => {
    //const {q, nombre='no name', apikey, page=1, limit} = req.query;
    const {limite = 5, desde = 0} = req.query
    const query = {estado: true}
    //hay que validar que limite y desde sean numeros.(pendiente)

    try {
        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(limite))

        ])
        res.json({
        total,
        usuarios
    })
    } catch (e) {
        console.log(e)
    }



}

const usuariosPost = async (req, res) => {


    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol})

    // ecryptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt)

    //guardar bd


    await usuario.save();

    res.status(201).json({
        usuario
    })
}

const usuariosPut = async (req, res) => {

    const {id} = req.params
    const {_id, password, google, correo, ...rest} = req.body
    // todo validar contra la bd

    if (password) {
        //encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest, {new: true})
    console.log(usuario)

    res.json({

        usuario
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        'msg': 'patch Api - controlador'
    })
}

const usuariosDelete = async (req, res) => {
    const {id} = req.params
    //fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true})
    const usuarioAutenticado = req.usuario


    res.json({
        usuario,
        usuarioAutenticado,
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}