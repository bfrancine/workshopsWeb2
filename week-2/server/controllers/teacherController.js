const Teacher = require("../models/teacherModel");

/**
 * Creates a teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherCreate = (req, res) => {
  let teacher = new Teacher();

  teacher.first_name = req.body.first_name;
  teacher.last_name = req.body.last_name;
  teacher.age = req.body.age;
  teacher.cedula = req.body.cedula;

  if (teacher.first_name && teacher.last_name) {
    teacher.save()
      .then(() => {
        res.status(201); // CREATED
        res.header({
          'location': `/teachers/?id=${teacher.id}`
        });
        res.json(teacher);
      })
      .catch((err) => {
        res.status(422);
        console.log('error while saving the teacher', err);
        res.json({
          error: 'There was an error saving the teacher'
        });
      });
  } else {
    res.status(422);
    console.log('error while saving the teacher')
    res.json({
      error: 'No valid data provided for teacher'
    });
  }
};

/**
 * Get all teachers
 *
 * @param {*} req
 * @param {*} res
 */
const teacherGet = (req, res) => {
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id)
      .then(teacher => {
        if(teacher) {
          res.json(teacher);
        } else {
          res.status(404);
          res.json({ error: "Teacher doesn't exist" });
        }
      })
      .catch((err) => {
        res.status(500);
        console.log('error while querying the teacher', err);
        res.json({ error: "There was an error" });
      });
  } else {
    Teacher.find()
      .then(teachers => {
        res.json(teachers);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};

const teacherPut = (req, res) => {
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id)
      .then(teacher => {
        if (!teacher) {
          res.status(404);
          return res.json({ error: "Teacher doesn't exist" });
        }

        // Actualizar los campos si existen en la solicitud
        teacher.first_name = req.body.first_name || teacher.first_name;
        teacher.last_name = req.body.last_name || teacher.last_name;
        teacher.age = req.body.age || teacher.age;
        teacher.cedula = req.body.cedula || teacher.cedula;

        return teacher.save();
      })
      .then(updatedTeacher => {
        res.json(updatedTeacher);
      })
      .catch(err => {
        res.status(422);
        console.log("Error while updating the teacher", err);
        res.json({ error: "There was an error updating the teacher" });
      });
  } else {
    res.status(400);
    res.json({ error: "No teacher ID provided" });
  }
};

const teacherDelete = (req, res) => {
  if (req.query && req.query.id) {
    Teacher.findByIdAndDelete(req.query.id)
      .then(deletedTeacher => {
        if (!deletedTeacher) {
          res.status(404);
          return res.json({ error: "Teacher doesn't exist" });
        }
        res.status(200);
        res.json({ message: "Teacher deleted successfully" });
      })
      .catch(err => {
        res.status(500);
        console.log("Error while deleting the teacher", err);
        res.json({ error: "There was an error deleting the teacher" });
      });
  } else {
    res.status(400);
    res.json({ error: "No teacher ID provided" });
  }
};

module.exports = {
  teacherCreate,
  teacherGet,
  teacherDelete,
  teacherPut
};
