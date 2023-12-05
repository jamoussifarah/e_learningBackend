import express from 'express';
import AvisService from '../services/AvisService.js';

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const avisList = await AvisService.getAvis();
    res.json(avisList);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des avis.' });
  }
});

router.post('/', async (req, res) => {
  const avisData = req.body;
  try {
    const newAvis = await AvisService.createAvis(avisData.comment, avisData.participantId);
    res.status(201).json(newAvis);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'avis.' });
  }
});

export default router;
