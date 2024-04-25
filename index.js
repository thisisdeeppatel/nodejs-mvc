const express = require('express');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const session = require("express-session");

// custom imports
const connectDatabase = require("./lib/db_connection")
const _router = require("./router/router")

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
    })
);

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the backend");
})
app.use("/api", _router);


async function startServer() {
    await connectDatabase();
    app.listen(8080, "0.0.0.0", () => {

        console.log("Listening on http://127.0.0.1:8080");
    })
}

startServer();