const Course = require("../models/course");

const createACourse = async (req, res) => {
  try {
    const { Name, studentId, teacherId } = req.body;
    const newCourse = await new Course({ Name, studentId, teacherId });
    await newCourse.save();
    res.status(201).json({ newCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllCourses = async (req, res) => {
  try {
    const response = await Course.find();
    if (!response) {
      return res.status(404).json({ message: "No Courses Found" });
    }
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Course.find({ _id: id });
    if (!response) {
      return res.status(404).json({ error: "This id doesnt have a question" });
    }
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCourseByTeacherId = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const response = await Course.find({ teacherId: teacherId });
    if (!response) {
      return res
        .status(404)
        .json({ message: "This teacher teaches no courses" });
    }
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkEnrollment = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const isEnrolled = course.studentId.includes(studentId);
    res.status(200).json({ isEnrolled });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    const { studentId } = req.params;

    const allCourses = await Course.find();
    const enrolledCourses = [];

    allCourses.forEach((course) => {
      if (course.studentId.includes(studentId)) {
        enrolledCourses.push({
          courseId: course._id,
          title: course.Name,
        });
      }
    });

    if (enrolledCourses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for the given studentId" });
    }

    res.status(200).json({ courses: enrolledCourses });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const enrollStudentInCourse = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (course.studentId.includes(studentId)) {
      return res
        .status(400)
        .json({ message: "Student is already enrolled in the course" });
    }
    course.studentId.push(studentId);
    await course.save();

    res.status(200).json({ message: "Student enrolled successfully", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const delteACourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const result = await Course.findOneAndDelete({ _id: courseId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ message: "Delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTeacherByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId );
    if (!course) {
      console.log("No course was found");
      return res.status(404).json({ error: "No course was found" });
    }
    const teacherId = course.teacherId;

    return res.status(200).json({ teacherId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllCourses,
  createACourse,
  getCourseById,
  getCourseByTeacherId,
  enrollStudentInCourse,
  checkEnrollment,
  delteACourse,
  getEnrolledCourses,
  getTeacherByCourseId
};
