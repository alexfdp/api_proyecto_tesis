import jwt from 'jsonwebtoken';
import config from '../config.js';

export const verifytoken = async (req, res, next) => {
    const tokenbearer = req.headers.authorization;

    if (!tokenbearer) return res.status(403).json({ message: "No se ha enviado token" });
    // console.log(tokenbearer)
    try {
        const token = tokenbearer.split(" ")[1]
        const decode = jwt.verify(token, config.SECRET);
        // console.log(dsecode);
        req.params.id = decode.id;
    } catch (error) {
        return res.status(403).json({ message: error.message })
    }
    next();
}