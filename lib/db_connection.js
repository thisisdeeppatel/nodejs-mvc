const mongoose = require("mongoose");

const connectDatabase = async function () {
    try {
        await mongoose
            .connect(
                "mongodb://127.0.0.1:27017/restaurant_management?retryWrites=true&w=majority"
            )
            .then((response) => {
                let host = response.connection.host;
                console.log(`OK: Connected to db server: ${host}`);
            });
    } catch (e) {
        console.warn("ERROR DURING DB CONNECTION");
        console.error(e.toString())
    }
};

module.exports = connectDatabase;