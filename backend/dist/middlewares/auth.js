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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//middleware@route api/auth/validate-token
//@desc Validate the token
//@access frontend to validate the token
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1) get the token from the cookie
    const token = req.cookies["auth_token"];
    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }
    try {
        //2) validate the token(will return payload)
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        //3) return payload in request
        req.userId = decoded.userId; // TODO:extend Request type to add userId
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "unauthorized" });
    }
});
exports.default = verifyToken;
