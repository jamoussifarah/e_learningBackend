import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: /^\S+@\S+\.\S+$/,
      message: props => `${props.value} n'est pas une adresse e-mail valide!`
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: props => `Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre et un chiffre.`
    }
  },
  name: {
    type: String,
    required: false,
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

const ParticipantModel = mongoose.model('Participant', participantSchema);

export default ParticipantModel;
