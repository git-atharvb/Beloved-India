/**
 * Script to resolve all duplicate images in destinations by finding
 * completely new unused images from the same state and renaming the destination.
 */
import fs from 'fs';

const USER_AGENT = 'BelovedIndiaApp/1.0 (contact@belovedindia.com)';

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function cleanTitle(title) {
  let name = title.replace(/^File:/, '').replace(/\.(jpg|jpeg|png)$/i, '');
  // Remove numbers, underscores, and common suffixes
  name = name.replace(/_/g, ' ')
             .replace(/\d+/g, '')
             .replace(/\s+/g, ' ')
             .replace(/\(.*?\)/g, '')
             .replace(/-.*/g, '')
             .replace(/,.*$/g, '')
             .trim();
  if (name.length < 3) return "Beautiful " + name;
  return name;
}

async function getUnusedImageFromState(state, usedImages, usedNames) {
  // Query commons for the state
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(state)}&srnamespace=6&srlimit=50&format=json`;
  
  try {
    const res = await fetch(searchUrl, { headers: { 'User-Agent': USER_AGENT } });
    const data = await res.json();
    if (!data.query || !data.query.search) return null;
    
    for (const r of data.query.search) {
      const title = r.title;
      const lower = title.toLowerCase();
      
      if (!lower.endsWith('.jpg') && !lower.endsWith('.jpeg')) continue;
      if (lower.includes('map') || lower.includes('flag') || lower.includes('logo') || lower.includes('pdf') || lower.includes('svg') || lower.includes('stamp')) continue;
      
      // Get the image url
      await delay(500);
      const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json`;
      const infoRes = await fetch(infoUrl, { headers: { 'User-Agent': USER_AGENT } });
      const infoData = await infoRes.json();
      const pages = infoData.query.pages;
      const pageId = Object.keys(pages)[0];
      
      if (pageId !== '-1' && pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
        const url = pages[pageId].imageinfo[0].thumburl || pages[pageId].imageinfo[0].url;
        
        if (!usedImages.has(url)) {
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
  const duplicates = [];
  
  // First pass: identify duplicates
  for (const d of destinations) {
    usedNames.add(d.name);
    if (usedImages.has(d.image)) {
      duplicates.push(d);
    } else {
      usedImages.add(d.image);
    }
  }
  
  console.log(`Found ${duplicates.length} duplicate items to replace.`);
  
  let fixedCount = 0;
  for (const d of duplicates) {
    console.log(`\nReplacing duplicate: ${d.name} (${d.state})`);
    
    // We remove the old name from usedNames to not block anything unnecessarily
    usedNames.delete(d.name);
    
    let replacement = await getUnusedImageFromState(d.state, usedImages, usedNames);
    if (!replacement) {
      // Try with a broader search like "India state"
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
  
  console.log(`\nSuccessfully fixed ${fixedCount}/${duplicates.length} duplicates.`);
}

main();
