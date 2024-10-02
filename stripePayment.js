const express = require('express');
const router = express.Router();
const stripe = require('stripe')('your-stripe-secret-key');

// Route to handle Stripe checkout session creation
router.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: req.body.productName,
                        },
                        unit_amount: req.body.price * 100, // Price in cents
                    },
                    quantity: req.body.quantity,
                },
            ],
            mode: 'payment',
            success_url: 'https://your-website.com/success',
            cancel_url: 'https://your-website.com/cancel',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment failed' });
    }
});

module.exports = router;
