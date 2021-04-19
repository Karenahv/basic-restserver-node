const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type: String,
        requierd :[true,'el nombre es obligatorio'],
        unique: true,
    },
     estado:{
        type: Boolean,
         default: true,
        requierd :true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        requierd: true,
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        requierd: true,
    },
    description: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true,
    }


})

// CategoriaSchema.methods.toJSON = function (){
//     const {__v, estado,   ...data} = this.toObject()
//     return data
// }

module.exports = model('Producto', ProductoSchema)