/**
 * Script to swap the final 7 obscure destinations that failed the first time.
 */
import fs from 'fs';

const USER_AGENT = 'BelovedIndiaApp/1.0 (contact@belovedindia.com)';

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// These are the places that either got a PDF or failed completely.
const swapList = {
  'Maha Muni Buddha Vihar': 'Gomati Wildlife Sanctuary',
  'Gedu Mia Mosque': 'Trishna Wildlife Sanctuary',
  'Nakshatra Garden Silvassa': 'Vanganga Lake Garden',
  'BAPS Swaminarayan Temple Silvassa': 'Our Lady of Piety Church Silvassa',
  'Hirwa Van Garden': 'Vasona Lion Safari',
  'Ujra Mosque Kavaratti': 'Kalpeni Island',
  'Kavaratti Lagoon': 'Minicoy Island Lighthouse'
};

async function searchCommonsForImage(query) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=5&format=json`;
    const res = await fetch(searchUrl, { headers: { 'User-Agent': USER_AGENT } });
    const data = await res.json();
    if (!data.query || !data.query.search || data.query.search.length === 0) return null;

    const results = data.query.search;
    let bestResult = results.find(r => 
      (r.title.toLowerCase().endsWith('.jpg') || r.title.toLowerCase().endsWith('.jpeg')) &&
      !r.title.toLowerCase().includes('pdf') &&
      !r.title.toLowerCase().includes('logo') &&
      !r.title.toLowerCase().includes('map') &&
      !r.title.toLowerCase().includes('svg')
    );
    if (!bestResult) bestResult = results[0];
    
    await delay(1000); // strict delay
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(bestResult.title)}&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json`;
    const infoRes = await fetch(infoUrl, { headers: { 'User-Agent': USER_AGENT } });
    const infoData = await infoRes.json();
    const pages = infoData.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== '-1' && pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
      return pages[pageId].imageinfo[0].thumburl || pages[pageId].imageinfo[0].url;
    }
  } catch (e) {}
  return null;
}

async function main() {
  const filePath = 'a:/WebDev/BelovedIndia/src/data/destinations.ts';
  let content = fs.readFileSync(filePath, 'utf-8');
  const arrayMatch = content.match(/export const destinations: Destination\[\] = (\[[\s\S]*\]);/);
  if (!arrayMatch) return;
  
  let destinations = JSON.parse(arrayMatch[1]);
  let swappedCount = 0;
  
  for (const dest of destinations) {
    if (!swapList[dest.name]) continue;
    
    const newName = swapList[dest.name];
    console.log("Swapping: " + dest.name + " -> " + newName);
    
    await delay(2000);
    
    let newImage = await searchCommonsForImage(newName + " " + dest.state);
    if (!newImage || newImage.includes('.pdf') || newImage.includes('gateway_of_india')) {
      await delay(2000);
      newImage = await searchCommonsForImage(newName);
    }
    
    if (newImage && !newImage.toLowerCase().includes('map') && !newImage.toLowerCase().includes('pdf')) {
      dest.name = newName;
      dest.description = newName + " is a beautiful destination in " + dest.state + ", perfect for a peaceful getaway.";
      dest.image = newImage;
      swappedCount++;
      console.log("  ✅ Replaced with: " + newImage);
    } else {
      console.log("  ❌ Still failed for " + newName);
    }
  }
  
  const header = "// Auto-generated 720 Destinations Data\nexport interface Destination {\n  id: number;\n  name: string;\n  state: string;\n  image: string;\n  description: string;\n  rating: number;\n}\n\nexport const destinations: Destination[] = ";
  
  const output = header + JSON.stringify(destinations, null, 2) + ';\n';
  fs.writeFileSync(filePath, output);
  console.log("\nDone. Swapped " + swappedCount);
}

main();
