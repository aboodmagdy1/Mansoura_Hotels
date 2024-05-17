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
exports.logoutController = exports.verifyTokenController = exports.loginController = void 0;
const user_1 = __importDefault(require("./../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//@route api/auth/login
//@desc Register a user
//@access Public
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //1) check if user exit and check password
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        //2) create token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        //6) send token in cookie (so the browser will store it in local cookie storage and send it in every request to the server)
        res.cookie("auth_token", token, {
            httpOnly: true, //cookie can't be accessed via client-side scripts
            secure: process.env.NODE_ENV === "production", // send by https only in production
            maxAge: 86400000, // the same as token 1d but in milliseconds
        });
        // here we send the userId because the front have no access to the cookie because(httpOnly)
        return res.status(200).json({ userId: user._id });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Server Error : Something went wrong" });
    }
});
exports.loginController = loginController;
//@route api/auth/validate-token
//@desc validate  a user token
//@access frontend
const verifyTokenController = (req, res) => {
    //after the validate middleware validate the token this is the response
    res.status(200).send({ userId: req.userId });
};
exports.verifyTokenController = verifyTokenController;
//@route api/auth/logout
//@desc make cookie invalid
//@access public
const logoutController = (req, res) => {
    res.cookie("auth_token", "", {
        expires: new Date(0), //cookie that will expire immediately
    });
    res.send();
};
exports.logoutController = logoutController;
