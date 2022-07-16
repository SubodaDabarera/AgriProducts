// Used to authenticate user
const jwt = require('jsonwebtoken')

// Used to hash password
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const{name, email, password, role} = req.body

    if(!name || !email || !password || !role) {
        return res.status(400).json({ msg: 'Please add all fields'})
    }

    // Check if user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        return res.status(400).json({ msg: 'User already exists'})
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    })


    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        return res.status(400).json({ msg: 'Invalid user data'})
    }

}

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const{email, password} = req.body

    // Check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        return res.status(400).json({ msg: 'Invalid credentials'})
    }
}

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {

    console.log("getMe called")

    const {_id, name, email, role} = await User.findById(req.user.id)

    res.status(200).json({
        id:_id,
        name,
        email,
        role
    })
}

// Generate JWT with id as token payload
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
}