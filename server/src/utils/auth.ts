import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
};

export const getUserFromToken = (token?: string): string | null => {
  if (!token) return null;

  try {
    const { userId } = verifyToken(token);
    return userId;
  } catch {
    return null;
  }
};
