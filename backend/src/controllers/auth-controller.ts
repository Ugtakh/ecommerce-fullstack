// MONGOOSE => ODM => Object Data Mapping
import { Request, Response } from "express";

import bcrypt from "bcrypt";
import User from "../models/user.model";
import { generateToken } from "../utils/jwt";

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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Хоосон утга байж болохгүй." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Бүртгэлтэй хэрэглэгч олдсонгүй" });
    } else {
      const isCheck = bcrypt.compareSync(password, user.password.toString());
      if (!isCheck) {
        return res.status(400).json({
          message: "Хэрэглэгчийн имэйл эсвэл нууц үг тохирохгүй байна.",
        });
      } else {
        const token = generateToken({ id: user._id });
        res.status(200).json({
          message: "success",
          token,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Client error" });
  }
};
