import ParticipantModel from '../models/participantModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class ProfService {
  // Récupérer tous les professeurs
  async getAllProfs() {
    try {
      const profs = await ParticipantModel.find();
      return profs;
    } catch (error) {
      console.error('Erreur lors de la récupération des professeurs:', error);
      throw error;
    }
  }

  // Récupérer un professeur par ID
  async getProfById(profId) {
    try {
      const prof = await ParticipantModel.findById(profId);
      return prof;
    } catch (error) {
      console.error('Erreur lors de la récupération du professeur par ID:', error);
      throw error;
    }
  }
   async register(userData)  {
    try {
      // Vérifiez si l'utilisateur existe déjà
      const existingUser = await ParticipantModel.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('Cet email est déjà utilisé.');
      }

      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Création du participant
      const newParticipant = new ParticipantModel({
        email: userData.email,
        password: hashedPassword,
        name:userData.name
      });

      await newParticipant.save();

      return newParticipant;
    } catch (error) {
      throw error;
    }
    }
    
   async login(loginData) {
    try {
      const { email, password } = loginData;

      // Recherche du participant par email
      const participant = await ParticipantModel.findOne({ email });

      if (!participant) {
        throw new Error('Email ou mot de passe incorrect.');
      }

      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(password, participant.password);

      if (!isPasswordValid) {
        throw new Error('Email ou mot de passe incorrect.');
      }

      // Création du token JWT
      const token = jwt.sign({ userId: participant._id }, 'votre_clé_secrète', { expiresIn: '1h' });

      return { participant, token };
    } catch (error) {
      throw error;
    }
  }
    
  // Créer un nouveau professeur
  async createProf(partiData) {
    try {
      const newParticipant = new ParticipantModel(partiData);
      const savedPart = await newParticipant.save();
      return savedPart;
    } catch (error) {
      console.error('Erreur lors de la création du participant:', error);
      throw error;
    }
  }

  // Mettre à jour un professeur par ID
  async updateProfById(profId, updatedProfData) {
    try {
      const updatedProf = await ParticipantModel.findByIdAndUpdate(profId, updatedProfData, {
        new: true,
        runValidators: true,
      });
      return updatedProf;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du professeur par ID:', error);
      throw error;
    }
  }

  // Supprimer un professeur par ID
  async deleteProfById(profId) {
    try {
      const deletedProf = await ParticipantModel.findByIdAndDelete(profId);
      return deletedProf;
    } catch (error) {
      console.error('Erreur lors de la suppression du professeur par ID:', error);
      throw error;
    }
  }
 async  deleteParticipantByName(partiName) {
  try {
    const deletedParticipant = await ParticipantModel.findOneAndDelete({ name: partiName });
    return deletedParticipant;
  } catch (error) {
    console.error('Erreur lors de la suppression du participant par nom:', error);
    throw error;
  }
}

}


export default new ProfService();
