import { Response, Request, NextFunction } from "express";
import User from "./../models/user";
import jwt, { Secret } from "jsonwebtoken";
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
    await user.save();

    //5) create token
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

    return res.status(200).send({ message: "User Registerd OK" });
  } catch (error) {
    res.status(500).json({ message: "Server Error : Something went wrong" });
  }
};
