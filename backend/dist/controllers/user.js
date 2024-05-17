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
exports.registerController = void 0;
const user_1 = __importDefault(require("./../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//@route api/users/register
//@desc Register a user
//@access Public
const registerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //1) validate inputs
    try {
        //2) check if user exit before
        let user = yield user_1.default.findOne({ email: req.body.email });
        if (user !== null) {
            return res.status(400).json({ message: "User already exists" });
        }
        //4) create new user (the password will bcrypted before the save process)
        user = new user_1.default(req.body);
        yield user.save();
        //5) create token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        //6) send token in cookie (so the browser will store it in local cookie storage and send it in every request to the server)
        res.cookie("auth_token", token, {
            httpOnly: true, //cookie can't be accessed via client-side scripts
            secure: process.env.NODE_ENV === "production", // send by https only in production
            maxAge: 86400000, // the same as token 1d but in milliseconds
        });
        return res.status(200).send({ message: "User Registerd OK" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error : Something went wrong" });
    }
});
exports.registerController = registerController;
