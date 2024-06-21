const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password, email, permissions, firstName,
        lastName, dob, gender, phone, address } = req.body;

    console.log("Received registration request:", req.body); // Log the received request body

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            console.log("User already exists:", existingUser); // Log if user already exists
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            permissions,
            firstName,
            lastName,
            dob,
            gender,
            phone,
            address
        });

        console.log("New user data:", newUser); // Log the new user data before saving

        await newUser.save();

        console.log("User registered successfully");

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error registering user:", error); // Log any errors that occur
        res.status(500).json({ message: 'Server error', error });
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, username: user.username,
                role: user.role, permissions: user.permissions },
            process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const student = (req, res) => {
    res.status(200).json({ message: 'Student function accessed successfully' });
};

module.exports = {
    register,
    login,
    student
}