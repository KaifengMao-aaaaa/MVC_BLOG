"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_config_1 = __importDefault(require("./config/express.config"));
const UserRouter_1 = __importDefault(require("./routers/UserRouter"));
const app = (0, express_1.default)();
// ===================================================================
// subRouters
// ===================================================================
app.use('/user', UserRouter_1.default);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Hello World!');
}));
app.listen(express_config_1.default.PORT, () => {
    console.log(`Example app listening at http://${express_config_1.default.HOST}:${express_config_1.default.PORT}`);
});
