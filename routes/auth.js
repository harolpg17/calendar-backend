/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/


const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/new', 
    [
        check('name', 'Nombre es oblidatorio').not().isEmpty(),
        check('password', 'Password debe ser de 6 caracteres').isLength({min: 6}),
        check('email', 'Email es oblidatorio').isEmail(),
        validarCampos
    ], 
    crearUsuario);

router.post(
    '/', 
    [
        check('password', 'Password debe ser de 6 caracteres').isLength({min: 6}),
        check('email', 'Email es oblidatorio').isEmail(),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', revalidarToken);


module.exports = router;