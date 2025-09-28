const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let produk = [
    { id: 1, nama: "Monitor Ultrawide", harga: 4500000 },
    { id: 2, nama: "Mouse Wireless", harga: 250000 },
    { id: 3, nama: "Keyboard Mechanical RGB", harga: 850000 },
    { id: 4, nama: "Headset Gaming", harga: 600000 }
];

app.get('/produk', (req, res) => {
    res.json(produk);
});

app.get('/produk/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produkDitemukan = produk.find(p => p.id === id);

    if (produkDitemukan) {
        res.json(produkDitemukan);
    } else {
        res.status(404).json({ message: "Produk tidak ditemukan" });
    }
});


app.post('/produk', (req, res) => {
    const produkBaru = {
        id: produk.length + 1,
        nama: req.body.nama,
        harga: req.body.harga
    };

    produk.push(produkBaru);
    res.status(201).json(produkBaru);
});


app.put('/produk/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indexProduk = produk.findIndex(p => p.id === id);

    if (indexProduk !== -1) {
        produk[indexProduk] = {
            id: id,
            nama: req.body.nama,
            harga: req.body.harga
        };
        res.json(produk[indexProduk]);
    } else {
        res.status(404).json({ message: "Produk tidak ditemukan untuk diupdate" });
    }
});


app.delete('/produk/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indexProduk = produk.findIndex(p => p.id === id);

    if (indexProduk !== -1) {
        produk.splice(indexProduk, 1);
        res.json({ message: "Produk berhasil dihapus" });
    } else {
        res.status(404).json({ message: "Produk tidak ditemukan untuk dihapus" });
    }
});


app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});