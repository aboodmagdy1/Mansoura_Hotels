import { Response, Request, NextFunction } from "express";
import User from "./../models/user";
import jwt, { Secret } from "jsonwebtoken";
import { sendMail } from "../utils/sendMial";
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
      return res.status(400).json({ message: "User already exists" });
    }

    //4) create new user (the password will bcrypted before the save process)
    user = new User(req.body);
    // 5)verificaiton token
    const verificationToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "10m",
      }
    );
    user.veifyEmailToken = verificationToken;
    user.verified = false;
    await user.save();
    //6) create verification link
    const verificationLink = `http://localhost:3000/api/users/verify-email?token=${verificationToken}`;
    //7) send email to user
    let message = `Here is your verification link : ${verificationLink}`;
    try {
      await sendMail({
        from: `MansourHotels <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Email Verification",
        text: message,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Something went wrong with sending mails" });
    }

    //8) create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "1d",
      }
    );
    //9) send token in cookie (so the browser will store it in local cookie storage and send it in every request to the server)
    res.cookie("auth_token", token, {
      httpOnly: true, //cookie can't be accessed via client-side scripts
      secure: process.env.NODE_ENV === "production", // send by https only in production
      maxAge: 86400000, // the same as token 1d but in milliseconds
    });

    return res
      .status(200)
      .send({ message: "User registered. Verification email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server Error : Something went wrong" });
  }
};

//@route api/users/verify-email
//@desc verify emailf for user registration
//@access Public
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ messsage: "Invalid or missing Token" });
    }
    const decoded: any = jwt.verify(
      token as string,
      process.env.JWT_SECRET as Secret
    );
    if (!decoded.userId) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.verified = true;
    user.veifyEmailToken = "";
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
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
