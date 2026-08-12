const fs = require('fs');
const path = require('path');

const wait = (ms) => new Promise(r => setTimeout(r, ms));

async function getUnsplashImage(query) {
  try {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=3`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch for ${query}`);
      return null;
    }
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      const idx = Math.floor(Math.random() * Math.min(3, data.results.length));
      return data.results[idx].urls.regular;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

async function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find all lines with slug
  const regex = /name:\s*"([^"]+)",\s*\n\s*slug:\s*"([^"]+)"/g;
  
  let match;
  let matches = [];
  while ((match = regex.exec(content)) !== null) {
    matches.push({
      full: match[0],
      name: match[1],
      slug: match[2]
    });
  }

  console.log(`Found ${matches.length} items in ${filePath}`);
  
  for (const m of matches) {
    console.log(`Fetching image for: ${m.name}`);
    let imgUrl = await getUnsplashImage(m.name);
    if (!imgUrl) {
      imgUrl = 'https://images.unsplash.com/photo-1556761175-129418cb2104?w=800'; // Generic fallback
    }
    
    // Check if it already has an image line right after slug
    const replacement = `${m.full},\n    image: "${imgUrl}"`;
    if (!content.includes(`image: "${imgUrl}"`)) {
        content = content.replace(m.full, replacement);
    }
    
    await wait(300); // polite delay
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

async function main() {
  await processFile(path.join(__dirname, 'data', 'industries.js'));
}

main().catch(console.error);
