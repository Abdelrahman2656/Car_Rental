import { Router } from "express";
import { allCars, availableOrRented, getAvailableCar, getCars } from "./special.controller.js";


const specialRouter=Router()
specialRouter.get('/', allCars)
specialRouter.get('/available',getAvailableCar)
specialRouter.get('/getcars',getCars)
specialRouter.get('/cars',availableOrRented)




export default specialRouter;