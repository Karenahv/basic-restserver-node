const express = require('express')
var cors = require('cors')
var routes = require('../routes/user')
const {dbConection} = require("../database/config");



class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // conectar a bd

        this.conectarDB()

        // Middlewares
        this.middlewares()
        //Rutas de mi app
        this.routes()

    }

    async conectarDB(){
        await dbConection()
    }

    middlewares(){
        //cors
        this.app.use(cors())

        // parseo y lectura del body
        this.app.use(express.json())

        // drirectorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usuariosPath, routes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en', process.env.PORT)
        })
    }
}


module.exports = Server