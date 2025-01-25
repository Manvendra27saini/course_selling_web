const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userModel, purchaseModel, courseModel } = require("../db");

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        res.status(201).json({
            message: 'Signed up successfully',
            user: { email: newUser.email, firstName: newUser.firstName, lastName: newUser.lastName }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error signing up user' });
    }
});

userRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password with hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token for the user (optional, for session management)
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_USER_PASSWORD, { expiresIn: '1h' });

        res.json({
            message: 'Signed in successfully',
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error signing in' });
    }
});

userRouter.get('/purchases', async (req, res) => {
    try {
        const userId = req.userId; 
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const purchases = await purchaseModel.find({ 
            user: userId 
        }); 
        const courseData = await courseModel.find({
             _id: { $in: purchases.map(p=>p.courseId)}
            })

        if (!purchases) {
            return res.status(404).json({ message: 'No purchases found' });
        }
        res.json({
            purchases,
            courseData
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching purchases' });
    }
});

module.exports = {
    userRouter
};
