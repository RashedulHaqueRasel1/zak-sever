import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                  throw new AppError(httpStatus.BAD_REQUEST, 'Email and password are required');
            }

            const user = await User.isUserExistsByEmail(email);
            if (!user || !user.password) {
                  throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
            }
            
            const isPasswordMatch = await User.isPasswordMatched(password, user.password);
            if (!isPasswordMatch) {
                  throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
            }
            
            const jwtPayload = {
                  _id: user._id,
                  email: user.email,
                  role: user.role,
            };
            
            const accessToken = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET || process.env.JWT_ACCESS_SECRET || 'default_secret', {
                  expiresIn: '1d',
            });
            
            res.status(200).json({
                  success: true,
                  message: 'User logged in successfully',
                  data: {
                        accessToken,
                        user: {
                              _id: user._id,
                              name: user.name,
                              email: user.email,
                              username: user.username,
                              role: user.role,
                        }
                  }
            });
      } catch (err) {
            next(err);
      }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
      try {
            res.json({ message: 'Get all users' });
      } catch (err) {
            next(err);
      }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
            const { name, email, password, username, role, phone } = req.body;
            
            if (!email || !password || !name || !username) {
                  throw new AppError(httpStatus.BAD_REQUEST, 'Name, username, email and password are required');
            }

            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                  throw new AppError(httpStatus.BAD_REQUEST, 'User with this email or username already exists');
            }

            const user = await User.create({
                  name,
                  email,
                  password,
                  username,
                  role: role || 'user',
                  phone
            });
            
            res.status(201).json({
                  success: true,
                  message: 'User registered successfully',
                  data: {
                        user: {
                              _id: user._id,
                              name: user.name,
                              email: user.email,
                              username: user.username,
                              role: user.role,
                        }
                  }
            });
      } catch (err) {
            next(err);
      }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
      try {
            const user = await User.findById(req.user?._id);
            if (!user) {
                  throw new AppError(httpStatus.NOT_FOUND, 'User not found');
            }
            res.json({
                  success: true,
                  message: 'Profile retrieved successfully',
                  data: user
            });
      } catch (err) {
            next(err);
      }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
      try {
            const { name, username, phone } = req.body;
            const user = await User.findByIdAndUpdate(
                  req.user?._id,
                  { name, username, phone },
                  { new: true, runValidators: true }
            );
            if (!user) {
                  throw new AppError(httpStatus.NOT_FOUND, 'User not found');
            }
            res.json({
                  success: true,
                  message: 'Profile updated successfully',
                  data: user
            });
      } catch (err) {
            next(err);
      }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
      try {
            const { currentPassword, newPassword } = req.body;
            const user = await User.findById(req.user?._id).select('+password');
            if (!user || !user.password) {
                  throw new AppError(httpStatus.NOT_FOUND, 'User not found');
            }
            
            const isPasswordMatch = await User.isPasswordMatched(currentPassword, user.password);
            if (!isPasswordMatch) {
                  throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect current password');
            }
            
            user.password = newPassword;
            await user.save();
            
            res.json({
                  success: true,
                  message: 'Password changed successfully'
            });
      } catch (err) {
            next(err);
      }
};
