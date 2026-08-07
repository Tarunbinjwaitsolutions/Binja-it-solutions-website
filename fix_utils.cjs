const fs = require('fs');
const path = require('path');

const srcDirs = [path.join(__dirname, 'components'), path.join(__dirname, 'app'), path.join(__dirname, 'lib')];

function getAllFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
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

const allFiles = srcDirs.flatMap(d => getAllFiles(d));

let changedFiles = 0;
for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Replace relative paths to utils like: ../utils/animations, ../../utils/animations
    const relRegex = /(import\s+.*?from\s+['"])(\.\.\/)*utils\//g;
    if (relRegex.test(content)) {
        content = content.replace(relRegex, '$1@/lib/utils/');
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(file, content);
        changedFiles++;
    }
}

console.log(`Updated imports in ${changedFiles} files.`);
