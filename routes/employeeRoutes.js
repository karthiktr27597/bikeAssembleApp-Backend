import express from "express";
import { Log } from "../models/Log.js"

const router = express.Router();


// Record Login
router.post('/login', async (req, res) => {
    try {
        let { employeeId, duration, bike } = req.body;

        if (!employeeId || !bike) {
            return res.status(400).json({ success: false, message: "Invalid Input" })
        }

        const loggedData = await Log.find({ employeeId, logoutTime: null })

        if (loggedData.length) {
            return res.status(403).json({ success: false, data: loggedData })
        }

        const log = new Log({
            employeeId: employeeId,
            bike: bike,
            standardDuration: duration,
        });
        await log.save();
        res.status(201).json({ success: true, log });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/logout', async (req, res) => {
    try {
        const { employeeId } = req.body;

        console.log(employeeId);

        const findData = await Log.find({
            employeeId,
            logoutTime: null
        })

        if (!findData) {
            res.status(400).json({ success: false, message: "Data not found" });
        }

        const currentTime = new Date();

        const timeDifferenceInMilliseconds = currentTime - findData[0].loginTime;
        const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));

        console.log("finddata", findData)
        console.log('actualDuration', timeDifferenceInMinutes)


        const result = await Log.updateMany(
            { employeeId, logoutTime: null },
            {
                $set: {
                    logoutTime: currentTime,
                    actualDuration: timeDifferenceInMinutes,
                }
            }
        );

        res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});


export const employeeRoutes = router
