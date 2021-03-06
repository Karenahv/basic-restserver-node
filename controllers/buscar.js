const {Producto} = require("../models");
const {Categoria} = require("../models");
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
        return res.json({
            results: (usuario) ?[usuario]: []
        })
    }

    const regexp = new RegExp(termino, 'i')
    const usuarios = await Usuario.find({
        $or:[{nombre: regexp}, {correo: regexp}],
        $and: [{estado: true}]
    })
    return res.json({
            results: (usuarios) ?usuarios: []
        })
}

const buscarCategorias = async (termino='', res=response) =>{
    const esMongoId = ObjectId.isValid(termino)
    if(esMongoId){
        const categoria = await  Categoria.findById(termino);
        return res.json({
            results: (categoria) ?[categoria]: []
        })
    }

    const regexp = new RegExp(termino, 'i')
    const categorias = await Categoria.find({nombre: regexp, estado:true})
    return res.json({
            results: (categorias) ?categorias: []
        })
}

const buscarProductos = async (termino='', res=response) =>{
    const esMongoId = ObjectId.isValid(termino)
    if(esMongoId){
        const producto = await  Producto.findById(termino);
        return res.json({
            results: (producto) ?[producto]: []
        })
    }
    const regexp = new RegExp(termino, 'i')
    const producto = await Producto.find({nombre: regexp, estado:true})
        .populate('categoria', 'nombre')
    return res.json({
            results: (producto) ? producto: []
        })
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
        break;
        case 'categorias':
            buscarCategorias(termino, res)
        break;
        case 'productos':
            buscarProductos(termino, res)
        break;

        default:
            res.status(500).json({
                msg: 'Esta b??squeda no esta implementada'
            })

    }

}

module.exports = {
    buscar
}