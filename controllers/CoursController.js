import express from 'express';
import asyncHandler from 'express-async-handler';
import CoursService from '../services/CoursService.js';
import CoursModel from '../models/coursModel.js';

const coursController = express.Router();

coursController.post(
  '/create',
  asyncHandler(async (req, res) => {
    try {
      const { id, heading, heading2, imgSrc, name, students, price, rating, professeurId } = req.body;

      const professeur = await ProfesseurModel.findById(professeurId);
      if (!professeur) {
        return res.status(404).json({ msg: 'Professeur not found' });
      }

      const coursData = new CoursModel({
        id,
        heading,
        heading2,
        imgSrc,
        name,
        students,
        price,
        rating,
        professeur: professeur._id,
      });

      const createdCours = await CoursService.createCours(coursData.toObject());

      if (createdCours) {
        res.status(201).json({
          _id: createdCours._id,
          id: createdCours.id,
          heading: createdCours.heading,
          heading2: createdCours.heading2,
          imgSrc: createdCours.imgSrc,
          name: createdCours.name,
          students: createdCours.students,
          price: createdCours.price,
          rating: createdCours.rating,
          professeur: professeur.toObject(),
          msg: 'Cours Created Successfully!',
        });
      } else {
        res.status(401).json({ msg: 'Something Went Wrong Invalid Cours Data!' });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

coursController.get(
  '/',
  asyncHandler(async (req, res) => {
    const courses = await CoursService.getAllCourses();
    res.json(courses);
  })
);

coursController.get(
  '/:id',
  asyncHandler(async (req, res) => {
    try {
      const cours = await CoursService.getCoursById(req.params.id);
      if (cours) {
        res.json(cours);
      } else {
        res.status(404).json({ message: 'Cours Not Found' });
      }
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

coursController.put(
  '/:id',
  asyncHandler(async (req, res) => {
    try {
      const { heading, heading2, imgSrc, name, students, price, rating } = req.body;

      const updateData = {
        heading,
        heading2,
        imgSrc,
        name,
        students,
        price,
        rating,
      };

      const updatedCours = await CoursService.updateCours(req.params.id, updateData);

      if (updatedCours) {
        res.json({
          _id: updatedCours._id,
          id: updatedCours.id,
          heading: updatedCours.heading,
          heading2: updatedCours.heading2,
          imgSrc: updatedCours.imgSrc,
          name: updatedCours.name,
          students: updatedCours.students,
          price: updatedCours.price,
          rating: updatedCours.rating,
          message: 'Cours Updated Successfully!',
        });
      } else {
        res.status(404).json({ message: 'Cours Not Found' });
      }
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

coursController.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    try {
      const deletedCours = await CoursService.deleteCours(req.params.id);
      if (deletedCours) {
        res.json({ message: 'Cours Deleted Successfully!' });
      } else {
        res.status(404).json({ message: 'Cours Not Found' });
      }
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

export default coursController;

