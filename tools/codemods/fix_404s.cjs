const fs = require('fs');
let content = fs.readFileSync('components/industries/IndustryClientContent.jsx', 'utf8');

const brokenUrls = [
'https://images.unsplash.com/photo-1584982751601-e15a452db168?w=800&q=80',
'https://images.unsplash.com/photo-1551076805-e16760c06477?w=800&q=80',
'https://images.unsplash.com/photo-1518183203493-27e1f4007b8a?w=800&q=80',
'https://images.unsplash.com/photo-1513258496099-481a8041cb15?w=800&q=80',
'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
'https://images.unsplash.com/photo-1503376760367-12ea234d0b4a?w=800&q=80',
'https://images.unsplash.com/photo-1533473359331-013d80a373d3?w=800&q=80',
'https://images.unsplash.com/photo-1586528116311-ad8ed7c50a30?w=800&q=80',
'https://images.unsplash.com/photo-1555529771-835f59bfc50c?w=800&q=80',
'https://images.unsplash.com/photo-1515347619252-70b7fbba504d?w=800&q=80',
'https://images.unsplash.com/photo-1580674294520-7f2d59188d8b?w=800&q=80',
'https://images.unsplash.com/photo-1551882547-ff40c0d128dc?w=800&q=80',
'https://images.unsplash.com/photo-1524522173746-f628ba4e73f1?w=800&q=80',
'https://images.unsplash.com/photo-1542314831-c6a4d27ce6a2?w=800&q=80',
'https://images.unsplash.com/photo-1499602213880-9af684b005cb?w=800&q=80',
'https://images.unsplash.com/photo-1512453979456-14b51820627e?w=800&q=80',
'https://images.unsplash.com/photo-1566371486490-560dd41f9773?w=800&q=80',
'https://images.unsplash.com/photo-1595822839958-3d8498da1c50?w=800&q=80',
'https://images.unsplash.com/photo-1592982537447-6f2334237d82?w=800&q=80',
'https://images.unsplash.com/photo-1516280440502-85f5e27a9218?w=800&q=80'
];

brokenUrls.forEach(url => {
  content = content.replace(new RegExp('\"' + url.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + '\",?\\s*', 'g'), '');
});

// Since e-commerce-retail lost all its images (both failed), let's inject a safe fallback if empty
content = content.replace(/\"e-commerce-retail\":\s*\[\s*\]/, '\"e-commerce-retail\": ["https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"]');

fs.writeFileSync('components/industries/IndustryClientContent.jsx', content);
console.log('Removed broken URLs from IndustryClientContent.jsx');
