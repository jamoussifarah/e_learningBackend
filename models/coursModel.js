import mongoose from 'mongoose';

const coursSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  heading: {
    type: String,
    required: true,
    validate: {
      validator: /^[a-zA-Z\s]+$/,
      message: props => `${props.value} n'est pas un titre valide!`
    }
  },
  heading2: {
    type: String,
    required: true,
    validate: {
      validator: /^[a-zA-Z\s]+$/,
      message: props => `${props.value} n'est pas un deuxième titre valide!`
    }
  },
  imgSrc: {
    type: String,
    required: true,
    validate: {
      validator: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
      message: props => `${props.value} n'est pas une URL d'image valide!`
    }
  },
  name: {
    type: String,
    required: true,
    validate: {
      validator: /^[a-zA-Z\s]+$/,
      message: props => `${props.value} n'est pas un nom valide!`
    }
  },
  students: { type: Number, required: true },
  classes: { type: Number, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'Professeur' },
  isLocked: { type: Boolean, default: false },
  lockReason: { type: String, default: null },
});

const CoursModel = mongoose.model('Cours', coursSchema);

export default CoursModel;
