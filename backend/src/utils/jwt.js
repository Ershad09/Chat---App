import jwt from "jsonwebtoken";

export const generateToken = (userid, res) => {
  const secret = process.env.JWT_SECRET;

  const token = jwt.sign({ userid }, secret, { expiresIn: "7d" });

  res.cookie("jwt", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: "strict"});

  return token
};
