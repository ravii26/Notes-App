import express from "express";
import { Category } from "../../models/categories.js";
import { User } from "../../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => { 
    try {
        const { categoryId } = req.body;
        const token = req.body.headers.Authorization?.split(" ")[1]; // 'Bearer <token>'
            
            if (!token) {
              return res.status(401).send({ message: "No token provided" });
            }
            const decoded = jwt.verify(token,"sadsfdsfaffsc3332rfa3");
            const user = await User.findOne({ _id: decoded._id });
        
            if (!user) return res.status(404).send({ message: "User not found" });
        

        const category = await Category.findOneAndDelete({ _id: categoryId });
        if (!category) return res.status(404).send({ message: "Category not found" });

        res.status(200).send({ message: "Category deleted successfully" });
    } catch (error) {
        console.error(error);    
        res.status(500).send({ message: "Internal Server Error" });
    }
});

export default router;