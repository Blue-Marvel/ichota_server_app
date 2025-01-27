"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.login = exports.authUser = void 0;
const user_model_1 = __importDefault(require("../models/user_model"));
const http_status_codes_1 = require("http-status-codes");
const token_gen_1 = __importDefault(require("../../../utils/helpers/token_gen"));
// class UserController {
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password, deviceId } = req.body;
    try {
        const foundUser = yield user_model_1.default.findOne({ email }).select("-password");
        if (!foundUser) {
            const user = yield user_model_1.default.create({
                email,
                password,
                deviceId,
            });
            // await user.save();
            const token = (0, token_gen_1.default)({ email: user.email, id: user._id });
            console.log(token);
            const stripPassword = yield user_model_1.default.findById(user._id).select("-password");
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: "User created successfully",
                createdUser: stripPassword,
                token,
            });
            //generate token and send
        }
        else {
            //call login function
            //Remember to add the custom error inside the util folder
            //to handle existing users
            yield (0, exports.login)(req, res);
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.authUser = authUser;
// }
//remove this function or call it in the authUser method when there is a user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("Email or password not found");
    }
    const foundUser = yield user_model_1.default.findOne({ email });
    if (!foundUser) {
        throw new Error("User not found");
    }
    const isPasswordCorrect = yield foundUser.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new Error("Incorrect password");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Login successful" });
});
exports.login = login;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        res.status(http_status_codes_1.StatusCodes.OK).json({ users });
    }
    catch (e) {
        console.log(e);
    }
});
exports.getAllUsers = getAllUsers;
