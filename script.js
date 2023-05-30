// script.js
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');

userInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const userMessage = userInput.value;
        displayMessage('user', userMessage);
        userInput.value = '';

        const response = await sendMessage(userMessage);
        displayMessage('chatbot', response);
    }
});

async function sendMessage(message) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    });
    return response.json();
}

function displayMessage(role, content) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(role);
    messageElement.innerText = content;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
