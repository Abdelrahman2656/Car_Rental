import bcrypt from "bcrypt";
import { ObjectId } from "bson";
import { db } from "../../Database/dbconnetion.js";

export const userModel = db.collection("users");

const signUp = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const checkEmail = await userModel.findOne({ email });
    if (checkEmail) {
      return res
        .status(409)
        .json({ message: "Email Already Exists", success: false });
    }
    const hashPassword = bcrypt.hashSync(password, 8);
    const customer = await userModel.insertOne({
      name,
      email,
      password: hashPassword,
      phone,
    });

    res
      .status(201)
      .json({ message: "User Added Successfully", success: true, customer });
  } catch (error) {
    console.error("Error during sign up:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User Not Found", success: false });
    }

    
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return res.status(200).json({
        message: "Login Successful",
        success: true,
        loginUser: user,
      });
    } else {
      return res.status(401).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const getSpecificUser = async (req, res) => {
  try {
    const user = await userModel.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User Not Found", success: false });
    }

    res.status(200).json({ message: "Success", success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find().toArray();

    res.status(200).json({ message: "Success", success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, userId } = req.body;

  if (id != userId) {
    res.status(403).json({ message: "You Are Not Owner", success: false });
  }
  let user = await userModel.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: { name, email, phone },
    }
  );
  res
    .status(200)
    .json({ message: "User Updated Successfully", success: true, user });
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
  
    try {
      
      if (id !== userId) {
        return res.status(403).json({ message: "You Are Not Owner", success: false });
      }
     
      const user = await userModel.deleteOne({ _id: new ObjectId(id) });
  
      // Check if the deletion was successful
      if (user.deletedCount === 0) {
        return res.status(404).json({ message: "User Not Found", success: false });
      }
  
      res.status(200).json({ message: "User Deleted Successfully", success: true , user });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Server Error", success: false });
    }
  };
export { signUp, signIn, getSpecificUser, getAllUser, updateUser, deleteUser };
