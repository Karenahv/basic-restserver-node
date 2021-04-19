const {Usuario} = require("../models");
const {Categoria} = require("../models");
const {response} = require('express')



// obtener categoria con populete, regresar el objeto de la cateogoria

// actualizar categoria

// borrar categoría -- cambiar estado a false




const crearCategoria = async (req, res=response)=>{
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});
    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }
    // Generar la data que quiero guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data)

    //Guardar DB

    await categoria.save()

    res.status(201).json(categoria)


}
// obtener categorias - paginado - total - llamar método populate
// toda info del usuario que creo la categoria
const getCategorias =async (req, res=response)=>{
    const {limite = 5, desde = 0} = req.query
    const query = {estado: true}
    try {
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate('usuario', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))

        ])


        res.json({
        total,
        categorias
    })
    } catch (e) {
        console.log(e)
    }

}

const updateCategoria = async (req, res)=>{

    const {id} = req.params
    const {estado, usuario, ...data} = req.body
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario.id
     const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true})
    res.json({

        categoria
    })
}

const deleteCategoria = async(req, res) =>{
    const {id} = req.params
   const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true})



    res.json({
        categoria
    })
}


const getCategoriaById = async(req, res) => {
    const {id} =req.params
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre')
    res.json({
        categoria
    })
}

module.exports = {
    crearCategoria,
    getCategorias,
    updateCategoria,
    getCategoriaById,
    deleteCategoria
}