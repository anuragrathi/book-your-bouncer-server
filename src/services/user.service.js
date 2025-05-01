const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwtProvider = require("../config/jwtProvider");
const createUser = async (userData) => {
    try {
        const { firstName, lastName, email, password } = userData;
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error(`User already exists with email: ${email}`);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: "user", 
        });
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate("address");
        if (!user) {
            throw new Error(`User not found with id: ${userId}`);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports = {
    createUser,
    findUserById,
    getUserByEmail,
    getUserProfileByToken,
    getAllUsers,
};
