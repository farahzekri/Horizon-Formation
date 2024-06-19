const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, enum: ['admin', 'sub-admin'], default:'sub-admin', required: true},
    permissions: [{type: String}],

    firstName: { type: String},
    lastName: { type: String },
    dob: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },

    phone: { type: String },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        country: { type: String }
    },

    // Administrative Metadata
    dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
