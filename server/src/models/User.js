const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        unique: 'Ya existe un usuario registrado con ese email',
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        }
    },
    username: {
        type: String,
        unique: 'Usuario ya registrado',
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true,
});

userSchema.plugin(beautifyUnique);

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save()

    return token;
}

// Intercepto el parseo para eliminar algunos atributos que no quiero mostrar
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

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