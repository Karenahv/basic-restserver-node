const path = require('path')
const fs = require('fs')
const {Producto} = require("../models");
const {Usuario} = require("../models");
const {subirArchivo} = require("../helpers/subir-archivo");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);



const cargarArchivos = async (req, res) => {
    console.log(req.files)

    try {
        const pathCompeto = await subirArchivo(req.files, undefined, 'imgs')

        res.json({
            msg: pathCompeto
        })
    } catch (e) {
        res.status(400).json({
            msg: e
        })
    }


}

const actualizarImagen = async (req, res) => {
    console.log(req.files)
    const {coleccion, id} = req.params
    let modelo;
    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No esxiste un usuario con este id'
                })
            }

            break;
        case 'productos':

            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No esxiste un producto con este id'
                })
            }

            break;

        default:
            res.status(500).json({msg: 'Esto no esta implementado'})

    }
    // limipiar imagenes previas
    if (modelo.img) {
        // hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }

    }

    const nombre = await subirArchivo(req.files, undefined, coleccion)
    modelo.img = nombre;
    await modelo.save();

    res.json({
        modelo,
    })
}


const mostrarImagen = async (req, res)=>{
    const {coleccion, id} = req.params
    let modelo;
    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No esxiste un usuario con este id'
                })
            }

            break;
        case 'productos':

            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No esxiste un producto con este id'
                })
            }

            break;

        default:
            res.status(500).json({msg: 'Esto no esta implementado'})

    }

    if (modelo.img) {

        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }

    }

    const pathNoImage = path.join(__dirname, '../assets', 'no-image.jpg');
    res.sendFile(pathNoImage)
}

const actualizarImagenCloudinary = async (req, res) => {
    console.log(req.files)
    const {coleccion, id} = req.params
    let modelo;
    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No esxiste un usuario con este id'
                })
            }

            break;
        case 'productos':

            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No esxiste un producto con este id'
                })
            }

            break;

        default:
            res.status(500).json({msg: 'Esto no esta implementado'})

    }
    // limipiar imagenes previas
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1]
        const [public_id] = nombre.split('.')
        cloudinary.uploader.destroy(public_id);
    }
    const {tempFilePath} = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)



    modelo.img = secure_url;
    await modelo.save();

    res.json({
        modelo,
    })
}

module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}