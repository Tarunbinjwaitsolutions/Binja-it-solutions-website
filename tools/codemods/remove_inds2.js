import fs from 'fs';

const code = fs.readFileSync('data/industries.js', 'utf8');
const lines = code.split('\n');

const toRemove = ['name: "Legal"', 'name: "Startups"', 'name: "Insurance"', 'name: "Non-Profit / NGOs"', 'name: "Government & Public Sector"'];

let newLines = [];
let i = 0;

while (i < lines.length) {
    let line = lines[i];
    
    // Check if an object is starting
    if (line.trim() === '{' && lines[i+1] && lines[i+1].includes('name:')) {
        let objLines = [];
        let braceCount = 0;
        let shouldRemove = false;
        
        while (i < lines.length) {
            let currentLine = lines[i];
            objLines.push(currentLine);
            
            if (currentLine.includes('{')) braceCount += (currentLine.match(/\{/g) || []).length;
            if (currentLine.includes('}')) braceCount -= (currentLine.match(/\}/g) || []).length;
            
            for (const nameStr of toRemove) {
                if (currentLine.includes(nameStr)) {
                    shouldRemove = true;
                }
            }
            
            i++;
            if (braceCount === 0) {
                break;
            }
        }
        
        if (!shouldRemove) {
            newLines.push(...objLines);
        }
    } else {
        newLines.push(line);
        i++;
    }
}

// Ensure the array closes correctly without trailing commas before ]
let finalCode = newLines.join('\n');
finalCode = finalCode.replace(/,\s*\]/g, '\n]');
fs.writeFileSync('data/industries.js', finalCode);
console.log('Done filtering.');
