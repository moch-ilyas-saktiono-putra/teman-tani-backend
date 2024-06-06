const userModels = require('../models/users')

// get all user
const getAllUsers = async(req, res) => {
    const [data] = await userModels.getAllUsers()
    res.json ({
        message: 'GET ALL DATA FROM users',
        data : data,
    })
}

// Regist
const register = (req, res) => {
    const id = ree
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.nody.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword


}

// Login

// Log Out

module.exports = {
    getAllUsers,
}