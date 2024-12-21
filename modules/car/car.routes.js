import { Router } from "express";
import { addCar,  deleteCar,  getAllCar, getSpecificCar, updateCar } from "./car.controller.js";

const CarRouter=Router()

CarRouter.post('/',addCar)
CarRouter.get('/:id',getSpecificCar)
CarRouter.get('/',getAllCar)
CarRouter.put('/:id',updateCar)
CarRouter.delete('/:id',deleteCar)

export default CarRouter;