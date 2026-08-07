const fs = require('fs');
const glob = require('glob'); // This project doesn't have glob probably. Wait, I can just use a recursive function.

const path = require('path');

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') {
          if (dirFile.endsWith('.jsx') || dirFile.endsWith('.js')) {
              filelist.push(dirFile);
          }
      }
    }
  });
  return filelist;
}

const files = walkSync(path.join(__dirname, 'components')).concat(walkSync(path.join(__dirname, 'data')));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace <Icon className="foo" style={{ color: '#F37321' }} />
    // with <Icon className="foo text-orange-500" />
    content = content.replace(/className=(['"])(.*?)\1\s*style=\{\{\s*color:\s*['"]#F37321['"]\s*\}\}/gi, 'className=$1$2 text-orange-500$1');

    // Replace style={{ color: '#F37321' }} when no className exists
    content = content.replace(/style=\{\{\s*color:\s*['"]#F37321['"]\s*\}\}/gi, 'className="text-orange-500"');

    // Replace background
    content = content.replace(/className=(['"])(.*?)\1\s*style=\{\{\s*background:\s*['"]#F37321['"]\s*\}\}/gi, 'className=$1$2 bg-orange-500$1');
    content = content.replace(/style=\{\{\s*background:\s*['"]#F37321['"]\s*\}\}/gi, 'className="bg-orange-500"');

    // Other string replacements where #F37321 appears inside strings or template literals
    // e.g. color: "#F37321" in arrays
    content = content.replace(/color:\s*['"]#F37321['"]/gi, 'color: "var(--accent)"');
    
    // e.g. background: '#F37321'
    content = content.replace(/background:\s*['"]#F37321['"]/gi, 'background: "var(--accent)"');

    // e.g. bg-[#F37321] -> bg-orange-500
    content = content.replace(/bg-\[#F37321\]/gi, 'bg-orange-500');
    content = content.replace(/text-\[#F37321\]/gi, 'text-orange-500');

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Fixed styles in ' + file);
    }
});
