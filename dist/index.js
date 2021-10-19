"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
server.get('/', (req, res) => {
    return res.send({
        status: 200,
        message: [
            'oi belezura :P',
            'FAAAALA MALUCO'
        ]
    });
});
server.listen(3333, () => {
    console.log('cabess');
});
