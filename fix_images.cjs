const fs = require('fs');

const path = 'components/Digital Marketing/SocialDetail.jsx';
let content = fs.readFileSync(path, 'utf8');

// Add import
if (!content.includes('import Image from "next/image"')) {
    content = content.replace(/import \{ motion \} from "framer-motion";/, 'import { motion } from "framer-motion";\nimport Image from "next/image";');
}

// Replace sco img
content = content.replace(/<img src=\{sco\} className="rounded-\[2\.5rem\] " alt="SEO Analysis" \/>/, '<Image src={sco} width={600} height={600} className="rounded-[2.5rem] w-full h-auto object-cover" alt="SEO Analysis" />');

// Replace Engagement img
content = content.replace(/<img\s+src=\{Engagement\}\s+className="w-full h-auto object-cover"\s+alt="Social App Mockup"\s+\/>/m, '<Image src={Engagement} width={500} height={500} className="w-full h-auto object-cover" alt="Social App Mockup" />');

fs.writeFileSync(path, content);
console.log('Fixed SocialDetail.jsx');
