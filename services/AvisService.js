import avisModel from '../models/avisModel.js';

class AvisService {
 async  createAvis(comment, participantId) {
  try {
    const avis = new avisModel({
      comment,
      participant: participantId,
    });
    const savedAvis = await avis.save();
    return savedAvis;
  } catch (error) {
    throw error;
  }
}

  async getAvis() {
    try {
      const avisList = await avisModel.find().populate('participant');
      return avisList;
    } catch (error) {
      throw error;
    }
  }
}

export default new AvisService();
