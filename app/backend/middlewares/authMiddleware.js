const User = require('../schemas/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const protect = asyncHandler(async(req, res, next) => {
    try {
        const token = await req.cookies.token
        
        if(!token){
            res.status(401)
            throw new Error('no autorizado, porfavor inicie sesion')
        }

        const verified = jwt.verify(token, process.env.JWT_SECRETS);
        
        const user = await User.findById(verified.id).select('-password');

        if(!user){
            res.status(401)
            throw new Error('usuario no encontrado')
        }

        req.user = user;

        next()

    } catch (error) {
        res.status(401)
            throw new Error('no autorizado, porfavor inicie sesion')
    }
})

module.exports = protect
