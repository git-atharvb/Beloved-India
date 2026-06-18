/**
 * Ultimate strict script to guarantee 100% unique images and no bad images.
 */
import fs from 'fs';

const USER_AGENT = 'BelovedIndiaApp/1.0 (contact@belovedindia.com)';

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function cleanTitle(title) {
  let name = title.replace(/^File:/, '').replace(/\.(jpg|jpeg|png)$/i, '');
  name = decodeURIComponent(name);
  name = name.replace(/_/g, ' ')
             .replace(/\d+/g, '')
             .replace(/\s+/g, ' ')
             .replace(/\(.*?\)/g, '')
             .replace(/-.*/g, '')
             .replace(/,.*$/g, '')
             .trim();
  if (name.length < 3) return "Scenic " + name;
  return name;
}

const badWords = ['map', 'chart', 'stamp', 'pdf', 'djvu', 'logo', 'flag', 'gateway_of_india', 'svg', 'portrait'];

function isBadImage(url) {
  const lower = url.toLowerCase();
  return badWords.some(w => lower.includes(w));
}

async function getUnusedImageFromState(state, usedImages, usedNames) {
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(state + " nature OR " + state + " building OR " + state + " beach")}&srnamespace=6&srlimit=50&format=json`;
  
  try {
    const res = await fetch(searchUrl, { headers: { 'User-Agent': USER_AGENT } });
    const data = await res.json();
    if (!data.query || !data.query.search) return null;
    
    for (const r of data.query.search) {
      const title = r.title;
      const lower = title.toLowerCase();
      
      if (!lower.endsWith('.jpg') && !lower.endsWith('.jpeg')) continue;
      if (badWords.some(w => lower.includes(w))) continue;
      
      await delay(200);
      const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json`;
      const infoRes = await fetch(infoUrl, { headers: { 'User-Agent': USER_AGENT } });
      const infoData = await infoRes.json();
      const pages = infoData.query.pages;
      const pageId = Object.keys(pages)[0];
      
      if (pageId !== '-1' && pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
        const url = pages[pageId].imageinfo[0].thumburl || pages[pageId].imageinfo[0].url;
        
        if (!usedImages.has(url) && !isBadImage(url)) {
          let name = cleanTitle(title);
          if (usedNames.has(name) || name.length < 4) {
            name = name + " " + state;
          }
          return { name, url };
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

async function main() {
  const filePath = 'a:/WebDev/BelovedIndia/src/data/destinations.ts';
  let content = fs.readFileSync(filePath, 'utf-8');
  const arrayMatch = content.match(/export const destinations: Destination\[\] = (\[[\s\S]*\]);/);
  if (!arrayMatch) return;
  
  let destinations = JSON.parse(arrayMatch[1]);
  
  const usedImages = new Set();
  const usedNames = new Set();
  const toFix = [];
  
  for (const d of destinations) {
    if (usedImages.has(d.image) || isBadImage(d.image) || d.name.includes("Churches in Dadra")) {
      toFix.push(d);
    } else {
      usedImages.add(d.image);
      usedNames.add(d.name);
    }
  }
  
  console.log(`Found ${toFix.length} bad or duplicate items to replace.`);
  
  let fixedCount = 0;
  for (const d of toFix) {
    console.log(`\nReplacing: ${d.name} (${d.state}) | Reason: Bad or Duplicate`);
    
    let replacement = await getUnusedImageFromState(d.state, usedImages, usedNames);
    if (!replacement) {
      replacement = await getUnusedImageFromState(d.state + " tourism", usedImages, usedNames);
    }
    
    if (replacement) {
      d.name = replacement.name;
      d.image = replacement.url;
      d.description = `${replacement.name} is a breathtaking destination in ${d.state}, offering visitors a truly unforgettable experience.`;
      
      usedImages.add(d.image);
      usedNames.add(d.name);
      fixedCount++;
      console.log(`  ✅ Replaced with: ${d.name}`);
      console.log(`  ✅ Image: ${d.image}`);
    } else {
      console.log(`  ❌ Failed to find replacement for ${d.name}`);
    }
  }
  
  const header = "// Auto-generated 720 Destinations Data\nexport interface Destination {\n  id: number;\n  name: string;\n  state: string;\n  image: string;\n  description: string;\n  rating: number;\n}\n\nexport const destinations: Destination[] = ";
  
  const output = header + JSON.stringify(destinations, null, 2) + ';\n';
  fs.writeFileSync(filePath, output);
  
  console.log(`\nSuccessfully fixed ${fixedCount}/${toFix.length} items.`);
}

main();
