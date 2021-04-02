const mongoose = require('mongoose')


const dbConection = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false

        })
        console.log('bd conectada')

    }catch (e) {
        console.log(e)
        throw new Error('Error al iniciar la bd')
    }

}
module.exports = {
    dbConection
}