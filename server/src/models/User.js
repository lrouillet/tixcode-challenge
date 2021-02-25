const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        }
    },
    user: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 8
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    address: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
});

// Antes de guardar el password, lo hasheo
userSchema.pre('save', async function (next) {
    const user = this;

    // true si creo o modifico la propiedad
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;