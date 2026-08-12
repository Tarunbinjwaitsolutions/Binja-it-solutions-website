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
    if (content.includes('<Image') && content.includes('/ width={800} height={800} />')) {
      content = content.replace(/\/\s*width=\{800\}\s*height=\{800\}\s*\/>/g, 'width={800} height={800} />');
      fs.writeFileSync(file, content, 'utf8');
      count++;
    }
  });
  console.log(`Fixed ${count} files with syntax error.`);
});
