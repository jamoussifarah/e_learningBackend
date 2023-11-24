import mongoose from 'mongoose';

const coursSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  heading: { type: String, required: true },
  heading2: { type: String, required: true },
  imgSrc: { type: String, required: true },
  name: { type: String, required: true },
  students: { type: Number, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'Professeur' }, // Reference to the Professeur entity
});

const CoursModel = mongoose.model('Cours', coursSchema);

export default CoursModel;
