import { Response, Request, NextFunction } from "express";
import User from "./../models/user";
import jwt, { Secret } from "jsonwebtoken";
import { sendMail } from "../utils/sendMails";
import crypto from "crypto";
//@route api/users/register
//@desc Register a user
//@access Public
export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //1) validate inputs
  try {
    //2) check if user exit before
    let user = await User.findOne({ email: req.body.email });
    if (user !== null) {
      return res.status(400).json({
        message: user.verified
          ? "User already exists"
          : "check your mail to verify",
      });
    }

    //4) create new user (the password will bcrypted before the save process)
    user = new User(req.body);

    // 5)verificaiton token
    const verificationCode = crypto.randomBytes(20).toString("hex");
    user.verificationCode = verificationCode;
    user.verified = false;
    await user.save();
    //6) create verification link
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?code=${verificationCode}`;
    //7) send email to user
    const message = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1>Email Verification</h1>
      <p>Thank you for registering. Please click the link below to verify your email address:</p>
      <p><a href="${verificationLink}">Verify Your Email</a></p>
      <p>If you did not request this verification, please ignore this email.</p>
    </div>
  `;
    try {
      await sendMail({
        recipientMail: user.email,
        subject: "Email verification",
        htmlContent: message,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Something went wrong with sending mails" });
    }
    return res
      .status(200)
      .send({ message: "User registered. Verification email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server Error : Something went wrong" });
  }
};

//@route api/users/verify-email?code=....
//@desc verify emailf for user registration
//@access Public
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ messsage: "Invalid or missing code" });
    }
    //1) ck if user  and if usr exist verify him and creat token for user
    const user = await User.findOne({ verificationCode: code });
    if (!user) {
      return res
        .status(400)
        .json({ messsage: "Invalid or missing verification code" });
    }
    user.verified = true;
    user.verificationCode = "";
    await user.save();
    return res
      .status(200)
      .json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error : Something went wrong" });
  }
};

//@route api/users/me
//@desc logged user
//@access  utility for frontend
export const currentLoggedUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error : Something went wrong" });
  }
};

export const allowedTo = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1)find user
      const user = await User.findById(req.userId);
      // 2) if user exist check it's role  else user not found
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      // 3) check if user role is allowed to do the action
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          message: "Forbidden : you are not allowed to do this action ",
        });
      }

      // 4) if user allowed to do the action
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error : Something went wrong" });
    }
  };
};
