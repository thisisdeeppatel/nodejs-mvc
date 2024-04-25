const router = require("express").Router();
const jwt = require("../middlewares/jwt");

const userController = require("../controllers/userController");

router.get("/", (req, res) => {
    res.status(200).send("HI");
})

router.post("/signup" ,userController.createUser);
router.get("/users" ,jwt.ensureToken,userController.getUsers);

router.get("/login" , userController.loginUser);


module.exports = router;