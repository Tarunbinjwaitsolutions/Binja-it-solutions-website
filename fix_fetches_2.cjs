const fs = require('fs');

function processFile(path, replaceFn) {
    let content = fs.readFileSync(path, 'utf8');
    content = replaceFn(content);
    fs.writeFileSync(path, content);
    console.log('Fixed ' + path);
}

// 5. ApplyModal.jsx
processFile('components/ui/ApplyModal.jsx', (c) => {
    c = c.replace('import { X, Upload, CheckCircle2 } from \"lucide-react\";', 'import { X, Upload, CheckCircle2 } from \"lucide-react\";\nimport { applyForJob } from \"@/lib/api/jobs\";');
    c = c.replace(/const response = await fetch\([\s\S]*?body: formData,\s*\}\);\s*if \(!response\.ok\) \{\s*const errorData = await response\.json\(\)\.catch\(\(\) => \(\{\}\)\);\s*throw new Error\(errorData\.message \|\| "Failed to submit application"\);\s*\}/, 'await applyForJob(formData);');
    return c;
});

// 6. VoiceBotWidget.jsx
processFile('components/Chatbot/VoiceBotWidget.jsx', (c) => {
    c = c.replace('import { Mic, Phone, X, Volume2, Maximize2, Minimize2 } from \"lucide-react\";', 'import { Mic, Phone, X, Volume2, Maximize2, Minimize2 } from \"lucide-react\";\nimport { sendVoiceChatMessage } from \"@/lib/api/chat\";');
    c = c.replace(/const res = await fetch\(`\$\{HTTP_API_URL\}\/chat`, \{\s*method: 'POST',\s*headers: \{\s*'Content-Type': 'application\/json',\s*\},\s*body: JSON\.stringify\(\{\s*messages: newMessages,\s*config: \{\s*speaker: 'alloy',\s*speed: 1\.0,\s*emotion: 'neutral'\s*\}\s*\}\),\s*\}\);\s*if \(!res\.ok\) throw new Error\(`API Error: \$\{res\.status\}`\);\s*const data = await res\.json\(\);/, 'const data = await sendVoiceChatMessage(newMessages, { speaker: "alloy", speed: 1.0, emotion: "neutral" });');
    return c;
});

// 7. ChatbotWidget.jsx
processFile('components/Chatbot/ChatbotWidget.jsx', (c) => {
    c = c.replace('import { MessageSquare, X, Send, User, Bot, Maximize2, Minimize2 } from \"lucide-react\";', 'import { MessageSquare, X, Send, User, Bot, Maximize2, Minimize2 } from \"lucide-react\";\nimport { sendChatMessage } from \"@/lib/api/chat\";');
    c = c.replace(/const res = await fetch\(`\$\{CHATBOT_API\}\/chat`, \{\s*method: 'POST',\s*headers: \{\s*'Content-Type': 'application\/json',\s*\},\s*body: JSON\.stringify\(\{ messages: newMessages \}\),\s*\}\);\s*if \(!res\.ok\) throw new Error\('Network response was not ok'\);\s*const data = await res\.json\(\);/, 'const data = await sendChatMessage(newMessages);');
    return c;
});
