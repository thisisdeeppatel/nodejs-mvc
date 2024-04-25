let jwt = require("jsonwebtoken");

const ensureToken = function (req, res, next) {
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, process.env.JWT_SECRET, (err, result) => {
            if (err) {
                res.status(401).send({error: true, message: "Invalid Token"});
            } else {
                next();
            }
        });
    } else {
        res.status(401).send({error: true, message: "Token Required"});
    }
}

const generateToken = function (tokenData) {
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * process.env.JWT_EXPIRES_MINUTES),
        data: tokenData
    }, process.env.JWT_SECRET);
    return token
}
module.exports = {ensureToken, generateToken};