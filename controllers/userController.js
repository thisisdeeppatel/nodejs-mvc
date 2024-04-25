const md5 = require("md5");
const jwt = require("../middlewares/jwt");
const user = require("../models/user");

async function createUser(req, res) {
    let newuser = {
        username: req.query.username,
        password: md5(req.query.password),
        email: req.query.email,
    };

    try {
       await user.create(newuser).then((response) => {
            return res.status(200).send({
                error: false,
                input_data: response
            });
        });
    } catch (e) {
        console.warn("ERROR: " + e);
        return res.status(200).send({
            error: true,
            input_data: e.toString()
        });
    }
}

async function getUsers(req, res) {
    user.find({}).then((resp) => {
        return res.status(200).send(resp);
    });
}

async function loginUser(req, res) {
    try {
        let u = await user.findOne({
            email: req.query.email,
            password: md5(req.query.password),
        });

        if (u) {
            let token = jwt.generateToken(u.username);
            u.password = null
            return res.status(200).send({error: false, user: u, _token: token});
        } else {
            return res
                .status(404)
                .send({error: true, msg: "Username or password not found"});
        }
    } catch (e) {
        return res.status(500).send("ERROR " + e);
    }
}

module.exports = {
    createUser,
    getUsers,
    loginUser,
};