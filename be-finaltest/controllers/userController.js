import UserModel from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userController = {
  getUsers: async (req, res) => {
    try {
      let users = await UserModel.find({}, { password: 0 }); // all info excluding passwords
      res.status(200).send(users);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Failed to fetch", error: error.message });
    }
  },

  register: async (req, res) => {
    const { email, password } = req.body;
    try {
      // check for existing user
      const user = await UserModel.findOne({ email });
      if (user) {
        return res.status(400).send({ message: "user already exists" });
      }

      // pw hashing
      const hashedPassword = await bcrypt.hash(password, 10);
      // create the user in db
      const newUser = new UserModel({
        email,
        password: hashedPassword,
      });
      await newUser.save();
       res.status(201).send({message: 'Registration successful'});

    } catch (error) {
      console.error("Registration error:", error);
      res
        .status(500)
        .send({ message: "Failed to fetch", error: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).send({ message: "Invalid email or password" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).send({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).send({ token });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server error", error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await UserModel.findOneAndDelete({ email });

      if (!user) {
        return res.status(404).send({message: 'User not found'});
      }

      res.status(200).send({ message: "deleted: ", user });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

export default userController;
