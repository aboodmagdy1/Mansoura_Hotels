import { Response, Request, NextFunction } from "express";
import User from "./../models/user";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";

//@route api/auth/login
//@desc Register a user
//@access Public
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    //1) check if user exit and check password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //2) create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "1d",
      }
    );
    //6) send token in cookie (so the browser will store it in local cookie storage and send it in every request to the server)
    res.cookie("auth_token", token, {
      httpOnly: true, //cookie can't be accessed via client-side scripts
      secure: process.env.NODE_ENV === "production", // send by https only in production
      maxAge: 86400000, // the same as token 1d but in milliseconds
    });

    // here we send the userId because the front have no access to the cookie because(httpOnly)
    return res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server Error : Something went wrong" });
  }
};

//@route api/auth/validate-token
//@desc validate  a user token
//@access frontend
export const verifyTokenController = (req: Request, res: Response) => {
  //after the validate middleware validate the token this is the response
  res.status(200).send({ userId: req.userId });
};

//@route api/auth/logout
//@desc make cookie invalid
//@access public
export const logoutController = (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0), //cookie that will expire immediately
  });

  res.send();
};
