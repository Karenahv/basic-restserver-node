
const {subirArchivo} = require("../helpers/subir-archivo");


const cargarArchivos = async (req, res) => {
    console.log(req.files)


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg:'No hay archivos en la petición'});
    }



    try {
        const pathCompeto = await subirArchivo(req.files, undefined, 'imgs')

        res.json({
        msg: pathCompeto
    })
    } catch (e) {
        res.status(400).json({
            msg:e
        })
    }


}

const actualizarImagen = async (req, res) => {
    const {coleccion, id} = req.params
    res.json({
        coleccion,
        id
    })
}

module.exports = {
    cargarArchivos,
    actualizarImagen
}