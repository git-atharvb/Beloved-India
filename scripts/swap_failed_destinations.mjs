/**
 * Script to swap obscure destinations that have no photos with well-known ones,
 * and fetch their photos.
 */
import fs from 'fs';

const USER_AGENT = 'BelovedIndiaApp/1.0 (contact@belovedindia.com)';

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// Map from obscure place -> well-known place
const swapList = {
  'Chitrakoot Madhya Pradesh': 'Bhedaghat',
  'Churachandpur': 'Khwairamband Bazar',
  'Khoupum Valley': 'Shree Govindajee Temple',
  'Nongkhnum Island': 'Lady Hydari Park',
  'Mawryngkhang Trek': 'Nartiang Monoliths',
  'Murlen National Park': 'Mizoram State Museum',
  'Triple Falls Seithekima': 'Shilloi Lake',
  'Japfu Peak': 'Naga Heritage Village',
  'Saramati Peak': 'Nagaland State Museum',
  'Rowa Wildlife Sanctuary': 'Maha Muni Buddha Vihar',
  'Deotamura': 'Gedu Mia Mosque',
  'Rangat': 'Cinque Island',
  'Dudhani': 'Nakshatra Garden Silvassa',
  'Tribal Museum Silvassa': 'BAPS Swaminarayan Temple Silvassa',
  'Satmaliya Deer Park': 'Hirwa Van Garden',
  'Kadmat Island': 'Pitti Island',
  'Thinnakara Island': 'Agatti Aerodrome',
  'Marine Museum Kavaratti': 'Ujra Mosque Kavaratti',
  'Kadmat Beach': 'Kavaratti Lagoon',
  'Chunnambar Boat House': 'French War Memorial Pondicherry',
  'Goubert Market': 'Pondicherry Museum'
};

async function searchWikiDesc(place) {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(place)}&format=json`;
    const res = await fetch(searchUrl, { headers: { 'User-Agent': USER_AGENT } });
    const data = await res.json();
    if (data.query && data.query.search && data.query.search.length > 0) {
      const pageid = data.query.search[0].pageid;
      const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&pageids=${pageid}&format=json`;
      const descRes = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
      const descData = await descRes.json();
      const extract = descData.query.pages[pageid].extract;
      
      if (!extract) return null;
      let text = extract.replace(/\([^)]*\)/g, '').trim();
      text = text.replace(/\[[^\]]+\]/g, '').trim();
      text = text.replace(/\s{2,}/g, ' ');
      text = text.replace(/^[.,;:!?]\s*/, '');
      const match = text.match(/^[^.!?]+[.!?]/);
      if (match && match[0].length > 20) {
        return match[0].trim();
      }
    }
  } catch (e) {}
  return null;
}

async function searchCommonsForImage(query) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=10&format=json`;
    const res = await fetch(searchUrl, { headers: { 'User-Agent': USER_AGENT } });
    const data = await res.json();
    
    if (!data.query || !data.query.search || data.query.search.length === 0) return null;

    const results = data.query.search;
    let bestResult = results.find(r => 
      (r.title.toLowerCase().endsWith('.jpg') || r.title.toLowerCase().endsWith('.jpeg')) &&
      !r.title.toLowerCase().includes('logo') &&
      !r.title.toLowerCase().includes('icon') &&
      !r.title.toLowerCase().includes('map') &&
      !r.title.toLowerCase().includes('flag') &&
      !r.title.toLowerCase().includes('stamp') &&
      !r.title.toLowerCase().includes('portrait') &&
      !r.title.toLowerCase().includes('svg')
    );
    if (!bestResult) bestResult = results[0];
    
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

async function searchWikipediaForImage(query) {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json`;
    const res = await fetch(searchUrl, { headers: { 'User-Agent': USER_AGENT } });
    const data = await res.json();
    
    if (!data.query || !data.query.search || data.query.search.length === 0) return null;
    const pageid = data.query.search[0].pageid;
    
    const pageUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&pageids=${pageid}&pithumbsize=1280&format=json`;
    const pageRes = await fetch(pageUrl, { headers: { 'User-Agent': USER_AGENT } });
    const pageData = await pageRes.json();
    const page = pageData.query.pages[pageid];
    if (page.thumbnail && page.thumbnail.source) return page.thumbnail.source;
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
    
    await delay(300);
    let desc = await searchWikiDesc(newName);
    if (!desc) desc = newName + " is a highly sought-after destination in " + dest.state + ", renowned for its rich heritage.";
    
    await delay(300);
    let newImage = await searchCommonsForImage(newName + " " + dest.state);
    if (!newImage) {
      await delay(300);
      newImage = await searchWikipediaForImage(newName + " " + dest.state);
    }
    if (!newImage) {
      await delay(300);
      newImage = await searchCommonsForImage(newName + " India");
    }
    
    if (newImage && !newImage.toLowerCase().includes('map') && !newImage.toLowerCase().includes('flag') && !newImage.toLowerCase().includes('svg')) {
      dest.name = newName;
      dest.description = desc;
      dest.image = newImage;
      swappedCount++;
      console.log("  ✅ Successfully replaced with: " + newImage);
    } else {
      console.log("  ❌ Could not find good image for " + newName);
    }
  }
  
  const header = "// Auto-generated 720 Destinations Data\nexport interface Destination {\n  id: number;\n  name: string;\n  state: string;\n  image: string;\n  description: string;\n  rating: number;\n}\n\nexport const destinations: Destination[] = ";
  
  const output = header + JSON.stringify(destinations, null, 2) + ';\n';
  fs.writeFileSync(filePath, output);
  
  console.log("\nSuccessfully swapped " + swappedCount + " destinations.");
}

main();
