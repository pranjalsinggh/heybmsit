const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);

function sendMessage() {
    const userMessage = userInput.value;
    displayMessage(userMessage, "user");

    fetchResponseFromAI(userMessage)
        .then(response => displayMessage(response, "ai"))
        .catch(error => console.error(error));

    userInput.value = "";
}

function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function fetchResponseFromAI(userMessage) {
    // Replace with your actual OpenAI API call using GPT-3
    // Example code for educational purposes only
    const apiKey = "YOUR_OPENAI_API_KEY";
    const prompt = userMessage;

    return fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 50
        })
    })
    .then(response => response.json())
    .then(data => data.choices[0].text)
    .catch(error => console.error(error));
}