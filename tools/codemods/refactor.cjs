const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Component -> New Directory mapping
const componentMoves = {
    'LayoutClient.jsx': 'components/layout',
    'Navbar.jsx': 'components/layout',
    'Footer.jsx': 'components/layout',
    
    'ApplyModal.jsx': 'components/ui',
    'DemoModal.jsx': 'components/ui',
    'ContactForm.jsx': 'components/ui',
    'ProductCard.jsx': 'components/ui',
    'Magnetic.jsx': 'components/ui',
    'ZigzagBackground.jsx': 'components/ui',
    
    'HeroSectionAI.jsx': 'components/sections',
    'CTASection.jsx': 'components/sections',
    
    // We leave pages in components for now unless moving them directly to app
};

const componentsDir = path.join(__dirname, 'components');
const appDir = path.join(__dirname, 'app');

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const allFiles = [...getAllFiles(appDir), ...getAllFiles(componentsDir)];

console.log(`Found ${allFiles.length} files to scan for import updates.`);

for (const [comp, newDir] of Object.entries(componentMoves)) {
    const oldPath = path.join(componentsDir, comp);
    if (!fs.existsSync(oldPath)) continue;
    
    const newPath = path.join(__dirname, newDir, comp);
    
    // Move the file
    fs.renameSync(oldPath, newPath);
    console.log(`Moved ${comp} to ${newDir}`);
    
    // Figure out import replace patterns.
    // E.g., import Navbar from "../components/Navbar" -> "../components/layout/Navbar"
    // E.g., import Navbar from "@/components/Navbar" -> "@/components/layout/Navbar"
    
    const compName = comp.replace('.jsx', '');
    const newImportSub = newDir.replace('components/', ''); // 'layout'
    
    // Regex for: import ... from "something/Navbar"
    for (const file of allFiles) {
        if (!fs.existsSync(file)) continue;
        
        let content = fs.readFileSync(file, 'utf8');
        let changed = false;
        
        // 1. Absolute @/components/Navbar
        const absRegex = new RegExp(`@/components/${compName}(['"\\/])`, 'g');
        if (absRegex.test(content)) {
            content = content.replace(absRegex, `@/components/${newImportSub}/${compName}$1`);
            changed = true;
        }
        
        // 2. Relative ../components/Navbar or ../../components/Navbar or ./Navbar
        // Since we are just adding /layout, it's safer to just match /Navbar and prepend /layout/
        // Wait, if it was `import ... from './Navbar'`, it's now `import ... from '../layout/Navbar'` if we are inside a subfolder, 
        // which gets very complex.
        
        // However, most of the codebase seems to use either relative or absolute.
        // Let's rely on standard search and replace for relative
        const relRegex = new RegExp(`(\\.\\.[/\\.]+components/|\\.\\/)(${compName})(['"\\/])`, 'g');
        if (relRegex.test(content)) {
            // we can just replace it to absolute to avoid relative path math!
            content = content.replace(relRegex, `@/components/${newImportSub}/${compName}$3`);
            changed = true;
        }
        
        if (changed) {
            fs.writeFileSync(file, content);
            console.log(`Updated imports in ${path.relative(__dirname, file)}`);
        }
    }
}

console.log('Done refactoring components.');
