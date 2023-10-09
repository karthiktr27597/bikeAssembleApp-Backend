import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const secretKey = process.env.SECRET_KEY

export const generateJWT = (user) => {

    return jwt.sign(user, secretKey)

}

export const isAuthenticated = async (req, res, next) => {

    const token = await req.headers["x-auth-token"];

    if (!token) {
        return res.status(401).json({ message: "Invalid Authorization" })
    }

    jwt.verify(token, secretKey)
    next()
}