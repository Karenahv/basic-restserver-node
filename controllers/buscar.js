const {Usuario} = require("../models");
const {ObjectId} = require('mongoose').Types


const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios',
]

const buscarUsuarios = async (termino='', res=response) =>{
    const esMongoId = ObjectId.isValid(termino)
    if(esMongoId){
        const usuario = await  Usuario.findById(termino);
        res.json(usuario)
    }
}

const buscar = (req, res) => {

    const {coleccion, termino} = req.params
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion){
        case 'usuarios':
            buscarUsuarios(termino, res)
        break
        case 'categoria':
        break
        case 'productos':
        break

        default:
            res.status(500).json({
                msg: 'Esta búsqueda no esta implementada'
            })

    }

}

module.exports = {
    buscar
}