const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password, email, permissions, firstName,
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
            permissions,
            firstName,
            lastName,
            dob,
            gender,
            phone,
            address,
        });


        await newUser.save();


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
            process.env.JWT_SECRET, { expiresIn: '9h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const TokenVerification = async (req, res) => {
    const token = req.body.token;
console.log(token)
    try {
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.status(200).json({ valid: true });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ valid: false, message: 'Token expired' });
        }
        res.status(401).json({ valid: false, message: 'Token invalid' });
    }
};

const student = (req, res) => {
    res.status(200).json({ message: 'Student function accessed successfully' });
};


const getUsers = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user || user.role !== "sub-admin") {
      return res
        .status(403)
        .json({
          message: "Forbidden: You do not have access to this resource",
        });
    }
   
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
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
    const { status } = req.body;

    try {
        // Vérifiez si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Mettez à jour le statut de l'utilisateur
        user.status = status; // Assurez-vous que newStatus est correctement défini ('active' ou 'inactive')
        await user.save();

        res.status(200).json({ message: 'Statut de l\'utilisateur mis à jour avec succès', user });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = {
    register,
    login,
    TokenVerification,
    student,
    getUsers,
    get_All_Users,
    Update_Status
}