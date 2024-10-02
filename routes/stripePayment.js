const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: req.body.productName },
                    unit_amount: req.body.price * 100,  // Price in cents
                },
                quantity: req.body.quantity,
            }],
            mode: 'payment',
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/cancel`,
        });
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
