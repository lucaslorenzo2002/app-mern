const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    photo: {
        type: String,
        default: 'https://i.ibb.co/4pDNDk1/avatar.png'
    },
    name:{
        type: String,
        required: [true, 'profavor agregue un nombre']
    },
    email:{
        type: String,
        required: [true, 'porfavor agregue un mail'],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'porfavor ingrese un email valido',
          ] 
    },
    password:{
        type: String,
        required: [true, 'porfavor agregue una contrasena'],
        minlength: [8, 'la contrasena de tener al menos 8 caracteres']
    },
    phone: {
        type: Number,
        default: 123
    },
    bio:{
        type: String,
        maxlength: [250, 'la bio no puede tener mas de 250 caracteres'],
        default: 'bio'
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword
    next()
})

const User = mongoose.model('user', userSchema);
module.exports = User