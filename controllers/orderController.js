const db = require('../config/dbConnection');

exports.createOrder = (req, res) => {
    const { productId, quantity } = req.body;
    const order = { userId: req.user.id, productId, quantity };

    db.query('INSERT INTO orders SET ?', order, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Order created successfully!' });
    });
};

exports.getUserOrders = (req, res) => {
    db.query('SELECT * FROM orders WHERE userId = ?', [req.user.id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};
