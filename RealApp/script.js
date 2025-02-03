// script.js
document.addEventListener('DOMContentLoaded', function() {
    const chatItems = document.querySelectorAll('.chat-item');
    const chatWindow = document.querySelector('.chat-window');
    const chatTitle = document.querySelector('.chat-title');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');

    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            const name = this.querySelector('.chat-name').textContent;
            chatTitle.textContent = name;
            chatMessages.innerHTML = ''; // Clear previous messages
            // Simulate loading messages
            chatMessages.innerHTML = `
                <div class="message received">Hey, how are you?</div>
                <div class="message sent">I'm good, thanks!</div>
            `;
        });
    });

    sendButton.addEventListener('click', function() {
        const messageText = chatInput.value.trim();
        if (messageText) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'sent');
            messageElement.textContent = messageText;
            chatMessages.appendChild(messageElement);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
        }
    });

    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
});