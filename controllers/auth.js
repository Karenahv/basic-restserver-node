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

const googleSignIn = async (req, res)=>{
    const {id_token} = req.body
    try {
         const googleUser = await googleVerify(id_token)
        console.log(googleUser)
        res.json({
        msg:'TODO ok google sign in!',
        id_token
    })

    }catch (e) {
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