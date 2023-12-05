import mongoose from "mongoose";

const profSchema = new mongoose.Schema({
  profession: {
    type: String,
    required: true,
    validate: {
      validator: /^[a-zA-Z\s]+$/,
      message: props => `${props.value} n'est pas une profession valide!`
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
  imgSrc: {
    type: String,
    required: true,
   
  },

  isLocked: {
    type: Boolean,
    default: false,
  },
  lockReason: {
    type: String,
    default: null,
  },
});

const ProfModel = mongoose.model('Prof', profSchema);

export default ProfModel;
