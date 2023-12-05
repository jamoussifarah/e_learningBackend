import mongoose from 'mongoose';

const avisSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant',
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

const avisModel = mongoose.model('Avis', avisSchema);

export default avisModel;
