const fs = require('fs');
let code = fs.readFileSync('src/componetns/smm/SmmLanding.jsx', 'utf8');

// Basic Next.js to React conversions
code = code.replace(/"use client"/g, '');
code = code.replace(/'use client'/g, '');
code = code.replace(/import Link from "next\/link"/g, 'import { Link } from "react-router-dom"');
code = code.replace(/import Image from "next\/image"/g, '');
code = code.replace(/<Image[^>]*src=\{?([^}>]+)\}?[^>]*\/>/g, '<img src={$1} />');
code = code.replace(/<Button/g, '<button');
code = code.replace(/<\/Button>/g, '</button>');
code = code.replace(/import \{ Button \} from "@\/components\/ui\/button"/g, '');

// Clean up TypeScript syntax in features.tsx (like sectionsRef.current<(HTMLDivElement | null)[]>)
code = code.replace(/<\(HTMLDivElement \| null\)\[\]>/g, '');
code = code.replace(/: \w+\[\]/g, '');
code = code.replace(/: IntersectionObserverEntry\[\]/g, '');

// Replace duplicated lucide-react imports with a single one at the top (we can just leave them if they are unique, but they are duplicated)
// It's safer to let them stay and we will clean them up manually if needed.

fs.writeFileSync('src/componetns/smm/SmmLanding.jsx', code);
console.log('Conversion completed.');
