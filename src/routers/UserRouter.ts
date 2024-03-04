import express from 'express';
import ManagerController from '../controllers/ManagerController';
const router = express.Router();
//========================================================
// Controllers
//========================================================
const managerController = new ManagerController();

//========================================================
// Routes
//========================================================
router.put('/login', managerController.userLogin);
router.put('/logout', managerController.userLogout);
router.get('/profile');
router.post('/register');
export default router;
