const fs = require('fs');
const path = require('path');

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(file => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (file.endsWith('.jsx')) results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

walk('./components', (err, files) => {
  if (err) throw err;
  let count = 0;
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('<img') && !content.includes('eslint-disable')) {
      if (!content.includes('import Image from "next/image"') && !content.includes("import Image from 'next/image'")) {
        const importMatch = content.match(/import React[^;]*;/);
        if (importMatch) {
            content = content.replace(importMatch[0], importMatch[0] + '\nimport Image from "next/image";');
        } else {
            content = 'import Image from "next/image";\n' + content;
        }
      }
      
      content = content.replace(/<img([^>]*)>/g, (match, attrs) => {
         let newAttrs = attrs;
         newAttrs = newAttrs.replace(/\s+width=\{[^}]*\}/g, '').replace(/\s+height=\{[^}]*\}/g, '');
         newAttrs = newAttrs.replace(/\s+width="[^"]*"/g, '').replace(/\s+height="[^"]*"/g, '');
         
         if (!newAttrs.includes('fill') && !newAttrs.includes('width=')) {
            newAttrs += ' width={800} height={800}';
         }
         return `<Image${newAttrs} />`;
      });

      fs.writeFileSync(file, content, 'utf8');
      count++;
    }
  });
  console.log(`Updated ${count} files to use next/image.`);
});
