const asyncHandler = require('express-async-handler');
const User = require('../schemas/userModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRETS, {expiresIn: '1d'})
}

//REGISTRARSE

const registerUser = asyncHandler(async (req, res) => {

    const {name, email, password} = req.body;

    //VALIDATIONS
    if(!name || !email || !password){
        res.status(400)
        throw new Error('porfavor complete todos los campos para registrarse')
    }

    if(password.length < 8){
        res.status(400)
        throw new Error('la contrasenia debe ser de por lo menos 8 caracteres')
    }

    //VERFICIACION EMAIL EN USP
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('el mail ya esta en uso')
    }

    //CREACION DE USUARIO
    const user = await User.create({
        name,
        email,
        password
    })

    //GENERO EL TOKEN

    const token = generateToken(user._id);

    res.cookie('token', token,{
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 864),
        sameSite: 'none',
        secure: true
    })

    if(user){
        const {_id, name, email, photo, phone, bio} = user
        res.status(201).json({
            _id, name, email, photo, phone, bio, token
        })
    }else{
        res.status(400)
        throw new Error('informacion invalida')
    }

    res.send('usuario registrado')
});

//LOGEARSE

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    //VALIDACION

    if(!email || !password){
        res.status(404)
        throw new Error('email o contrasenia sin completar')
    }

    //VERIFICACION DE USUARIO

    const user = await User.findOne({email});
    if(!user){
        res.status(400)
        throw new Error('el mail ingresado no existe, porfavor registrese')
    }

    const correctPassword = await bcrypt.compare(password, user.password);

     //GENERO EL TOKEN

    const token = generateToken(user._id);

    //CREO LA COOKIE PARA INICIAR SESION

     res.cookie('token', token,{
         path: '/',
         httpOnly: true,
         expires: new Date(Date.now() + 1000 * 864),
         sameSite: 'none',
         secure: true
     })

    if(user && correctPassword){
        const {_id, name, email, photo, phone, bio} = user
        res.status(201).json({
            _id, name, email, photo, phone, bio, token
        })
    }else{
        res.status(400)
        throw new Error ('mail o contrasenia invalidos')
    }
})

//LOGOUT

const logoutUser = asyncHandler(async(req, res) => {
    
    //EXPIRAR LA COOKIE PARA CERRAR SESION
    res.cookie('token', "",{
        path: '/',
        httpOnly: true,
        expires: new Date(0), //expira en el momento para cerrar sesion
        sameSite: 'none',
        secure: true
    })
    res.status(200).json({message: 'sesion cerrada'})
})

//GET DATA

const getUser = asyncHandler(async(req, res) => {
    
    const user = User.findById(req.user._id);

    if(user){
        const {_id, name, email, photo, phone, bio} = user
        res.status(201).json({
            _id, name, email, photo, phone, bio
        })
    }else{
        res.status(400)
        throw new Error('usuario no encontrado')
    }

})

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser
}