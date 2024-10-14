const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const checkAuth = require('../middleware/auth'); 

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered. Please log in.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const user = new User({ username, email, password: hashedPassword });
        req.session.person = user.username; // Store username in session

        // Save the new user to the database
        await user.save();

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/user-login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found. Please sign up.' });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({ message: 'Invalid password. Please try again.' });
        }

        req.session.person = user.username;
        req.session.isAuthenticated = true;

        // Send a single response
        return res.json({ message: 'Login successful', username: user.username });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});


router.post('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) throw error
        res.redirect('/login')
    })
})

module.exports = router;
