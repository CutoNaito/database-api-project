import { Router } from 'express';
import { create, readAll, readById, update, remove } from '../controllers/FeedbackController';

const router = Router();

router.route('/').post(create).get(readAll);
router.route('/:id').get(readById).put(update).delete(remove);

export default router;