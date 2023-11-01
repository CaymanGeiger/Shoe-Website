const express = require('express');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const cors = require('cors');

const app = express();
const PORT = 3001;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get('/products/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    const limit = req.query.limit || 10;

    sneaks.getProducts(keyword, limit, (err, products) => {
    if (err) {
        console.error("Sneaks API error:", err);
        return res.status(500).json({ error: err.message });
    }
    if (!products) {
        return res.status(404).json({ error: "No products found" });
    }
    res.json(products);
});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
