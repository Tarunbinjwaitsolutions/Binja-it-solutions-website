const fs = require('fs');
const path = require('path');

const landingPageFile = path.join(__dirname, 'components', 'LandingPage.jsx');
let content = fs.readFileSync(landingPageFile, 'utf8');

// The components to extract and their new locations
const extractions = [
    {
        name: 'useInView',
        dir: 'lib/hooks',
        fileName: 'useInView.js',
        regex: /\/\* \-\-\-\-\-\-\-\-\-\- scroll reveal hook \+ wrapper \-\-\-\-\-\-\-\-\-\- \*\/\s+function useInView\([\s\S]*?return \[ref, inView\];\r?\n\}/m,
        imports: `import { useState, useEffect, useRef } from 'react';\n\nconst prefersReduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;\n\n`
    },
    {
        name: 'Reveal',
        dir: 'components/ui',
        fileName: 'Reveal.jsx',
        regex: /function Reveal\([\s\S]*?return \([\s\S]*?\);\r?\n\}/m,
        imports: `import React from 'react';\nimport useInView from '@/lib/hooks/useInView';\n\n`
    },
    {
        name: 'ScrollScaleBox',
        dir: 'components/ui',
        fileName: 'ScrollScaleBox.jsx',
        regex: /\/\* \-\-\-\-\-\-\-\-\-\- SCROLL SCALE ANIMATION COMPONENT \-\-\-\-\-\-\-\-\-\- \*\/\s+function ScrollScaleBox\([\s\S]*?return \([\s\S]*?\);\r?\n\}/m,
        imports: `import React, { useEffect, useRef } from 'react';\nimport { gsap } from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\ngsap.registerPlugin(ScrollTrigger);\n\nconst prefersReduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;\n\n`
    },
    {
        name: 'ParallaxSection',
        dir: 'components/ui',
        fileName: 'ParallaxSection.jsx',
        regex: /\/\* \-\-\-\-\-\-\-\-\-\- PARALLAX SCROLL COMPONENT \-\-\-\-\-\-\-\-\-\- \*\/\s+function ParallaxSection\([\s\S]*?return \([\s\S]*?\);\r?\n\}/m,
        imports: `import React, { useEffect, useRef } from 'react';\nimport { gsap } from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\ngsap.registerPlugin(ScrollTrigger);\n\nconst prefersReduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;\n\n`
    }
];

let importsToAdd = [];

extractions.forEach(ext => {
    const match = content.match(ext.regex);
    if (match) {
        let compCode = match[0];
        // Export default it
        if (!compCode.includes('export default')) {
            if (compCode.startsWith('function')) {
                compCode = compCode.replace('function ' + ext.name, 'export default function ' + ext.name);
            } else if (compCode.includes('/*')) {
                compCode = compCode.replace('function ' + ext.name, 'export default function ' + ext.name);
            }
        }
        
        const fullCode = ext.imports + compCode + '\n';
        const targetPath = path.join(__dirname, ext.dir, ext.fileName);
        fs.writeFileSync(targetPath, fullCode);
        console.log(`Extracted ${ext.name} to ${ext.dir}/${ext.fileName}`);
        
        // Remove from LandingPage
        content = content.replace(match[0], '');
        
        // Add import
        importsToAdd.push(`import ${ext.name} from '@/${ext.dir}/${ext.fileName.replace('.jsx', '').replace('.js', '')}';`);
    } else {
        console.log(`Could not find ${ext.name} in LandingPage.jsx`);
    }
});

// Remove unused prefersReduced from LandingPage if it is only used in extracted components. 
// Actually, it might be used in LandingPage too, let's keep it.

// Inject imports at the top
content = content.replace(/(import .*?;[\r\n]+)(?=\/\*)/, `$1${importsToAdd.join('\n')}\n`);

fs.writeFileSync(landingPageFile, content);
console.log('Updated LandingPage.jsx');
