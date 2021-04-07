const {response} = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const {googleVerify} = require("../helpers/google-verify");
const {generarJWT} = require("../helpers/generar-jwt");


const login = async (req, res) => {

    const {correo, password} = req.body

    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({correo})
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/password no son correctos - correo'
            })
        }

        // si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'usuario inactivo'
            })
        }

        //verificar contraseña

        const validPassword = bcrypt.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/password no son correctos - password'
            })
        }

        //generar el jwt

        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: 'Algo salio mal'
        })
    }

}

const googleSignIn = async (req, res) => {
    const {id_token} = req.body
    try {
        const {correo, nombre, email, img} = await googleVerify(id_token)

        // verificar si correo existe en bd
        let usuario = await Usuario.findOne(({correo}))
        if (!usuario) {
            //tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            }
            usuario = new Usuario(data)
            await usuario.save()
        }


        // si el usuario en db estado false
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        // Generar el jwt
        const token = await generarJWT(usuario.id)

        res.json({
            msg: 'TODO ok google sign in!',
            usuario,
            token,
        })

    } catch (e) {
        console.log(e)
        res.status(400).json({
            msg: 'Token de google no es válido'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}