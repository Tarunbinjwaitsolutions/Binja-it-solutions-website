const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'componetns');

function getFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, filesList);
    } else if (fullPath.endsWith('.jsx')) {
      filesList.push(fullPath);
    }
  }
  return filesList;
}

const allFiles = getFiles(srcDir);
const filesToFix = [];

const hardcodedPatterns = [
  /\bbg-white\b/,
  /\bbg-black\b/,
  /\btext-black\b/,
  /\btext-white\b/,
  /\btext-neutral-\d+\b/,
  /\btext-gray-\d+\b/,
  /\bbg-neutral-[1-8]00\b/,
  /\bbg-gray-[1-8]00\b/
];

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let hasHardcoded = false;
  for (const pattern of hardcodedPatterns) {
    if (pattern.test(content)) {
      hasHardcoded = true;
      break;
    }
  }
  
  if (hasHardcoded && !file.includes('Agentic AI') && !file.includes('FullStackDevelopment')) {
    filesToFix.push(file.replace(__dirname, ''));
  }
});

console.log(`Total JSX files: ${allFiles.length}`);
console.log(`Files needing theme fixes (excluding already fixed ones): ${filesToFix.length}`);
console.log('List of files:');
filesToFix.forEach(f => console.log(f));
