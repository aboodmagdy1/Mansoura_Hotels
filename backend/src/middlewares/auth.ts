import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// to add custom attribute in the request type of express
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

//middleware@route api/auth/validate-token
//@desc Validate the token
//@access frontend to validate the token
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // 1) get the token from the cookie
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    //2) validate the token(will return payload)
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    //3) return payload in request
    req.userId = (decoded as JwtPayload).userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default verifyToken;
