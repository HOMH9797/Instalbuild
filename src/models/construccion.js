const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let construccionSchema = new Schema({
    typeApartment: {
        type: String,
        required: [true, 'El tipo es necesario']
    },
    apartmentNumber: {
        type: Number,
        required: [true, 'La referencia es necesario']
    },
    areaMt: {
        type: Number, default: 0,
        required: [true, 'El area es necesario']
    },
    priceMt: {
        type: Number,default: 0,
        required: [true, 'El valor es requerido']
    },
    pricetotalMt: {
        type: Number,default: 0
    }
});
module.exports = mongoose.model('Construccion', construccionSchema);