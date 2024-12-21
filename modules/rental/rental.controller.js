import { ObjectId } from "bson"
import { db } from "../../Database/dbconnetion.js"
import { userModel } from "../user/user.controller.js"
import { carModel } from "../car/car.controller.js"

const rentalModel = db.collection('rentals')

const addRental = async (req ,res)=>{
    const { userId, carId, rentalDate, returnDate } = req.body;

  try {
   

    
    const user = await userModel.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: "User Not Found", success: false });
    }

    
    const car = await carModel.findOne({ _id: new ObjectId(carId) });
    if (!car) {
      return res.status(404).json({ message: "Car Not Found", success: false });
    }

   
    if (car.rentalStatus !== "available") {
      return res.status(400).json({ message: "Car Is Not Available", success: false });
    }


    await carModel.updateOne(
      { _id: new ObjectId(carId) },
      { $set: { rentalStatus: "rented" } }
    );

  
    const rental = await db.collection('rentals').insertOne({
      userId: new ObjectId(userId),
      carId: new ObjectId(carId),
      rentalDate: new Date(rentalDate),
      returnDate: new Date(returnDate),
    });

    res.status(201).json({ message: "Rental Added Successfully", success: true, rental });
  } catch (error) {
    // Log the error and respond with a server error message
    console.error("Error adding rental:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
}

const getSpecificRental = async (req, res) => {
    try {

      const rental = await rentalModel.findOne({
        _id: new ObjectId(req.params.id),
      });
  
     
      if (!rental) {
        return res.status(404).json({ message: "Rental Not Found", success: false });
      }
  
      
      res.status(200).json({ message: "Success", success: true, rental });
    } catch (error) {
      // Log the error and respond with a server error message
      console.error("Error fetching rental:", error);
      res.status(500).json({ message: "Server Error", success: false });
    }
  };

const getAllRental=async (req ,res)=>{
    
    try{
        let rental =await rentalModel.aggregate([{   $lookup:{
            from:'users',
            localField:"userId",
            foreignField:"_id",
            as:'userInfo'
            
        }},{
            
                $project: {
                  "userInfo.password": 0, 
                }
        },{$lookup:{
            from:'cars',
            localField:"carId",
            foreignField:"_id",
            as:'carInfo'
        }
          
        }]
         
        ).toArray()
   
        if(!rental){
            return res.status(404).json({ message: "Rental Not Found", success: false });
        }
        res.status(200).json({message:"Success",success:true,rental })

    }catch (error) {
    // Log the error and respond with a server error message
    console.error("Error adding rental:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
}

const updateRental=async(req,res)=>{
    let {id}=req.params
    let{userId , carId , rentalDate , returnDate}=req.body
    try{
        let rental  = await rentalModel.updateOne({
            _id : new ObjectId(id)
        },{
            $set:{userId , carId , rentalDate:new Date(rentalDate) ,returnDate : new Date(returnDate)}
        })
        if(rental.matchedCount === 0){
            return res.status(404).json({message:"Rental Not Found", success:false})
        }
        res.status(200).json({message:"Updated Successfully", success :true , rental})

    }catch (error) {
    // Log the error and respond with a server error message
    console.error("Error adding rental:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
}

const deleteRental=async(req,res)=>{
    let {id}=req.params
    
    try{
        let rental  = await rentalModel.deleteOne({
            _id : new ObjectId(id)
        })
        if(rental.deletedCount === 0){
            return res.status(404).json({message:"Rental Not Found", success:false})
        }
        res.status(200).json({message:"Deleted Successfully", success :true , rental})

    }catch (error) {
    // Log the error and respond with a server error message
    console.error("Error adding rental:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
}
export{
    addRental,
    getSpecificRental,
    getAllRental,
    updateRental,
    deleteRental
}