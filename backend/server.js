// const express = require("express");
// const connectDB = require("./config/db");
// const dotenv = require("dotenv");
// // const { chats } = require("./data/data");
// const userRoutes = require("./routes/userRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const path = require("path");




// dotenv.config();
// // const PORT = process.env.PORT || 5000
// const app = express();
// connectDB();

// app.use(express.json());  //sever ko kahrai jo frontend se jo data receive hora use json form mai lelo
// //iski madath databe kai sath connectivity establish hogyi




// // ab instance bna liya ,ab with the help of this app 
// // we start our own server
// // now we create our first express api

// // app.get("/api/chat", (req, res) => {
// //     res.send(chats);
// // })

// // app.get("/api/chat/:id", (req, res) => {
// //     // console.log(req.params.id);  //to aise karne sai hume id mil jagi,kuki req mai jo object aya usme params hai aur us params mai id hai
// //     const singleChat = chats.find((c) => c._id === req.params.id);
// //     res.send(singleChat);
// // })

// app.use('/api/user', userRoutes);
// app.use('/api/chat', chatRoutes);  //ye bna dia route 
// app.use('/api/message', messageRoutes);  //ye bna dia route 
// //routes kai liye humne ek alg folder bna diya hai

// // -----------------------Deployment-----------------------

// const __dirname1 = path.resolve();
// const resolvedDirectory = path.resolve();
// const fs = require('fs');
// // const path=
// // if (process.env.NODE_ENV === "production") {
// console.log('Resolved Path:', path.join(__dirname1, "/frontend/build"));
// console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log('Build Directory Exists:', fs.existsSync(path.join(__dirname1, "/frontend/build")));

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(resolvedDirectory, "/frontend/build")));

//     app.get("*", (req, res) =>
//         res.sendFile(path.resolve(resolvedDirectory, "frontend", "build", "index.html"))
//     );
// } else {
//     app.get("/", (req, res) => {
//         res.send("API is running..");
//     });
// }

// //----------------------- Deployment-----------------------

// app.use(notFound);     //agr url alg ho to un erro ko handle karne kai liye kar rai
// app.use(errorHandler)

// const PORT = process.env.PORT || 5000

// const server = app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
// const io = require('socket.io')(server, {
//     pingTimeout: 60000,//it means they wait for the time while being inactive,it means it waits for 60 second before go off
//     cors: {
//         origin: "http://localhost:3000",
//     },
// });
// io.on("connection", (socket) => {
//     console.log("connected to socket.io");

//     socket.on('setup', (userData) => {//we are creating a new socket where frontend will send some data and join the room
//         socket.join(userData._id);   //we are creating a new room with id of user data,and that roooooooom is inclusive to that user only..
//         //this thing creates a room for a particular user.
//         socket.emit("connected");
//     });

//     socket.on('join chat', (room) => {
//         //when we click any of the chat,all this creates a new room with that particular user as well as other user,and when other user join it add that user to this room
//         socket.join(room);
//         console.log('User Joined Room: ' + room);
//     })
//     socket.on("typing", (room) => socket.in(room).emit("typing"));
//     socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
//     socket.on("new message", (newMessageRecieved) => {
//         var chat = newMessageRecieved.chat;

//         if (!chat.users) {
//             //means if the chat does not have the users
//             return console.log("chat.users not defined");
//         }
//         //to agr aap grp chat kar rai ho,aur aap message bej 
//         // rahe ho to vo message bakiyo ko jana aapko ko ni
//         //  jajan chaiye,to vo logic lik rai neeche
//         chat.users.forEach(user => {
//             if (user._id == newMessageRecieved.sender._id) return;   //agr aap bej rai aur id aapke equal hai to aapke ko recive na ho

//             socket.in(user._id).emit("message recieved", newMessageRecieved);
//         })
//     })
//     socket.off("setup", () => {
//         console.log("USER DISCONNECTED");
//         socket.leave(userData._id);
//     });
// })

// //22:00 se video dubare deko errorMiddleware vala concept smjne kai liye





const fs = require('fs');
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

const __dirname1 = path.resolve(__dirname, '..'); // Adjust to point to the project root

console.log('Resolved Path:', path.join(__dirname1, "frontend/build"));
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Build Directory Exists:', fs.existsSync(path.join(__dirname1, "frontend/build")));

if (process.env.NODE_ENV === "production" && fs.existsSync(path.join(__dirname1, "frontend/build"))) {
    app.use(express.static(path.join(__dirname1, "frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

// Socket.io configuration
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    console.log("connected to socket.io");

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User Joined Room: ' + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat;

        if (!chat.users) {
            return console.log("chat.users not defined");
        }

        chat.users.forEach(user => {
            if (user._id == newMessageReceived.sender._id) return;
            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});
