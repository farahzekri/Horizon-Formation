const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require("./src/configs/database");
const bodyParser = require('body-parser');
const userRoute = require('./src/routes/userRoute');
const studentRoute = require('./src/routes/studentRoute');

const app = express();
const PORT = 3000;



connectDB();

app.use(cors({ origin: 'http://localhost:4000' }));
app.use(bodyParser.json());
app.use('/user',userRoute);
app.use('/student',studentRoute);

app.listen(PORT, (error) =>{
        if(!error)
            console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);