import express from "express";
import { Log } from "../models/Log.js"

const router = express.Router();


// Record Login
router.post('/login', async (req, res) => {
    try {
        let { employeeId, duration, bike } = req.body;
       // console.log(req.body)

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

        const intervalInMilliseconds = duration * 60 * 1000

        async function updateBikeCount() {
            console.log('setInterval');
            try {
                const result = await Log.updateOne(
                    {
                        employeeId,
                        logoutTime: null
                    },
                    { $inc: { BikeAssumbled: 1 } }
                );
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }

        setInterval(updateBikeCount, intervalInMilliseconds)
        console.log('check')
        res.status(201).json({ success: true, log });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/logout', async (req, res) => {
    try {
        const { employeeId } = req.body;

      //  console.log(employeeId);

        const findData = await Log.find({
            employeeId,
            logoutTime: null
        })

        if (!findData) {
            return res.status(400).json({ success: false, message: "Data not found" });
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

        return res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
});


export const employeeRoutes = router
