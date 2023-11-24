import mongoose from "mongoose";

const profSchema = new mongoose.Schema({
  profession: { type: String, required: true },
  name: { type: String, required: true },
  imgSrc: { type: String, required: true },
});

const ProfModel = mongoose.model('Prof', profSchema);

export default ProfModel;