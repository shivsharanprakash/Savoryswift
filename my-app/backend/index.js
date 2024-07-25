const express = require('express');
const connectToMongo = require('./db.js');
const app = express();
const port = 3001;
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json()); // Ensure this middleware is before the routes
connectToMongo();
app.get('/', (req, res) => {
    res.send("hello world ");
});

app.use('/api', require("./Routes/UserRoute.js"));
app.use('/api', require("./Routes/Displaydata.js"));
app.use('/api', require("./Routes/OrderRoutes.js"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
