import { ObjectId } from "bson";
import { db } from "../../Database/dbconnetion.js";

export const carModel = db.collection("cars");
const addCar = async (req, res) => {
  const { name, model, rentalStatus } = req.body;

  try {
    const car = await carModel.insertOne({
      name,
      model,
      rentalStatus,
    });

    res
      .status(201)
      .json({ message: "Car Added Successfully", success: true, car });
  } catch (error) {
    // Log the error and respond with a server error message
    console.error("Error adding car:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const getSpecificCar = async (req, res) => {
  try {
    const car = await carModel.findOne({ _id: new ObjectId(req.params.id) });
    if (!car) {
      return res.status(404).json({ message: "Car Not Found", success: false });
    }
    res.status(200).json({ message: "Success", success: true, car });
  } catch (error) {
    // Log the error and respond with a server error message
    console.error("Error fetching car:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const getAllCar = async (req, res) => {
  try {
    const car = await carModel.find().toArray();
    if (!car) {
      return res.status(404).json({ message: "Car Not Found", success: false });
    }
    res.status(200).json({ message: "Success", success: true, car });
  } catch (error) {
    // Log the error and respond with a server error message
    console.error("Error fetching car:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const updateCar = async (req ,res)=>{
    let {id}=req.params
    let {name , model ,rentalStatus} = req.body
    try{
        let updateCar = await carModel.updateOne({
            _id:new ObjectId(id)
        },{
            $set :{name ,model , rentalStatus}
        })
        if(updateCar.matchedCount === 0){
          return  res.status(404).json({message:'Car Not Found',success:false})
        }
       res.status(200).json({message:'Car Updated Successfully ', success : true , updateCar})

    }catch (error) {
        // Log the error and respond with a server error message
        console.error("Error fetching car:", error);
        res.status(500).json({ message: "Server Error", success: false });
      }
} 

const deleteCar = async (req ,res)=>{
    let {id}=req.params
   
    try{
        let deleteCar = await carModel.deleteOne({
            _id:new ObjectId(id)
        })
        if(deleteCar.deletedCount=== 0){
          return  res.status(404).json({message:'Car Not Found',success:false})
        }
       res.status(200).json({message:'Car Deleted Successfully ', success : true , deleteCar})

    }catch (error) {
        // Log the error and respond with a server error message
        console.error("Error fetching car:", error);
        res.status(500).json({ message: "Server Error", success: false });
      }
} 
export { addCar, getSpecificCar ,getAllCar ,updateCar ,deleteCar};
