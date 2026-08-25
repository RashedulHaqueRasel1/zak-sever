"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateProfile = exports.getProfile = exports.registerUser = exports.getUsers = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Email and password are required');
        }
        const user = await user_model_1.User.isUserExistsByEmail(email);
        if (!user || !user.password) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
        }
        const isPasswordMatch = await user_model_1.User.isPasswordMatched(password, user.password);
        if (!isPasswordMatch) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
        }
        const jwtPayload = {
            _id: user._id,
            email: user.email,
            role: user.role,
        };
        const accessToken = jsonwebtoken_1.default.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET || process.env.JWT_ACCESS_SECRET || 'default_secret', {
            expiresIn: '1d',
        });
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                accessToken,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                }
            }
        });
    }
    catch (err) {
        next(err);
    }
};
exports.loginUser = loginUser;
const getUsers = async (req, res, next) => {
    try {
        res.json({ message: 'Get all users' });
    }
    catch (err) {
        next(err);
    }
};
exports.getUsers = getUsers;
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, username, role, phone } = req.body;
        if (!email || !password || !name || !username) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Name, username, email and password are required');
        }
        const existingUser = await user_model_1.User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User with this email or username already exists');
        }
        const user = await user_model_1.User.create({
            name,
            email,
            password,
            username,
            role: role || 'user',
            phone
        });
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                }
            }
        });
    }
    catch (err) {
        next(err);
    }
};
exports.registerUser = registerUser;
const getProfile = async (req, res, next) => {
    try {
        const user = await user_model_1.User.findById(req.user?._id);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
        res.json({
            success: true,
            message: 'Profile retrieved successfully',
            data: user
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res, next) => {
    try {
        const { name, username, phone } = req.body;
        const user = await user_model_1.User.findByIdAndUpdate(req.user?._id, { name, username, phone }, { new: true, runValidators: true });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: user
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateProfile = updateProfile;
const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await user_model_1.User.findById(req.user?._id).select('+password');
        if (!user || !user.password) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
        const isPasswordMatch = await user_model_1.User.isPasswordMatched(currentPassword, user.password);
        if (!isPasswordMatch) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Incorrect current password');
        }
        user.password = newPassword;
        await user.save();
        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    }
    catch (err) {
        next(err);
    }
};
exports.changePassword = changePassword;
