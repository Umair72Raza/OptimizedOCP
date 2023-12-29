const io = require ('socket.io')(8800,{
    cors:{
        origin: "http://localhost:5173"
    }
})

let activeUsers = [];
// on is used for receving the data from the other side
io.on("connection",(socket)=>{
    //add new user / resgister a user
    socket.on('new-user-add',(newUserId)=>{
        if(!activeUsers.some((user)=>user.userId===newUserId))
        {
            activeUsers.push({
                userId:newUserId,
                socketId: socket.id
            })
        }
        console.log("Connected Users: ",activeUsers)
        //emit is used to send the data
        io.emit('get-users',activeUsers)
    })

    socket.on('send-message',(data)=>{
        const {receiverId} = data;
        console.log("receiverId", receiverId)
        const foundUser = activeUsers.find((user) => user.userId == receiverId);


        if(foundUser){
            console.log(data)
            io.to(foundUser.socketId).emit("receive-message",data)
        }
    })

    socket.on("disconnect",()=>{
        activeUsers = activeUsers.filter((user)=>user.socketId!==socket.id)
        console.log("User Disconnected   ",activeUsers);
        io.emit('get-users',activeUsers)

    })
})

