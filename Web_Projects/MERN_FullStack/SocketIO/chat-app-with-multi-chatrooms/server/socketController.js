// Dependencies (these could be passed in as needed)
const chatHistory = {
    Room1: [],
    Room2: [],
    Room3: [],
    Room4: []
};

const usersInRooms = {
    Room1: [],
    Room2: [],
    Room3: [],
    Room4: []
};

const socketController = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');
    
        socket.on('joinRoom', ({ name, room }) => {
            socket.join(room);
            socket.username = name;
            socket.currentRoom = room;
            
             // Add user to active users list
            usersInRooms[room].push(name);
            // ! Send updated user list to everyone in the room
            io.to(room).emit('roomUsers', usersInRooms[room]);
    
            // ! Send the chat history to the user when they join
            socket.emit('chatHistory', chatHistory[room]);
            
             // Notify the user they have joined the room
             socket.emit('message', { user: 'admin', text: `Welcome to ${room}, ${name}!` });
    
            // Broadcast to all other users in the room
            socket.broadcast.to(room).emit('message', { user: 'admin', text: `${name} has joined ${room}!` });
        });
    
        socket.on('sendMessage', (message) => {
            const msgObject = { user: socket.username, text: message };
            
            // !Store the message in the chat history
            chatHistory[socket.currentRoom].push(msgObject);
            
            // Broadcast the message to everyone in the room
            io.to(socket.currentRoom).emit('message', msgObject);
        });
    
        socket.on('disconnect', () => {
            if (socket.currentRoom) {
                const room = socket.currentRoom;
                // Remove user from active users list
                usersInRooms[room] = usersInRooms[room].filter(user => user !== socket.username);
        
                // Send updated user list to everyone in the room
                io.to(room).emit('roomUsers', usersInRooms[room]);
        
                io.to(room).emit('message', { user: 'admin', text: `${socket.username} has left.` });
            }
            console.log(`Client ${socket.username} disconnected!`);
        });
    });
};

module.exports = socketController;
