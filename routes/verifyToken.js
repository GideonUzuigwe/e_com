const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    // const token = req.headers['authorization'];
    if (token) {
        JWT.verify(token, process.env.JWT_SEC_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json("Unauthorized access/Token is not valid")
            }
            req.user = decoded;
            next()
        })
    } else {
        res.status(403).json("No token provided")
    }
}

// const verifyToken = (req, res, next) => {
//     const authHeaders = req.headers.token;
//     if (authHeaders) {
//         const token = authHeaders.split(" ")[1];
//         console.log(token)
//         try {
//             const decoded = JWT.verify(token, process.env.JWT_SEC_KEY);
//             req.user = decoded;
//             next();
//         } catch (err) {
//             res.status(401).json("Token is not valid");
//         }
//     } else {
//         res.status(401).json("You are not authenticated")
//     }
// };

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };