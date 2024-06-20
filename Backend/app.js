const express = require('express');
const connectDB = require("./src/configs/database");
const bodyParser = require('body-parser');
const userRoute = require('./src/routes/userRoute');

const app = express();
const PORT = 8000;

connectDB();
app.use(bodyParser.json());
app.use('/user',userRoute);

app.listen(PORT, (error) =>{
        if(!error)
            console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);