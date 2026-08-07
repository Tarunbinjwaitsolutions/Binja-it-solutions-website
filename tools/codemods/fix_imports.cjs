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

const replacements = {
    '@/components/Navbar': '@/components/layout/Navbar',
    '@/components/Footer': '@/components/layout/Footer',
    '@/components/LayoutClient': '@/components/layout/LayoutClient',
    '@/components/ApplyModal': '@/components/ui/ApplyModal',
    '@/components/DemoModal': '@/components/ui/DemoModal',
    '@/components/ContactForm': '@/components/ui/ContactForm',
    '@/components/ProductCard': '@/components/ui/ProductCard',
    '@/components/Magnetic': '@/components/ui/Magnetic',
    '@/components/ZigzagBackground': '@/components/ui/ZigzagBackground',
    '@/components/HeroSectionAI': '@/components/sections/HeroSectionAI',
    '@/components/CTASection': '@/components/sections/CTASection'
};

let changedFiles = 0;
for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const [oldImp, newImp] of Object.entries(replacements)) {
        const regex = new RegExp(oldImp + '([\\\'\\"\\\\/])', 'g');
        if (regex.test(content)) {
            content = content.replace(regex, newImp + '$1');
            changed = true;
        }
    }
    if (changed) {
        fs.writeFileSync(file, content);
        changedFiles++;
        console.log('Fixed ' + path.basename(file));
    }
}
console.log('Done ' + changedFiles);
