import { Router } from 'express';
import { createPlayer, getPlayers, getPlayerById, updatePlayer, deletePlayer } from '../controllers/playerController.js';

const router = Router();

router.post('', createPlayer);
router.get('', getPlayers);
router.get('/:id', getPlayerById)
router.patch('/:id', updatePlayer);
router.delete('/:id', deletePlayer);

export default router;
