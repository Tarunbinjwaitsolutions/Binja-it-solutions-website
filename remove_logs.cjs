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
        } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const allFiles = srcDirs.flatMap(d => getAllFiles(d));

let changedFiles = 0;
for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove console.log(...) but try to avoid multi-line or complex ones that might break syntax if poorly regexed.
    // A simple regex that matches `console.log(...);` on a single line.
    const consoleRegex = /^[ \t]*console\.log\([^)]*\);?[\r\n]+/gm;
    
    if (consoleRegex.test(content)) {
        content = content.replace(consoleRegex, '');
        fs.writeFileSync(file, content);
        changedFiles++;
    }
}

console.log(`Removed console.log from ${changedFiles} files.`);
