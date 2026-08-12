const fs = require('fs');
let c = fs.readFileSync('data/industries.js', 'utf8');
c = c.replace(/"slug": "([^"]+)",/g, '"slug": "$1",\n    "heroTheme": "dark",');
fs.writeFileSync('data/industries.js', c);
console.log('Done');
