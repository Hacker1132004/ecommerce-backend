const db = require('../config/dbConnection');

exports.getAllProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.addProduct = (req, res) => {
    const { name, price, description } = req.body;
    const product = { name, price, description };

    db.query('INSERT INTO products SET ?', product, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Product added successfully!' });
    });
};
