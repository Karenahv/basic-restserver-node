const {Schema, model} = require('mongoose');
const RoleSchema = Schema({
    rol:{
        type: String,
        requierd :[true,'el rol es obligatorio']
    }

})

module.exports = model('Role', RoleSchema)