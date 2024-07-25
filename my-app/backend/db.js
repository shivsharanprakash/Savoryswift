const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/SovaroSwift';
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected successfully");
        const db = mongoose.connection.db;
        const fetchedData = await db.collection('Fooddata').find({}).toArray();
        const foodCategoryData = await db.collection("foodcategory").find({}).toArray();
        global.Fooddata = fetchedData;
        global.foodcategory = foodCategoryData;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
