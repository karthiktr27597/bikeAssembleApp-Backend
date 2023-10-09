import express from "express";
import { Log } from "../models/Log.js"

const router = express.Router();


// Record Login
router.post('/login', async (req, res) => {
    try {
        let { employeeId, duration, bike } = req.body;
       // console.log(req.body)

        const currentDate = new Date();
        const minutesToAdd = Number(duration);
        // Add minutes to the current date
        const newDate = new Date(currentDate.getTime() + minutesToAdd * 60000); // 60000 milliseconds in a minute

        const log = new Log({
            employeeId: employeeId,
            bike: bike,
            logoutTime: newDate,
            duration,
        });
        await log.save();
        res.status(201).json({ success: true, log });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
});


export const employeeRoutes = router
