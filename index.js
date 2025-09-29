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
    const { nama, harga } = req.body;

    if (!nama || harga === undefined) {
        return res.status(400).json({ message: "Error: Nama dan harga wajib diisi!" });
    }
    if (typeof nama !== 'string' || nama.trim() === "") {
        return res.status(400).json({ message: "Error: Nama harus berupa teks dan tidak boleh kosong!" });
    }
    if (typeof harga !== 'number' || harga < 0) {
        return res.status(400).json({ message: "Error: Harga harus berupa angka positif!" });
    }

    const produkBaru = {
        id: produk.length > 0 ? Math.max(...produk.map(p => p.id)) + 1 : 1,
        nama: nama,
        harga: harga
    };

    produk.push(produkBaru);
    res.status(201).json(produkBaru);
});


app.put('/produk/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nama, harga } = req.body;
    const indexProduk = produk.findIndex(p => p.id === id);

    if (indexProduk === -1) {
        return res.status(404).json({ message: "Produk tidak ditemukan untuk diupdate" });
    }

    if (!nama || harga === undefined) {
        return res.status(400).json({ message: "Error: Nama dan harga wajib diisi!" });
    }
    if (typeof nama !== 'string' || nama.trim() === "") {
        return res.status(400).json({ message: "Error: Nama harus berupa teks dan tidak boleh kosong!" });
    }
    if (typeof harga !== 'number' || harga < 0) {
        return res.status(400).json({ message: "Error: Harga harus berupa angka positif!" });
    }

    produk[indexProduk] = {
        id: id,
        nama: nama,
        harga: harga
    };
    res.json(produk[indexProduk]);
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