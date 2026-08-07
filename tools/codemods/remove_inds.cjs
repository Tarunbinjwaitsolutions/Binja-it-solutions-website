const fs = require('fs');
let code = fs.readFileSync('data/industries.js', 'utf8');
const toRemove = ['Legal', 'Startups', 'Insurance', 'Non-Profit / NGOs', 'Government & Public Sector'];
toRemove.forEach(name => {
    const regex = new RegExp(`\\s*\\{\\s*name:\\s*"${name}"[\\s\\S]*?\\}(,|(?=\\s*\\]))`, 'g');
    code = code.replace(regex, '');
});
code = code.replace(/,\s*\]/, '\n]');
fs.writeFileSync('data/industries.js', code);
