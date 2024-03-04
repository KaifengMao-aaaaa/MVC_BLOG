import express from 'express';
const router = express.Router();
router.post('/publish');
router.put('/save');
router.delete('/deleteOne');
router.post('/addCategory');
router.post('/uploadImg');
export default router;
