// ai-assistant.js
(() => {
  const chatLog = document.getElementById('chat-log');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  const responses = {
    'how do i contact you': "You can reach us anytime via the Contact page or email us at support@fixproadk.com.",
    'what are your prices': "Our prices vary by device and issue, but we offer free diagnostics and transparent quotes before repair.",
    'why should i choose you': "FixProADK provides expert repairs with fast turnaround, secure shipping, and excellent customer service.",
    'default': "I'm here to help! Can you please rephrase or ask something else?",
  };

  const inappropriateWords = ['stupid', 'idiot', 'dumb', 'hate', 'sucks', 'fool', 'jerk'];

  function sanitize(input) {
    return input.trim().toLowerCase();
  }

  function containsInappropriate(text) {
    return inappropriateWords.some(word => text.includes(word));
  }

  function addMessage(text, sender = 'bot') {
    const p = document.createElement('p');
    p.textContent = text;
    p.className = sender;
    chatLog.appendChild(p);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function getResponse(input) {
    if (containsInappropriate(input)) {
      return "Let's keep it respectful, please.";
    }
    for (const key in responses) {
      if (input.includes(key)) {
        return responses[key];
      }
    }
    return responses['default'];
  }

  function handleSend() {
    let input = sanitize(chatInput.value);
    if (!input) return;
    addMessage(`You: ${chatInput.value}`, 'user');
    chatInput.value = '';
    const reply = getResponse(input);
    setTimeout(() => addMessage(`FixProADK: ${reply}`, 'bot'), 600);
  }

  chatSend.addEventListener('click', handleSend);
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  });
})();
