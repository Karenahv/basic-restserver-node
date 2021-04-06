const esAdminRole = (req, res, next) => {
    if(!req.usuario){
        return res.status(500).json({
            msg:'se quiere verificar el role sin validar token primero'
        })
    }

    const {rol, nombre} =req.usuario
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: 'No es administrador y no puede hacer esto'
        })
    }
    next()
}

const tieneRole = (...roles) => {

    return (req, res, next) =>{
        if(!req.usuario){
        return res.status(500).json({
            msg:'se quiere verificar el role sin validar token primero'
        })
    }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:`el servicio requiere otros roles ${roles}`
            })
        }
        next()
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}