import express, { query } from 'express';
import { Log } from "../models/Log.js";
const router = express.Router();

router.post('/reports', async (req, res) => {
    try {
        const { employee, start, end } = req.query
        console.log(req.query)

        const startDate = new Date(start)
        const endDate = new Date(`${end}T23:59:59.999Z`)

        // console.log('startDate', startDate);
        // console.log('endDate', endDate);


        const result = await Log.find({
            employeeId: employee,
            logoutTime: {
                $gte: startDate,
                $lte: endDate
            }
        })

        res.send(result)

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


export const adminRouter = router
