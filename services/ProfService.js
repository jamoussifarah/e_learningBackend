import ProfModel from '../models/profModel.js';

class ProfService {
  async createProf(profData) {
    try {
      const createdProf = await ProfModel.create(profData);
      return createdProf;
    } catch (error) {
      throw new Error(`Error creating prof: ${error.message}`);
    }
  }

  async getAllProfs() {
    try {
      const profs = await ProfModel.find();
      return profs;
    } catch (error) {
      throw new Error(`Error getting all profs: ${error.message}`);
    }
  }

  async getProfById(id) {
    try {
      const prof = await ProfModel.findById(id);
      return prof;
    } catch (error) {
      throw new Error(`Error getting prof by ID: ${error.message}`);
    }
  }

  async updateProf(id, updateData) {
    try {
      const updatedProf = await ProfModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      return updatedProf;
    } catch (error) {
      throw new Error(`Error updating prof: ${error.message}`);
    }
  }

  async deleteProf(id) {
    try {
      const deletedProf = await ProfModel.findByIdAndDelete(id);
      return deletedProf;
    } catch (error) {
      throw new Error(`Error deleting prof: ${error.message}`);
    }
  }


}

export default new ProfService();
