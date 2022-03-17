import { NextFunction, Request, Response } from "express";

interface LoginProps {
  email: string;
  password: string;
}

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: LoginProps = req.body;

  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!email) {
    return res.status(401).json({ message: "All fields must be filled" });
  }

  if (!password) {
    return res.status(401).json({ message: "All fields must be filled" });
  }

  if (email !== '' && !regexEmail.test(email)) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  if (password.length <= 6) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  next();
}