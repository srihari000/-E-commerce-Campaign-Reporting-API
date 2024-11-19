const express = require('express');
const {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @route POST /users
 * @desc Create a new user
 * @access Public
 */
router.post('/', createUser);

/**
 * @route GET /users/:id
 * @desc Get user details by ID
 * @access Protected
 */
router.get('/:id', authMiddleware, getUserById);

/**
 * @route PUT /users/:id
 * @desc Update user details
 * @access Protected
 */
router.put('/:id', authMiddleware, updateUser);

/**
 * @route DELETE /users/:id
 * @desc Delete a user
 * @access Protected
 */
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;
