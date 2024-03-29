const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connexion à MongoDB réussie : ${conn.connection.host}`);
    } catch (err) {
        console.error(`Erreur de connexion à MongoDB : ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
