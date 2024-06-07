import { createServer } from './infrastructure/config/app';
import { mongoConnect } from './infrastructure/config/db';
import {Server, Socket, Server as socketIo} from "socket.io"
// import http from 'http'
import server from './providers/socketIo';
const PORT = process.env.PORT || 4000
const app = createServer()
mongoConnect().then(()=>{
    if(server){ 
        // const server = http.createServer(app)
       
        server.listen(PORT,()=>console.log(`Server Connected ${PORT}`)
        )
    }else{
        throw new Error('app is undefined')
    }
}).catch(err=>console.log('error while connecting to mongodb\n',err)
)
  