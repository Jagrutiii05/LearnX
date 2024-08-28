import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        // console.log(req.cookies);

        // Check if token exists
        const token = req.cookies.token;
        if(!token) return res.status(400).json({message: "Access denied. No token provided", success: false});

        // If token exists, verify it
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode) return res.status(400).json({message: "Invalid token", success: false});

        req.id = decode.userId;
        next();

    } catch (error) {
        console.log(error);
    }
}

export default isAuthenticated;