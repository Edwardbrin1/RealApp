document.addEventListener('DOMContentLoaded', function() {
    const chatList = document.querySelector('.chat-list');
    const chatWindow = document.querySelector('.chat-window');
    const chatTitle = document.querySelector('.chat-title');
    const chatStatus = document.querySelector('.chat-status');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');

    const socket = io();

    // Sample chat list (replace with dynamic data later)
    const chatListData = [
        { name: 'Edward', lastMessage: 'Hey, how are you?', time: '10:00 AM' },
        { name: 'Brin', lastMessage: 'Can we meet tomorrow?', time: '09:30 AM' },
        // Add more chat items here
    ];

    chatListData.forEach(item => {
        const chatItem = document.createElement('div');
        chatItem.classList.add('chat-item');
        chatItem.innerHTML = `
            <div class="avatar">${item.name.charAt(0)}</div>
            <div class="chat-info">
                <div class="chat-name">${item.name}</div>
                <div class="last-message">${item.lastMessage}</div>
            </div>
            <div class="chat-time">${item.time}</div>
        `;
        chatList.appendChild(chatItem);

        chatItem.addEventListener('click', function() {
            const name = this.querySelector('.chat-name').textContent;
            chatTitle.textContent = name;
            chatStatus.textContent = 'Online'; // Update status as needed
            chatMessages.innerHTML = ''; // Clear previous messages
        });
    });

    sendButton.addEventListener('click', function() {
        const messageText = chatInput.value.trim();
        if (messageText) {
            socket.emit('chat message', messageText);
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'sent');
            messageElement.textContent = messageText;
            chatMessages.appendChild(messageElement);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    socket.on('chat message', (msg) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'received');
        messageElement.textContent = msg;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
});