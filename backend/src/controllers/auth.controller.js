import User from "../models/user.model.js";
import { hasPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/jwt.js";

export const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  try {

    // check all fields
    if(!userName || !email || !password){
        return res.status(400).json({message: "All fields required"})
    }

    // check password length
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ message: "password must be at least 8 charcter" });
    }

    // check  if email already exists
    const userEmail = await User.findOne({ email });
    if (userEmail)
      return res.status(400).json({ message: "Email Already Exists" });

    // hashing password
    const hashedPassword = await hasPassword(password);

    // creating new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    if (newUser) {

         // save newUser
      await newUser.save();

      // generate token
      generateToken(newUser._id, res);

      // save newUser
      await newUser.save();

      res.status(201).json({
        
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        password: newUser.password,
      });
    } else {
      res.status(400).json({ message: "Invalid user Data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({message: "internal server error"})
  }
};


export const login = (req, res) => {
  res.send("login route");
};
export const logout = (req, res) => {
  res.send("logout route");
};
