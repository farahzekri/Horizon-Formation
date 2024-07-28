const Teacher = require("../models/teacher");
const Availability = require("../models/Availability");

const createTeacher = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201);
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).send(error);
  }
};
const editTeacher = async (req, res) => {
  try {

    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!teacher) {
      return res.status(404);
    }
    res.status(200);
  } catch (error) {
    console.error("Error editing teacher:", error);
    res.status(500).send(error);
  }
};
const viewTeacherById = async (req, res) => {
  try {

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404);
    }
    res.status(200).send(teacher);
  } catch (error) {
    console.error("Error viewing teacher by ID:", error);
    res.status(500).send(error);
  }
};
const viewAllTeachers = async (req, res) => {
  try {

    const teachers = await Teacher.find({});
    res.status(200).send(teachers);
  } catch (error) {
    console.error("Error viewing all teachers:", error);
    res.status(500).send(error);
  }
};
const deleteTeacherById = async (req, res) => {
  try {

    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404);
    }
    res.status(204);
  } catch (error) {
    console.error("Error deleting teacher by ID:", error);
    res.status(500).send(error);
  }
};

const recordTeacherAvailability = async (req, res) => {
  try {

    const availability = new Availability({
      ...req.body,
      teacher: req.params.id,
    });
    await availability.save();
    res.status(201);
  } catch (error) {
    console.error("Error recording teacher availability:", error);
    res.status(500).send(error);
  }
};
const defineTeacherCompensation = async (req, res) => {
  try {

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { salary: req.body.salary },
      { new: true, runValidators: true }
    );
    if (!teacher) {
      return res.status(404);
    }
    res.status(200);
  } catch (error) {
    console.error("Error defining teacher compensation:", error);
    res.status(500).send(error);
  }
};
const calculateTeacherRemuneration = async (req, res) => {
  try {

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404);
    }
    const remuneration = teacher.salary * teacher.NumberOfHours;
    res.status(200).send({ remuneration });
  } catch (error) {
    console.error("Error calculating teacher remuneration:", error);
    res.status(500).send(error);
  }
};
const trackTeacherPayments = async (req, res) => {
  try {

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404);
    }
    teacher.payments.push(req.body);
    await teacher.save();
    res.status(201);
  } catch (error) {
    console.error("Error tracking teacher payments:", error);
    res.status(500).send(error);
  }
};
const printTeacherWorkload = async (req, res) => {
  try {

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404);
    }
    const workload = teacher.NumberOfHours;
    res.status(200).send({ workload });
  } catch (error) {
    console.error("Error printing teacher workload:", error);
    res.status(500).send(error);
  }
};
const generateTeacherPayrollReports = async (req, res) => {
  try {

    const teachers = await Teacher.find({});
    const payroll = teachers.map((teacher) => ({
      id: teacher._id,
      name: `${teacher.firstName} ${teacher.lastName}`,
      remuneration: teacher.salary * teacher.NumberOfHours,
      payments: teacher.payments,
    }));
    res.status(200).send(payroll);
  } catch (error) {
    console.error("Error generating teacher payroll reports:", error);
    res.status(500).send(error);
  }
};
const archiveTeacherRecords = async (req, res) => {
  try {

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404);
    }
    teacher.archived = true;
    await teacher.save();
    res.status(200);
  } catch (error) {
    console.error("Error archiving teacher records:", error);
    res.status(500).send(error);
  }
};
const archivedTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({ archived: true });
    res.status(200).send(teachers);
  } catch (error) {
    console.error("Error viewing archived teachers:", error);
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
  archivedTeachers,
};

