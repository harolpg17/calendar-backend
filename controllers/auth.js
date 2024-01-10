const { response, request } = require('express');
const Usuario = require('../models/Usuario');


const crearUsuario = async(req = request, res = response) => {

    try {
        const { email, password } = req.body;

        let usuario = await Usuario.findOne({email});

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con el correo'
            });
        }
        
        usuario = new Usuario(req.body);
        await usuario.save();
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name

        });
    } catch(error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
    
}

const loginUsuario = (req = request, res = response) => {

    const { email, password } = req.body;
    
    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    });
}

const revalidarToken = (req = request, res = response) => {

    res.json({
        ok: true,
        msg: 'renew'
    });
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}