const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password, email, role, permissions, firstName,
        lastName, dob, gender, phone, address,status } = req.body;

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
            address,
            status
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

        // Check if the user is active
        if (user.status === 'inactive') {
            return res.status(403).json({ message: 'Your account is inactive. Please contact support.' });
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
        const users = await User.find({ role: { $ne: 'admin' } }); 
        res.json(users); 
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const Update_Status = async (req, res) => {
    const { userId } = req.params;
    const { newStatus } = req.body;

    try {
        // Verify if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's status
        user.status = newStatus;
        await user.save();

        res.status(200).json({ message: 'User status updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};




module.exports = {
    register,
    login,
    student,
    get_All_Users,
    Update_Status
}