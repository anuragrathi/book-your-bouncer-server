const Bouncer = require("../models/bouncer.model");
const jwtProvider = require("../config/jwtProvider");
const bcrypt = require("bcryptjs");
const createBouncer = async (bouncerData) => {
    try {
        const { firstName, lastName, email, password, hourlyRate, experience } =
            bouncerData;
        const isBouncerExist = await Bouncer.findOne({ email });
        if (isBouncerExist) {
            throw new Error(`Bouncer already exists with email: ${email}`);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const bouncer = await Bouncer.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            hourlyRate,
            experience,
            role: "BOUNCER",
        });
        return bouncer;
    } catch (error) {
        throw new Error(error.message);
    }
};

const findBouncerById = async (bouncerId) => {
    try {
        const bouncer = await Bouncer.findById(bouncerId);
        if (!bouncer) {
            throw new Error(`Bouncer not found with id: ${bouncerId}`);
        }
        return bouncer;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getBouncerByEmail = async (email) => {
    try {
        const bouncer = await Bouncer.findOne({ email });
        if (!bouncer) {
            throw new Error(`Bouncer not found with email: ${email}`);
        }
        return bouncer;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getBouncerProfileByToken = async (token) => {
    try {
        const bouncerId = jwtProvider.getUserIdFromToken(token);
        const bouncer = await findBouncerById(bouncerId);
        if (!bouncer) {
            throw new Error("Bouncer not found with this token");
        }
        return bouncer;
    } catch (error) {
        throw new Error(error.message);
    }
};


const getAllBouncers = async () => {
    try {
        const bouncers = await Bouncer.find();
        return bouncers;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createBouncer,
    findBouncerById,
    getBouncerByEmail,
    getBouncerProfileByToken,
    getAllBouncers,
};
