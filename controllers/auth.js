const { response, request } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

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

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id, usuario.name);
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token

        });
    } catch(error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const loginUsuario = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({email});

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe.'
            });
        }

         const validPassword = bcrypt.compareSync(password, usuario.password);
         if (!validPassword) {
            return res.status(401).json({
                ok: false,
                msg: 'Password incorrecto.'
            });
         }

         const token = await generarJWT(usuario.id, usuario.name);

         res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch(error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const revalidarToken = async(req = request, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    res.json({
        ok: true, 
        token
    });
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}