import jwt, { JwtPayload } from "jsonwebtoken";
import { Response } from "express";

export const generateJWTToken = (  user: any,
  message: string,
  statusCode: number,
  res: Response) => {
  if (!user || !user._id) {
    return res.status(500).json({ success: false, message: "Invalid user data" });
  }

  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRE || !process.env.COOKIE_EXPIRE) {
    return res.status(500).json({ success: false, message: "Environment variables not set properly" });
  }

  const token = jwt.sign(
    { id: user._id } as jwt.JwtPayload,
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRE as string }
  );

  const cookieExpireMs = parseInt(process.env.COOKIE_EXPIRE as string) * 24 * 60 * 60 * 1000;

  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: cookieExpireMs,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    })
    .json({
      success: true,
      message,
      token,
     
    });
};
