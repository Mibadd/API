// index.js
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const Produk = require('./produkModel');

const app = express();
const port = 3000;

app.use(express.json());

// --- KONEKSI KE DATABASE ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Berhasil terhubung ke MongoDB!");
        app.listen(port, () => {
            console.log(`Server berjalan di http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.log("Koneksi ke MongoDB gagal:", error.message);
    });
-

    app.get('/produk', async (req, res) => {
        try {
            const semuaProduk = await Produk.find({});
            res.status(200).json(semuaProduk);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

app.get('/produk/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const produk = await Produk.findById(id);
        if (!produk) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }
        res.status(200).json(produk);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/produk', async (req, res) => {
    try {
        const produkBaru = await Produk.create(req.body);
        res.status(201).json(produkBaru);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/produk/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const produkDiupdate = await Produk.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!produkDiupdate) {
            return res.status(404).json({ message: "Produk tidak ditemukan untuk diupdate" });
        }
        res.status(200).json(produkDiupdate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/produk/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const produkDihapus = await Produk.findByIdAndDelete(id);
        if (!produkDihapus) {
            return res.status(404).json({ message: "Produk tidak ditemukan untuk dihapus" });
        }
        res.status(200).json({ message: "Produk berhasil dihapus", data: produkDihapus });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});