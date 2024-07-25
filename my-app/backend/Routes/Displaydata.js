const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        res.send({
            fooddata: global.Fooddata,
            foodcategory: global.foodcategory
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
