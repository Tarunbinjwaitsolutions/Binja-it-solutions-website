const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.jsx') || p.endsWith('.js')) {
      let content = fs.readFileSync(p, 'utf8');
      if (content.includes('react-helmet')) {
        content = content.replace(/import\s*\{\s*Helmet\s*\}\s*from\s*['"]react-helmet['"];?/g, '');
        content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>/g, '');
        fs.writeFileSync(p, content, 'utf8');
        console.log('Removed Helmet from ' + p);
      }
    }
  });
}

walk('components');
