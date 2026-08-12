const fs = require('fs');
const path = require('path');

const landingPageFile = path.join(__dirname, 'components', 'LandingPage.jsx');
let content = fs.readFileSync(landingPageFile, 'utf8');

const dataExtracts = [
    { name: 'KEY_BENEFITS', type: 'const' },
    { name: 'PLANS', type: 'const' },
    { name: 'FEATURES_DATA', type: 'const' },
    { name: 'HERO_CARDS', type: 'const' },
    { name: 'HIGHLIGHTS', type: 'const' },
    { name: 'ALL_FEATURES', type: 'const' }
];

let dataFileContent = `import React from 'react';\nimport { TrendingUp, Users, Zap, Clock, Bot, BarChart, ShieldCheck, Rocket, Diamond, Crown, Building2, PhoneCall, Layers, ArrowUpDown, Mic, MessageSquare, Tag, Megaphone, Settings, Calendar, FileText, Mail, Globe, Volume2, Headphones, Code } from 'lucide-react';\n\n`;

dataExtracts.forEach(ext => {
    // We try to match const Name = ... ;
    const regex = new RegExp(`const ${ext.name} = [\\s\\S]*?;`, 'm');
    const match = content.match(regex);
    if (match) {
        dataFileContent += `export ${match[0]}\n\n`;
        content = content.replace(match[0], '');
    } else {
        console.log(`Could not find ${ext.name}`);
    }
});

const dataFilePath = path.join(__dirname, 'data', 'landingPageData.jsx');
fs.writeFileSync(dataFilePath, dataFileContent);
console.log(`Extracted data to ${dataFilePath}`);

// Inject imports into LandingPage.jsx
const importStr = `import { ${dataExtracts.map(e => e.name).join(', ')} } from '@/data/landingPageData';\n`;
content = content.replace(/(import .*?;[\r\n]+)(?=\/\*)/, `$1${importStr}\n`);

fs.writeFileSync(landingPageFile, content);
console.log('Updated LandingPage.jsx');
