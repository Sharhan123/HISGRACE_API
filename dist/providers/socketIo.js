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
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = require("../infrastructure/config/app");
let users = [];
const server = http_1.default.createServer((0, app_1.createServer)());
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*'
    }
});
const addUser = (id, socketId) => {
    const existingUserIndex = users.find(user => user.id === id);
    if (existingUserIndex) {
        existingUserIndex.socketId = socketId;
    }
    else {
        users.push({ id, socketId });
    }
};
const findUserSocketId = (id) => {
    const user = users.find(user => user.id === id);
    return user ? user.socketId : null;
};
io.on('connection', (socket) => {
    const id = findUserSocketId('admin');
    if (id) {
        const data = users.map((item) => item.id);
        socket.to(id).emit('admin-onlines', data);
    }
    console.log('A user connected:', users);
    socket.on('user_connect', (userId) => {
        addUser(userId, socket.id);
        const id = findUserSocketId('admin');
        if (id) {
            const data = users.map((item) => item.id);
            socket.to(id).emit('admin-onlines', data);
        }
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        const index = users.findIndex(user => user.socketId === socket.id);
        if (index !== -1) {
            users.splice(index, 1);
        }
        const id = findUserSocketId('admin');
        if (id) {
            const data = users.map((item) => item.id);
            socket.to(id).emit('admin-onlines', data);
        }
    });
    socket.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log('Received message:', data);
        const { sender, reciever, message } = data;
        const recipientSocketId = findUserSocketId('admin');
        const senderId = findUserSocketId(sender);
        if (recipientSocketId && senderId) {
            socket.to(recipientSocketId).emit('update_count', { id: sender });
            socket.to(recipientSocketId).emit('admin-recive', data);
            socket.to(senderId).emit('from_admin', data);
        }
        //   if (recipientSocketId) {
        //   }
    }));
    socket.on('online', () => {
        const recipientSocketId = findUserSocketId('admin');
        if (recipientSocketId) {
            const data = users.map((item) => item.id);
            socket.to(recipientSocketId).emit('admin-onlines', data);
        }
    });
    socket.on('admin_message', (data) => {
        // console.log('Admin sent message:', data); 
        const { reciever, content, sender } = data;
        const recipientSocketId = findUserSocketId(reciever);
        const senderId = findUserSocketId('admin');
        // console.log(senderId,'idfrom');
        if (recipientSocketId && senderId) {
            // console.log('hiii',data);
            socket.to(recipientSocketId).emit('from_admin', data);
            socket.to(senderId).emit('admin-recive', data);
        }
    });
});
exports.default = server;
