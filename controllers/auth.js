const { response, request } = require('express');
const Usuario = require('../models/Usuario');


const crearUsuario = async(req = request, res = response) => {

    try {
        const { name, email, password } = req.body;

        const usuario = new Usuario(req.body);
        await usuario.save();
    
        res.status(201).json({
            ok: true,
            msg: 'registro',
            name,
            email,
            password
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