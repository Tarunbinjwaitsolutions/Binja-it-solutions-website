import fs from 'fs';

// Update data/services.js
let servicesPath = 'data/services.js';
let servicesContent = fs.readFileSync(servicesPath, 'utf8');

servicesContent = servicesContent.replace(/image:\s*['"](.*?)['"]/g, 'image: "$1", heroTheme: "dark"');

fs.writeFileSync(servicesPath, servicesContent);
console.log('Updated services.js');

// Update data/industries.js
let industriesPath = 'data/industries.js';
let indContent = fs.readFileSync(industriesPath, 'utf8');

// Add to top-level industry
indContent = indContent.replace(/slug:\s*['"](.*?)['"],\n\s*description/g, 'slug: "$1", heroTheme: "dark",\n    description');

// Add to features
indContent = indContent.replace(/slug:\s*['"](.*?)['"]\s*}/g, 'slug: "$1", heroTheme: "dark" }');

fs.writeFileSync(industriesPath, indContent);
console.log('Updated industries.js');
