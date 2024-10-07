
// verify jwt token
const userMiddleware = (req, res, next) => {
    const userHeader = req.headers.authorization;

    if (!userHeader) {
        res.status(401).send({message: 'authorization header is missing'});
    }

    const token = userHeader.split(' ')[1] // extract token from Bearer <token>

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // store user data in req.user
        next(); // next middleware or router
    } catch (error) {
        res.status(403).send({message: "Invalid token: ", error});
    }
};

export default userMiddleware