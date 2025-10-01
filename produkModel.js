// produkModel.js
const mongoose = require('mongoose');

const produkSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: [true, "Nama produk wajib diisi"]
    },
    harga: {
        type: Number,
        required: [true, "Harga produk wajib diisi"],
        min: 0
    }
}, {
    timestamps: true
});

const Produk = mongoose.model('Produk', produkSchema);

module.exports = Produk;