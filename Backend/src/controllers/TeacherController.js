const Salary = require('../models/salary');
const Teacher = require("../models/teacher");
const Availability = require("../models/Availability");

const createTeacher = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    console.error('Error creating teacher:', error);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    res.status(400).json({ error: error.message });
  }}

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate({
      path: 'employmentInfo.formation',
      select: 'name _id'
    });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
        .populate({
      path: 'employmentInfo.formation',
      select: 'name _id'
    })
        .populate({
      path: 'salaryInfo.salaries.salaryId',
      select: 'hourlyRate workHours amount method paymentDate month paid'
    });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a teacher
const updateTeacher = async (req, res) => {
  const updatedData = req.body;

  const formattedData = {
    personalInfo: {
      firstName: updatedData.firstName,
      lastName: updatedData.lastName,
      dateOfBirth: updatedData.dateOfBirth,
      address: updatedData.address,
      phoneNumber: updatedData.phoneNumber,
      email: updatedData.email
    }
  };
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, formattedData, { new: true, runValidators: true });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createSalariesForYear = async (req, res) => {
  const { teacherId, workHours, hourlyRate, method, year } = req.body;

  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
console.log('year', year)
    const salaryIds = [];

    for (let month = 0; month < 12; month++) {
      const monthDate = new Date(Date.UTC(year, month, 1));
      const existingSalary = await Salary.findOne({
        teacherId,
        month: { $gte: monthDate, $lt: new Date(Date.UTC(year, month + 1, 1)) }  // This checks only for that specific month
      });

      if (existingSalary) {
        console.log(`Salary for ${monthDate.toISOString().slice(0, 7)} already exists, skipping...`);
        continue; // Skip to the next month if salary already exists
      }


      const salary = new Salary({
        teacherId,
        hourlyRate,
        workHours,
        method,
        month: monthDate,
        paid: false
      });

      const savedSalary = await salary.save();
      salaryIds.push(savedSalary._id);
    }

    teacher.salaryInfo.salaries = teacher.salaryInfo.salaries.concat(
        salaryIds.map((id) => ({ salaryId: id }))
    );

    teacher.salaryInfo.hourlyRate = hourlyRate;
    teacher.salaryInfo.workHours = workHours;

    await teacher.save();
    const populatedSalaries = await Teacher.findById(teacherId)
        .select('salaryInfo.salaries')
        .populate('salaryInfo.salaries.salaryId');
    res.status(201).json({ message: 'Salaries created successfully', salaries: populatedSalaries });
  } catch (error) {
    console.error('Error creating salaries:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const updateSalaries = async (req, res) => {
  const { teacherId, editedSalaries } = req.body;

  if (!teacherId || !Array.isArray(editedSalaries)) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    for (const salary of editedSalaries) {
      const { _id, hourlyRate, workHours, ...rest } = salary;

      // Calculate the method based on hourlyRate and workHours
      const amount = hourlyRate * workHours;

      const updates = {
        ...rest,
        hourlyRate,
        workHours,
        amount,
      };

      await Salary.findByIdAndUpdate(_id, { $set: updates }, { new: true });
    }
    const populatedSalary = await Teacher.findById(teacherId)
        .select('salaryInfo.salaries')
        .populate({
          path: 'salaryInfo.salaries.salaryId',
          select: 'hourlyRate workHours amount method paymentDate paid'
        });

    return res.status(200).json({ message: 'Salaries updated successfully', salaries: populatedSalary, });
  } catch (error) {
    console.error('Error updating salaries:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteSalary = async (req, res) => {
  const { teacherId, salaryId } = req.params;

  try {
    const deletedSalary = await Salary.findByIdAndDelete(salaryId);

    if (!deletedSalary) {
      return res.status(404).json({ message: 'Salary not found', salaryId });
    }

    const teacher = await Teacher.findByIdAndUpdate(
        teacherId,
        { $pull: { 'salaryInfo.salaries': { salaryId } } },
        { new: true }
    );

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Salary deleted successfully' });
  } catch (error) {
    console.error('Error deleting salary:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const addTeacherSalary = async (req, res) => {
  const { teacherId, workHours, hourlyRate, method, month } = req.body;

  try {
    // Find the teacher by ID
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    const existingSalary = await Salary.findOne({ teacherId, month });
    if (existingSalary) {
      return res.status(400).json({ message: 'Le salaire pour ce mois existe déjà' });
    }

    // Create the salary document
    const salary = new Salary({
      teacherId,
      hourlyRate,
      workHours,
      method,
      month: month,
      paid: false
    });


    const savedSalary = await salary.save();
    teacher.salaryInfo.salaries.push({ salaryId: savedSalary._id });
    await teacher.save();

    const populatedSalary = await Teacher.findById(teacherId)
        .select('salaryInfo.salaries')
        .populate({
          path: 'salaryInfo.salaries.salaryId',
          select: 'hourlyRate workHours amount method paymentDate month paid'
        });

    res.status(201).json({ message: 'Salary added successfully', salary: populatedSalary });
  } catch (error) {
    console.error('Error adding salary:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getSalariesByYear = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const teacher = await Teacher.findById(teacherId)
        .populate({
          path: 'salaryInfo.salaries.salaryId',
          select: 'hourlyRate workHours amount method paymentDate month paid'
        });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Extract salaries and sort them by month
    const salaries = teacher.salaryInfo.salaries
        .map(salary => salary.salaryId)
        .sort((a, b) => new Date(a.month) - new Date(b.month));

    // Group salaries by year
    const salariesByYear = salaries.reduce((acc, salary) => {
      const year = new Date(salary.month).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(salary);
      return acc;
    }, {});

    // Find the range of years
    const years = salaries.map(salary => new Date(salary.month).getFullYear());
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    // Include all years in the range, even if they have no salaries
    for (let year = minYear; year <= maxYear; year++) {
      if (!salariesByYear[year]) {
        salariesByYear[year] = [];
      }
    }

    res.status(200).json(salariesByYear);
  } catch (error) {
    console.error('Error fetching salaries by year:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  createSalariesForYear,
  updateSalaries,
  deleteSalary,
  addTeacherSalary,
  getSalariesByYear
};
