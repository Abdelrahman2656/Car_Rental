import { carModel } from "../car/car.controller.js";

const allCars = async (req, res) => {
  const { models } = req.query;
  try {
    let cars = await carModel
      .find({
        model: { $in: models.split(",") },
      })
      .toArray();
    console.log(req.query);

    if (!cars) {
      return res.status(404).json({ message: "Car Not Found", success: false });
    }
    res.status(200).json({ message: "Done", success: true, cars });
  } catch (error) {
    console.error("Error fetching rental:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const getAvailableCar = async (req, res) => {
  try {
    const { model } = req.query;
    let cars = await carModel
      .find({ model: model, rentalStatus: "available" })
      .toArray();
    if (cars.length > 0) {
      return res
        .status(200)
        .json({ message: "Available Cars Found", success: true, cars });
    } else {
      return res
        .status(404)
        .json({ message: "No Available Cars ", success: false });
    }
  } catch (error) {
    console.error("Error fetching available cars:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const getCars = async (req, res) => {
  const { model } = req.query;
  let check = {};
  if (model) {
    check.model = model;
  } else {
    check.rentalStatus = "rented";
  }
  try {
  
    const cars = await carModel.find(check).toArray();

    if (cars.length > 0) {
      return res.status(200).json({ message: "Done", success: true, cars });
    } else {
      return res.status(404).json({ message: "Not Found", success: false });
    }
  } catch (error) {
    console.error("Error fetching available cars:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const availableOrRented = async (req, res) => {
   const {model}=req.query
    try {
    
      const cars = await carModel.find({
        $or:[{model:model , rentalStatus:"available"},{model:model,rentalStatus:"rented"}]
      }).toArray();
  
      if (cars.length > 0) {
        return res.status(200).json({ message: "Done", success: true, cars });
      } else {
        return res.status(404).json({ message: "Not Found", success: false });
      }
    } catch (error) {
      console.error("Error fetching available cars:", error);
      res.status(500).json({ message: "Server Error", success: false });
    }
  };
export { allCars, getAvailableCar, getCars ,availableOrRented };
