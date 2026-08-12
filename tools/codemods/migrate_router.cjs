const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function migrateRouter() {
  walkDir(path.join(__dirname, 'components'), (filePath) => {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;

      // Replace Link to => Link href
      if (content.includes('to="')) {
        content = content.replace(/<Link\s+([^>]*?)to=/g, '<Link $1href=');
        content = content.replace(/<NavLink\s+([^>]*?)to=/g, '<Link $1href=');
        changed = true;
      }
      if (content.includes("to={")) {
        content = content.replace(/<Link\s+([^>]*?)to=\{/g, '<Link $1href={');
        content = content.replace(/<NavLink\s+([^>]*?)to=\{/g, '<Link $1href={');
        changed = true;
      }

      // Add "use client" if it has interactivity or hooks
      const needsUseClient = /useState|useEffect|useRouter|usePathname|useSearchParams|motion\./.test(content);
      if (needsUseClient && !content.includes('"use client"') && !content.includes("'use client'")) {
        content = '"use client";\n\n' + content;
        changed = true;
      }

      // Replace imports
      if (content.includes('react-router-dom')) {
        content = content.replace(/import\s+\{([^}]*)\}\s+from\s+["']react-router-dom["']/g, (match, p1) => {
          let newImports = [];
          if (p1.includes('Link') || p1.includes('NavLink')) {
            newImports.push('import Link from "next/link";');
          }
          if (p1.includes('useNavigate')) {
            newImports.push('import { useRouter } from "next/navigation";');
          }
          if (p1.includes('useLocation')) {
            newImports.push('import { usePathname } from "next/navigation";');
          }
          return newImports.join('\\n');
        });
        changed = true;
      }
      
      // Replace useNavigate with useRouter
      if (content.includes('useNavigate()')) {
        content = content.replace(/const\s+(\w+)\s*=\s*useNavigate\(\)/g, 'const $1 = useRouter()');
        changed = true;
      }
      
      // Navigate calls (naive, assumes variable is 'navigate' or similar, but the regex above captures the variable. Just replacing .navigate with .push is tricky.
      // Usually it's navigate('/path')
      content = content.replace(/navigate\(/g, 'router.push(');

      // Asset imports mapping to public
      // import image from '../assets/img.png' -> const image = '/assets/img.png'
      if (content.match(/import\s+(\w+)\s+from\s+['"]([^'"]+\.(png|jpe?g|svg|gif|webp|mp4))['"]/)) {
         content = content.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+\.(png|jpe?g|svg|gif|webp|mp4))['"]/g, (match, name, file) => {
            const baseName = path.basename(file);
            return "const " + name + " = '/assets/" + baseName + "';";
         });
         changed = true;
      }
      // Also match non-default imports? (rare for images).

      if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Migrated: " + filePath);
      }
    }
  });
}

migrateRouter();
