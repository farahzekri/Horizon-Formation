const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/configs/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const userRoute = require("./src/routes/userRoute");
const studentRoute = require("./src/routes/studentRoute");
const classController = require("./src/routes/classesRoute");
const TeacherRoutes = require("./src/routes/TeacherRoute");
const formationRoutes = require("./src/routes/formationRoute");
const payementRoutes = require('./src/routes/paymentRoute');
const invoiceRoutes = require('./src/routes/invoiceRoute');
const courseRoutes = require("./src/routes/courseRoute");
const scheduleRouts=require('./src/routes/scheduleRouter');
const salleRouts=require('./src/routes/salleRoutes');
const app = express();
const PORT = process.env.PORT || 3000;


const corsOptions = {
  origin: "http://localhost:4000", // Frontend URL
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS,HEAD,PATCH",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Origin",
  ],
};
app.use(cors(corsOptions));
app.use(cookieParser());
connectDB();
app.use(bodyParser.json());
app.use('/user',userRoute);
app.use('/student',studentRoute);
app.use('/classes',classController);
app.use("/teacher", TeacherRoutes);
app.use('/course', courseRoutes);
app.use('/formation', formationRoutes);
app.use('/schedule', scheduleRouts);
app.use('/salle', salleRouts);
app.use('/payment', payementRoutes);
app.use('/invoice', invoiceRoutes);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
