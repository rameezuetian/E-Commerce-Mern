const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const data = await mongoose.connect(process.env.DB_URI);

        console.log(`MongoDB connected with server: ${data.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDatabase;