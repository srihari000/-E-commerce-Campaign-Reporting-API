const bcrypt = require('bcrypt');
const User = require('../models/user');

/**
 * @desc Create a new user
 */
exports.createUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, email });
        res.status(201).json({ message: 'User created successfully', user: { id: user.id, username, email } });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user', details: error.message });
    }
};

/**
 * @desc Get user details by ID
 */
exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user details', details: error.message });
    }
};

/**
 * @desc Update user details
 */
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.update({ username, email });
        res.json({ message: 'User updated successfully', user: { id: user.id, username, email } });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user', details: error.message });
    }
};

/**
 * @desc Delete a user
 */
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user', details: error.message });
    }
};
