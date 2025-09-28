const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Halo! Ini adalah halaman utama API saya.');
});

app.get('/produk', (req, res) => {
    res.json({
        id: 1,
        nama: "Produk 1",
        harga: 50000
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});