import { Router } from "express";
import {  deleteUser, getAllUser, getSpecificUser, signIn, signUp, updateUser } from "./user.controller.js";

const userRouter=Router()

userRouter.post('/signup',signUp)
userRouter.post('/signin',signIn)
userRouter.get('/:id',getSpecificUser)
userRouter.get('/',getAllUser)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

export default userRouter;