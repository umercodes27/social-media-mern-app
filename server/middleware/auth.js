import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try{
        let token = req.headers["authorization"];

        if (!token) return res.status(403).json({ message: "Token is required" });

        if (token.startsWith("Bearer")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}