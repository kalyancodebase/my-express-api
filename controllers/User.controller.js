import UserModel from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      username,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(404).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const userData = await UserModel.findOne({ email: email });
    if (!userData) return res.status(404).json("User does not exist");
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) return res.status(404).json("Invalid Credentials");

      
     const token = jwt.sign({ id: userData._id }, process.env.SECRET_KEY);
   
     res.status(201).json({ token, userData });
     console.log(token)
    //  res.cookie('token', "My Name is kalyan")

  } catch (error) {
    res.status(404).json(error);
  }
};

export { register, login };
