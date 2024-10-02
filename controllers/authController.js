const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConnection');

exports.signup = (req, res) => {
    const { username, password } = req.body;
    
    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json(err);

        const user = { username, password: hashedPassword };

        // Insert user into DB
        db.query('INSERT INTO users SET ?', user, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: 'User registered successfully!' });
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Fetch user from DB
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(400).json({ message: 'User not found' });

        const user = result[0];

        // Compare password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            // Generate JWT
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    });
};
