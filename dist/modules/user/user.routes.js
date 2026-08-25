"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post('/register', user_controller_1.registerUser);
router.post('/login', user_controller_1.loginUser);
router.get('/me', auth_middleware_1.protect, user_controller_1.getProfile);
router.patch('/me', auth_middleware_1.protect, user_controller_1.updateProfile);
router.patch('/change-password', auth_middleware_1.protect, user_controller_1.changePassword);
router.get('/', user_controller_1.getUsers);
exports.default = router;
