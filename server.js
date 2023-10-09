import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import { isAuthenticated } from "./Authentication/Auth.js";
import { adminRouter } from "./routes/adminRoutes.js";
import { employeeRoutes } from "./routes/employeeRoutes.js"
import { adminLogin } from "./routes/adminLogin.js";


const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use(cors());
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

// Use routes
app.use('/employee', employeeRoutes);
app.use('/adminlogin', adminLogin);
app.use('/admin', isAuthenticated, adminRouter);

//check server
app.get("/", (req, res) => {
    res.send("<h1>Server working good</h1>")
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
