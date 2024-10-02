import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import asyncHandler from 'express-async-handler';

const userService = new UserService();

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.json(users);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getUser(Number(req.params.id));
    res.json(user);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    await userService.updateUser(Number(req.params.id), req.body);
    res.status(204).send();
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    await userService.deleteUser(Number(req.params.id));
    res.status(204).send();
});
