import express from 'express';
import { fetchMenus, addMenu, fetchAllMenus, removeMenu } from '../controllers/menuController';
import upload from '../utils/multerConfig';
import { authenticate, isAdmin } from '../utils/authenticate';

const router = express.Router();

router.get('/', fetchAllMenus);
router.get('/:restaurant_id', fetchMenus);
router.post('/:restaurant_id/menu', authenticate, isAdmin, upload.single('image'), addMenu);
router.delete('/:id', authenticate, isAdmin, removeMenu);

export default router;