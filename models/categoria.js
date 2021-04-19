const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
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
    }


})

CategoriaSchema.methods.toJSON = function (){
    const {__v, estado,   ...data} = this.toObject()
    return data
}

module.exports = model('Categoria', CategoriaSchema)