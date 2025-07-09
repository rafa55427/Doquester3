const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const btnE = document.getElementById('btn-equester');
const btnD = document.getElementById('btn-desqueter');
let mode = 'equester';

btnE.onclick = () => switchMode('equester');
btnD.onclick = () => switchMode('desqueter');

function switchMode(m) {
  mode = m;
  btnE.classList.toggle('active', mode === 'equester');
  btnD.classList.toggle('active', mode === 'desqueter');
}

document.getElementById('send-btn').onclick = async () => {
  const msg = userInput.value.trim();
  if (!msg) return;
  appendMessage('Você', msg);
  userInput.value = '';
  const response = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: msg, mode })
  });
  const data = await response.json();
  appendMessage(mode.toUpperCase(), data.reply);
};

function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

document.getElementById('save-btn').onclick = () => {
  const blob = new Blob([chatContainer.innerHTML], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'conversa.html';
  a.click();
};

document.getElementById('clear-btn').onclick = () => {
  chatContainer.innerHTML = '';
};

document.getElementById('export-btn').onclick = () => {
  const text = chatContainer.innerText;
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'chat.txt';
  a.click();
};