import express from 'express';
import ParticipantService from '../services/ParticipantService.js';

const router = express.Router();
router.use(express.json());

// Récupérer tous les professeurs
router.get('/', async (req, res) => {
  try {
    const profs = await ParticipantService.getAllProfs();
    res.json(profs);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des professeurs.' });
  }
});

// Récupérer un professeur par ID
router.get('/:id', async (req, res) => {
  const profId = req.params.id;
  try {
    const prof = await ParticipantService.getProfById(profId);
    if (!prof) {
      return res.status(404).json({ error: 'Professeur non trouvé.' });
    }
    res.json(prof);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du professeur.' });
  }
});


// Créer un nouveau professeur
router.post('/', async (req, res) => {
    const partiData = req.body;
    console.log(partiData);
  try {
    const newParti = await ParticipantService.createProf(partiData);
    res.status(201).json(newParti);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du participant.' });
  }
});

// Mettre à jour un professeur par ID
router.put('/:id', async (req, res) => {
  const profId = req.params.id;
  const updatedProfData = req.body;
  try {
    const updatedProf = await ParticipantService.updateProfById(profId, updatedProfData);
    if (!updatedProf) {
      return res.status(404).json({ error: 'Professeur non trouvé.' });
    }
    res.json(updatedProf);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du professeur.' });
  }
});



router.delete('/:id', async (req, res) => {
  const partiName = req.params.id;
  try {
    const deletedParti = await ParticipantService.deleteProfById(partiName);
    console.log("jhuhuh")
    if (!deletedProf) {
      return res.status(404).json({ error: 'Participant non trouvé.' });
    }
    res.json(deletedParti);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du participant.' });
  }
});
router.delete('/nom/:name', async (req, res) => {
  const partiName = req.params.name;
  try {
    const deletedParti = await ParticipantService.deleteParticipantByName(partiName);
    console.log("jhuhuh")
    if (!deletedParti) {
      return res.status(404).json({ error: 'Participant non trouvé.' });
    }
    res.json(deletedParti);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erreur lors de la suppression du participant.' });
  }
});


router.post('/register', async (req, res) => {
  try {
    const newParticipant = await ParticipantService.register(req.body);
    res.status(201).json(newParticipant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const loginResult = await ParticipantService.login(req.body);
    res.status(200).json(loginResult);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
