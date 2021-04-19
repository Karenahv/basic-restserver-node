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
            msg: `El producto ${productoDB.nombre} ya existe`
        })
    }
    // Generar la data que quiero guardar
    const data = {
        nombre,
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

module.exports = {
    crearProducto,

}