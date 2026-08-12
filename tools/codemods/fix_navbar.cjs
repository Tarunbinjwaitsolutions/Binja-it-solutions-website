const fs = require('fs');

let file = 'components/layout/Navbar.jsx';
let c = fs.readFileSync(file, 'utf8');
c = c.replace(/\"..\/data\//g, '\"../../data/');
c = c.replace(/\"..\/utils\//g, '\"../../lib/utils/');
c = c.replace(/\"..\/assets\//g, '\"../../assets/');
// Navbar also imports dynamic components from ./navbar. 
// Since Navbar is now in components/layout, ./navbar means components/layout/navbar which is wrong. 
// It should be ../navbar/ (or absolute @/components/navbar)
c = c.replace(/\"\.\/navbar\//g, '\"@/components/navbar/');
fs.writeFileSync(file, c);
console.log('Fixed Navbar');
