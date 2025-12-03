const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

async function sendMessage() {
    const userText = userInput.value.trim();
    if (!userText) return;

    addMessage("You", userText);
    userInput.value = "";

    try {
        const response = await fetch("https://free-as-moro-ai.vercel.app/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: userText
            })
        });

        const data = await response.json();
        addMessage("AsmoroAI", data.reply);
    } catch (err) {
        addMessage("AsmoroAI", "⚠️ Server penuh, coba lagi.");
    }
}

function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = "msg";
    msg.innerHTML = `<b>${sender}:</b> ${text}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}
