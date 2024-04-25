const db = require('../lib/db_connection');
const user = require("../models/user");

async function userSeeder()
{
    await db();

    // admin
    await user.create({
        username : "admin",
        password: "admin123",
        email : "admin@test.com"
    }).then(res => {
        console.log("user created");
    })
}
userSeeder();
