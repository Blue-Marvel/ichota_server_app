import User from "../models/user_model";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import createJwt from "../../../utils/helpers/token_gen";

// class UserController {
export const authUser = async (req: Request, res: Response): Promise<any> => {
  console.log(req.body);
  const { email, password, deviceId } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      const user = await User.create({
        email,
        password,
        deviceId,
      });
      // await user.save();

      const token = createJwt({ email: user.email, id: user._id });
      console.log(token);

      res
        .status(StatusCodes.CREATED)
        .json({ message: "User created successfully", createdUser: user });
      //generate token and send
    }
  } catch (e) {
    console.log(e);
  }
};
// }

export const login = async (req: Request, res: Response) => {
  console.log(req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Email or password not found");
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = await (foundUser as any).comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error("Incorrect password");
  }

  res.status(StatusCodes.OK).json({ message: "Login successful" });
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(StatusCodes.OK).json({ users });
  } catch (e) {
    console.log(e);
  }
};
