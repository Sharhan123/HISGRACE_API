import { createServer } from './infrastructure/config/app';
import { mongoConnect } from './infrastructure/config/db';
import http from 'http'
const PORT = process.env.PORT || 3000

const app = createServer()
mongoConnect().then(()=>{
    if(app){ 
        const server = http.createServer(app)
        server.listen(PORT,()=>console.log(`Server Connected ${PORT}`)
        )
    }else{
        throw new Error('app is undefined')
    }
}).catch(err=>console.log('error while connecting to mongodb\n',err)
)
  