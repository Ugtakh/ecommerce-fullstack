// MONGOOSE => ODM => Object Data Mapping
import { Request, Response } from "express";
import User from "../models/user.model";

export const signup = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "Хоосон утга байж болохгүй." });
    }
    const createdUser = await User.create({
      firstname,
      lastname,
      email,
      password,
    });

    res.status(201).json({ message: "create user is sucessfull" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
};

export const login = (req: Request, res: Response) => {
  res.status(200).json({ message: "Login Success" });
};
