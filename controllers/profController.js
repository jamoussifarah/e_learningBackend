import express from 'express';
import asyncHandler from 'express-async-handler';
import Prof from '../entities/Prof.js';
import profService from '../services/ProfService.js';

import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const profController = express.Router();



profController.post(
  '/register',
  upload.single('image'),
  asyncHandler(async (req, res) => {
    try {
      req.body.imgSrc = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
      const { id, profession, name } = req.body;

      const prof = new Prof(id, profession, name, req.body.imgSrc);

      const createdProf = await profService.createProf(prof.toObject());

      if (createdProf) {
        res.status(201).json({
          _id: createdProf._id,
          profession: createdProf.profession,
          name: createdProf.name,
          imgSrc: createdProf.imgSrc,
          msg: 'Prof Created Successfully!',
        });
      } else {
        res.status(401).json({ msg: 'Something Went Wrong Invalid Prof Data!' });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

profController.get(
  '/',
  asyncHandler(async (req, res) => {
    const profs = await profService.getAllProfs();
    res.json(profs);
  })
);

profController.get(
  '/:id',
  asyncHandler(async (req, res) => {
    try {
      const prof = await profService.getProfById(req.params.id);
      if (prof) {
        res.json(prof);
      } else {
        res.status(404).json({ message: 'Prof Not Found' });
      }
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);


export default profController;
