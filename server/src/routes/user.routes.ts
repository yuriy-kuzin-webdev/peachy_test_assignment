import { Router } from 'express';
import { createUser, getUser, updateUser, deleteUser, getAllUsers } from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
