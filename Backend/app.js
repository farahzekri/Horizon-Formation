const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/configs/database");
const bodyParser = require("body-parser");
const userRoute = require("./src/routes/userRoute");
const studentRoute = require("./src/routes/studentRoute");
const classController = require("./src/routes/classesRoute");
const TeacherRoutes = require("./src/routes/TeacherRoute");
const formationRoutes = require("./src/routes/formationRoute");
const courseRoutes = require("./src/routes/courseRoute");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

const corsOptions = {
  origin: "http://localhost:4000", // Frontend URL
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user", userRoute);
app.use("/student", studentRoute);
app.use("/classes", classController);
app.use("/Teacher", TeacherRoutes);
app.use("/course", courseRoutes);
app.use("/formation", formationRoutes);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
