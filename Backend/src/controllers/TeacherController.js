// Import necessary modules and dependencies
const Teacher = require("../models/teacher");
const Availability = require("../models/Availability");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createTeacher = async (req, res) => {
  try {
    const userId = await checkToken(req, res);
    const user = await User.findById(userId);
    if (!user || user.role !== "sub-admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }

    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).send(teacher);
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).send(error);
  }
};
const editTeacher = async (req, res) => {
  try {
    const userId = await checkToken(req, res);
    const user = await User.findById(userId);
    if (!user || user.role !== "sub-admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }

    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    console.error("Error editing teacher:", error);
    res.status(500).send(error);
  }
};
const viewTeacherById = async (req, res) => {
  try {
    const userId = await checkToken(req, res);
    const user = await User.findById(userId);
    if (!user || user.role !== "sub-admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    console.error("Error viewing teacher by ID:", error);
    res.status(500).send(error);
  }
};
const viewAllTeachers = async (req, res) => {
  try {
    const userId = await checkToken(req, res);
    const user = await User.findById(userId);
    if (!user || user.role !== "sub-admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }

    const teachers = await Teacher.find({});
    res.send(teachers);
  } catch (error) {
    console.error("Error viewing all teachers:", error);
    res.status(500).send(error);
  }
};
const deleteTeacherById = async (req, res) => {
  try {
    const userId = await checkToken(req, res);
    const user = await User.findById(userId);
    if (!user || user.role !== "sub-admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }

    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    console.error("Error deleting teacher by ID:", error);
    res.status(500).send(error);
  }
};


const recordTeacherAvailability = async (req, res) => {
  try {
    const userId = await checkToken(req, res);
    const user = await User.findById(userId);
    if (!user || user.role !== "sub-admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }

    const availability = new Availability({
      ...req.body,
      teacher: req.params.id,
    });
    await availability.save();
    res.status(201).send(availability);
  } catch (error) {
    console.error("Error recording teacher availability:", error);
    res.status(500).send(error);
  }
};
const defineTeacherCompensation = async (req, res) => {
  try {
    const userId = await checkToken(req, res);
    const user = await User.findById(userId);
    if (!user || user.role !== "sub-admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { salary: req.body.salary },
      { new: true, runValidators: true }
    );
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    console.error("Error defining teacher compensation:", error);
    res.status(500).send(error);
  }
};
const calculateTeacherRemuneration = async (req, res) => {
  try {
    const userId = await checkToken(req, res);
    const user = await User.findById(userId);
    if (!user || user.role !== "sub-admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    const remuneration = teacher.salary * teacher.NumberOfHours;
    res.send({ remuneration });
  } catch (error) {
    console.error("Error calculating teacher remuneration:", error);
    res.status(500).send(error);
  }
};
const trackTeacherPayments = async (req, res) => {
  try {
    const userId = await checkToken(req, res);
    const user = await User.findById(userId);
    if (!user || user.role !== "sub-admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    teacher.payments.push(req.body);
    await teacher.save();
    res.status(201).send(teacher);
  } catch (error) {
    console.error("Error tracking teacher payments:", error);
    res.status(500).send(error);
  }
};
const printTeacherWorkload = async (req, res) => {
  try {
    const userId = await checkToken(req, res);
    const user = await User.findById(userId);
    if (!user || user.role !== "sub-admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    const workload = teacher.NumberOfHours;
    res.send({ workload });
  } catch (error) {
    console.error("Error printing teacher workload:", error);
    res.status(500).send(error);
  }
};
const generateTeacherPayrollReports = async (req, res) => {
  try {
    const userId = await checkToken(req, res);
    const user = await User.findById(userId);
    if (!user || user.role !== "sub-admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }

    const teachers = await Teacher.find({});
    const payroll = teachers.map((teacher) => ({
      id: teacher._id,
      name: `${teacher.firstName} ${teacher.lastName}`,
      remuneration: teacher.salary * teacher.NumberOfHours,
      payments: teacher.payments,
    }));
    res.send(payroll);
  } catch (error) {
    console.error("Error generating teacher payroll reports:", error);
    res.status(500).send(error);
  }
};
const archiveTeacherRecords = async (req, res) => {
  try {
    const userId = await checkToken(req, res);
    const user = await User.findById(userId);
    if (!user || user.role !== "sub-admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    teacher.archived = true;
    await teacher.save();
    res.send(teacher);
  } catch (error) {
    console.error("Error archiving teacher records:", error);
    res.status(500).send(error);
  }
};

module.exports = {
  createTeacher,
  editTeacher,
  viewTeacherById,
  viewAllTeachers,
  deleteTeacherById,
  recordTeacherAvailability,
  defineTeacherCompensation,
  calculateTeacherRemuneration,
  trackTeacherPayments,
  printTeacherWorkload,
  generateTeacherPayrollReports,
  archiveTeacherRecords,
};

async function checkToken(req, res) {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id.toString();
  } catch (error) {
    console.error("Error checking token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
}