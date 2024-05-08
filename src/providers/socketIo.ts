import http from 'http';
import { Server, Socket } from 'socket.io';
import { createServer } from '../infrastructure/config/app';

let users: { id: string, socketId: string }[] = [];
const server = http.createServer(createServer())


  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  });


  const addUser = (id: string, socketId: string) => {
    const existingUserIndex = users.find(user => user.id === id);

    if (existingUserIndex) {
      existingUserIndex.socketId = socketId;
    } else {
      users.push({ id, socketId });
    }
  };

  const findUserSocketId = (id: string) => {
    const user = users.find(user => user.id === id);
    return user ? user.socketId : null;
  }

  io.on('connection', (socket: Socket) => {
    const id = findUserSocketId('admin')
        if(id){
          const data = users.map((item)=>item.id) 
          socket.to(id).emit('admin-onlines',data)
        }
    console.log('A user connected:', users);
    

    socket.on('user_connect', (userId: string) => {
        addUser(userId, socket.id);
        const id = findUserSocketId('admin')
        if(id){
          const data = users.map((item)=>item.id) 
          socket.to(id).emit('admin-onlines',data)
        }
      });
    
    
      socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);

      const index = users.findIndex(user => user.socketId === socket.id);
      if (index !== -1) {
        users.splice(index, 1);
      }
      const id = findUserSocketId('admin')
      if(id){
        const data = users.map((item)=>item.id) 
        socket.to(id).emit('admin-onlines',data)
      }
    });

    socket.on('message', (data) => {
      console.log('Received message:', data);

      const { sender, reciever, message } = data;
      const recipientSocketId = findUserSocketId('admin');
      const senderId = findUserSocketId(sender)
      console.log(senderId,'id');
       
        if(recipientSocketId && senderId){

          socket.to(recipientSocketId).emit('admin-recive', data);
          socket.to(senderId).emit('from_admin', data);
        
        }
      
    //   if (recipientSocketId) {
    //   }
    });

    socket.on('online',()=>{
      const recipientSocketId = findUserSocketId('admin')
      if(recipientSocketId){
        const data = users.map((item)=>item.id) 
        socket.to(recipientSocketId).emit('admin-onlines',data)
      }
    })

    socket.on('admin_message', (data) => {
      console.log('Admin sent message:', data); 

      const { reciever, content ,sender} = data;

      const recipientSocketId = findUserSocketId(reciever);
      const senderId = findUserSocketId('admin')
      console.log(senderId,'idfrom');
      
      if (recipientSocketId && senderId) {
        // console.log('hiii',data);

        socket.to(recipientSocketId).emit('from_admin', data);
        socket.to(senderId).emit('admin-recive', data);
        
      } 
    });

  

  });


  export default server
