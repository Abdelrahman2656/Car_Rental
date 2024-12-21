import { Router } from "express";
import { addRental, deleteRental, getAllRental, getSpecificRental, updateRental } from "./rental.controller.js";

const rentalRouter=Router()
rentalRouter.post('/',addRental)
rentalRouter.get('/:id',getSpecificRental)
rentalRouter.get('/',getAllRental)
rentalRouter.put('/:id', updateRental)
rentalRouter.delete('/:id',deleteRental)

export default rentalRouter;