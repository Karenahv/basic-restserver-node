const {Usuario} = require("../models");
const {Categoria} = require("../models");
const {Producto} = require("../models");
const {response} = require('express')



// obtener categoria con populete, regresar el objeto de la cateogoria

// actualizar categoria

// borrar categoría -- cambiar estado a false




const crearProducto = async (req, res=response)=>{
    const {nombre, categoria, precio, descripcion, disponible} = req.body
    const productoDB = await Producto.findOne({nombre});
    if(productoDB){
        return res.status(400).json({
            msg: `El producto con el nombre:  ${productoDB.nombre} ya existe`
        })
    }
    // Generar la data que quiero guardar
    const data = {
        nombre: nombre.toUpperCase(),
        usuario: req.usuario._id,
        categoria,
        precio,
        descripcion,
        disponible
    }
    const producto = new Producto(data)

    //Guardar DB

    await producto.save()

    res.status(201).json(producto)


}

const updateProducto = async (req, res)=>{

    const {id} = req.params
    const {estado, usuario, ...data} = req.body
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario.id
     const producto = await Producto.findByIdAndUpdate(id, data, {new: true})
    res.json({

        producto
    })
}

// obtener productos - paginado - total - llamar método populate
// toda info del usuario que creo el producto y el nombre la categoria
const getProductos =async (req, res=response)=>{
    const {limite = 5, desde = 0} = req.query
    const query = {estado: true}
    try {
        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))

        ])


        res.json({
        total,
        productos
    })
    } catch (e) {
        console.log(e)
    }

}

// obtener un producto por su id
const getProductoById = async(req, res) => {
    const {id} =req.params
    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre')
    res.json({
       producto
    })
}

// Cambiar el estado de un producto a false
const deleteProducto = async(req, res) =>{
    const {id} = req.params
   const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true})

    res.json({
        producto
    })
}
module.exports = {
    crearProducto,
    updateProducto,
    getProductos,
    getProductoById,
    deleteProducto


}