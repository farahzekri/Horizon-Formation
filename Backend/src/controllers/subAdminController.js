const { decode } = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//fonction pour afficher le profil user
const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return user profile information (excluding password)
    const { password, ...userProfile } = user._doc;
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//Fonction pour mettre a jour le profil de l'utilisateur
const updateUserProfile = async (req, res) => {
  const { username } = req.params;
  const {
    email,
    oldPassword,
    newPassword,
    firstName,
    lastName,
    dob,
    gender,
    phone,
    address,
    permissions,
  } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Vérifiez l'ancien mot de passe si le nouveau mot de passe est fourni
    if (newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }
      user.password = await bcrypt.hash(newPassword, 10); // Hacher le nouveau mot de passe avant de le sauvegarder
    }

    // Mettre à jour les autres champs autorisés
    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (dob) user.dob = new Date(dob);
    if (gender) user.gender = gender;
    if (phone) user.phone = phone;
    if (permissions) user.permissions = permissions;
    if (address) {
      user.address.city = address.city || user.address.city;
      user.address.state = address.state || user.address.state;
      user.address.zip = address.zip || user.address.zip;
    }

    await user.save();

    // Return updated user profile information (excluding password)
    const { password, ...updatedUserProfile } = user._doc;

    res.status(200).json(updatedUserProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const UpdatePassword = async (req, res) => {
  const { username } = req.params;
  const password = req.body;
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = await bcrypt.hash(password.toString(), 10); // Hash the new password
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ message: "Server error", error });
  }
};
const CheckRole = async (req, res) => {
  let token = req.headers.authorization;
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "admin") {
      return res.status(200).json({ message: true });
    }
    return res.status(403).json({ message: false });
  }
  catch (error) {
    console.error("Error checking token:", error);
    res.status(500).json({ message: "Server error" });
  }
}
module.exports = {
  getUserProfile,
  updateUserProfile,
  UpdatePassword,
  CheckRole
};
