const brokerUrl = 'wss://broker.hivemq.com:443/mqtt';
let clientId = 'mqtt-chat-client';
const topic = '389e4854-2df0-4e3b-8cc4-59daa7933a05';

// Prompt the user for their name
const username = prompt('Enter your username:');
if (!username) {
  alert('Username cannot be empty. Please refresh the page and enter a valid username.');
}

clientId += username;

const client = mqtt.connect(brokerUrl, { clientId });

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe(topic);
});

client.on('message', (receivedTopic, messageArrayBuffer) => {
  const chatBox = document.getElementById('chat-box');
  const message = new TextDecoder().decode(new Uint8Array(messageArrayBuffer));
  const [senderUsername, actualMessage] = message.split(': ');

  // Display messages only from other users
  if (senderUsername !== username) {
    chatBox.innerHTML += `<div><strong>${senderUsername}:</strong> ${actualMessage}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});

function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;

  if (message.trim() !== '') {
    // Publish the message with the username
    console.log(topic);
    client.publish(topic, `${username}: ${message}`);
    messageInput.value = '';

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div><strong>${username}:</strong> ${message}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}