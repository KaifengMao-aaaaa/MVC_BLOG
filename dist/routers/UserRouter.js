"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ManagerController_1 = __importDefault(require("../controllers/ManagerController"));
const router = express_1.default.Router();
//========================================================
// Controllers
//========================================================
const managerController = new ManagerController_1.default();
//========================================================
// Routes
//========================================================
router.put('/login', managerController.userLogin);
router.put('/logout', managerController.userLogout);
router.get('/profile');
router.post('/register');
exports.default = router;
