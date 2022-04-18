const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');

app.use(express.static('build'));
app.use=(cors());




app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,'index.html'))
})
const server = http.createServer(app);

const ioTest = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    } 
})

ioTest.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('join_room', (data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);


    })
    socket.on('send_message', (data)=>{
        // console.log(data);
        socket.to(data.room).emit('receive_message', data);
    })

    socket.on('disconnect', () =>{
        console.log('user disconnected!');

    });

});



app.listen(process.env.PORT || 5000, ()=>{
    console.log('connecting to port 5000');
})
server.listen(3001, ()=>{
    console.log("serverrrrr is running");

})

if(process.env.NODE_ENV==='production'){
    app.use(express.static("clientside/build"));
    const path=require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'clientside','build','index.html'));
    })
}