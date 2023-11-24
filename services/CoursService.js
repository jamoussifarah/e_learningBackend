import CoursModel from '../models/coursModel.js';

class CoursService {
  async createCours(coursData) {
    try {
      const createdCours = await CoursModel.create(coursData);
      return createdCours;
    } catch (error) {
      throw new Error(`Error creating cours: ${error.message}`);
    }
  }

  async getAllCourses() {
    try {
      const courses = await CoursModel.find();
      return courses;
    } catch (error) {
      throw new Error(`Error getting all courses: ${error.message}`);
    }
  }

  async getCoursById(id) {
    try {
      const cours = await CoursModel.findById(id);
      return cours;
    } catch (error) {
      throw new Error(`Error getting cours by ID: ${error.message}`);
    }
  }

  async updateCours(id, updateData) {
    try {
      const updatedCours = await CoursModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      return updatedCours;
    } catch (error) {
      throw new Error(`Error updating cours: ${error.message}`);
    }
  }

  async deleteCours(id) {
    try {
      const deletedCours = await CoursModel.findByIdAndDelete(id);
      return deletedCours;
    } catch (error) {
      throw new Error(`Error deleting cours: ${error.message}`);
    }
  }

}

export default new CoursService();
