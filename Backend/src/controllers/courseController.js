const Course = require('../models/course');

// Add a new course
const addCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).send(course);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).send(courses);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a course by name
const updateCourseById = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    try {
        const course = await Course.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!course) {
            return res.status(404).send();
        }

        res.status(200).send(course);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get a course by name
const getCourseById = async (req, res) => {
    const id = req.params.id;

    try {
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).send();
        }

        res.status(200).send(course);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a course by name
const deleteCourseById = async (req, res) => {
    const id = req.params.id;

    try {
        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            return res.status(404).send();
        }

        res.status(200).send(course);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    addCourse,
    getAllCourses,
    updateCourseById,
    getCourseById,
    deleteCourseById
};
