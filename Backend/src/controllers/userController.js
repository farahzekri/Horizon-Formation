const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password, email, role, permissions, firstName,
        lastName, dob, gender, phone, address } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            role,
            permissions,
            firstName,
            lastName,
            dob,
            gender,
            phone,
            address
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
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


const get_All_Users = async (req , res) => {
    try {
        const users = await User.find(); 
        res.json(users); 
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    register,
    login,
    student,
    get_All_Users,
}