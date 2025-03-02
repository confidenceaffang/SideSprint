const Message = require('../mongoDB/models/Message');
const User = require('../mongoDB/models/User');

class MessageService {
    constructor(io) {
        this.io = io;
        this.setupSocketHandlers();
    }

    setupSocketHandlers() {
        this.io.on('connection', (socket) => {
            console.log('User connected:', socket.id);

            // Handle joining a chat room
            socket.on('joinChat', async (userId) => {
                socket.join(userId);
                // Send existing messages to the user
                const messages = await this.getUserMessages(userId);
                socket.emit('messages', messages);
            });

            // Handle sending messages
            socket.on('sendMessage', async (messageData) => {
                try {
                    const message = await this.saveMessage(messageData);
                    // Emit to sender and receiver
                    this.io.to(messageData.from).emit('newMessage', message);
                    this.io.to(messageData.to).emit('newMessage', message);
                } catch (error) {
                    console.error('Error sending message:', error);
                    socket.emit('messageError', { error: 'Failed to send message' });
                }
            });

            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });
        });
    }

    async saveMessage(messageData) {
        const message = new Message({
            from: messageData.from,
            to: messageData.to,
            text: messageData.text,
            timestamp: new Date()
        });
        await message.save();
        return message;
    }

    async getUserMessages(userId) {
        return await Message.find({
            $or: [{ from: userId }, { to: userId }]
        }).sort({ timestamp: 1 });
    }

    async getConversation(user1Id, user2Id) {
        return await Message.find({
            $or: [
                { from: user1Id, to: user2Id },
                { from: user2Id, to: user1Id }
            ]
        }).sort({ timestamp: 1 });
    }
}

module.exports = MessageService;