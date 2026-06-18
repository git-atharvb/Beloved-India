/**
 * Script to fix suspicious images found in the 720 destinations set.
 */
import fs from 'fs';

const USER_AGENT = 'BelovedIndiaApp/1.0 (contact@belovedindia.com)';

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// These are the 48 places that had maps, flags, portraits, logos, or fallbacks.
// We use a curated query to get an actual place photo.
const fixList = {
  'Halebidu': 'Halebidu Hoysaleswara Temple',
  'Chitrakoot Madhya Pradesh': 'Chitrakoot Madhya Pradesh tourism',
  'Churachandpur': 'Churachandpur Manipur scenery',
  'Tamenglong': 'Tamenglong Manipur nature',
  'Khoupum Valley': 'Khoupum Valley Manipur',
  'Umiam Lake': 'Umiam Lake Meghalaya',
  'Nongkhnum Island': 'Nongkhnum Island Meghalaya',
  'Mawryngkhang Trek': 'Mawryngkhang Trek bamboo bridge Meghalaya',
  'Serchhip': 'Serchhip Mizoram town',
  'Murlen National Park': 'Murlen National Park Mizoram',
  'Dimapur': 'Kachari Ruins Dimapur',
  'Mon': 'Mon Nagaland village',
  'Triple Falls Seithekima': 'Triple Falls Nagaland',
  'Japfu Peak': 'Japfu Peak Kohima',
  'Saramati Peak': 'Saramati Peak Nagaland',
  'Kapurthala': 'Jagatjit Palace Kapurthala',
  'Pemayangtse Monastery': 'Pemayangtse Monastery Sikkim',
  'Pichavaram': 'Pichavaram mangrove forest Tamil Nadu',
  'Hyderabad': 'Charminar Hyderabad city',
  'Medak': 'Medak Cathedral Telangana',
  'Kamalasagar': 'Kamalasagar Lake Tripura',
  'Bison National Park': 'Trishna Wildlife Sanctuary Tripura',
  'Rowa Wildlife Sanctuary': 'Rowa Wildlife Sanctuary Tripura',
  'Deotamura': 'Chabimura Deotamura Tripura rock carvings',
  'Lava Lolegaon': 'Lava Monastery West Bengal',
  'Viper Island': 'Viper Island Andaman',
  'Mount Harriet': 'Mount Harriet National Park Andaman',
  'Wandoor Beach': 'Wandoor Beach Andaman',
  'Rangat': 'Amkunj Beach Rangat Andaman',
  'Terrace Garden Chandigarh': 'Terrace Garden Chandigarh',
  'Nagoa Beach': 'Nagoa Beach Diu',
  'Diu': 'Diu Fort Gujarat India',
  'Dudhani': 'Dudhani Lake Silvassa',
  'St Paul Church Diu': 'St. Paul Church Diu',
  'Gangeshwar Temple Diu': 'Gangeshwar Mahadev Temple Diu',
  'INS Khukri Memorial': 'INS Khukri Memorial Diu',
  'Ghoghla Beach': 'Ghoghla Beach Diu',
  'Zampa Gateway': 'Zampa Gateway Diu',
  'Tribal Museum Silvassa': 'Tribal Museum Silvassa',
  'Satmaliya Deer Park': 'Satmaliya Deer Park Silvassa',
  'Kadmat Island': 'Kadmat Island Lakshadweep beach',
  'Amini': 'Amini Island Lakshadweep beach',
  'Thinnakara Island': 'Thinnakara Island Lakshadweep',
  'Marine Museum Kavaratti': 'Marine Museum Kavaratti Lakshadweep',
  'Kadmat Beach': 'Kadmat Beach Lakshadweep',
  'Sri Aurobindo Ashram': 'Sri Aurobindo Ashram Pondicherry building',
  'Chunnambar Boat House': 'Chunnambar Boat House Pondicherry',
  'Goubert Market': 'Goubert Market Pondicherry'
};

async function searchCommonsForImage(query) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=15&format=json`;
    const res = await fetch(searchUrl, { headers: { 'User-Agent': USER_AGENT } });
    const data = await res.json();
    
    if (!data.query || !data.query.search || data.query.search.length === 0) {
      return null;
    }

    const results = data.query.search;
    let bestResult = results.find(r => 
      (r.title.toLowerCase().endsWith('.jpg') || r.title.toLowerCase().endsWith('.jpeg')) &&
      !r.title.toLowerCase().includes('logo') &&
      !r.title.toLowerCase().includes('icon') &&
      !r.title.toLowerCase().includes('map') &&
      !r.title.toLowerCase().includes('flag') &&
      !r.title.toLowerCase().includes('stamp') &&
      !r.title.toLowerCase().includes('portrait') &&
      !r.title.toLowerCase().includes('coat_of_arms') &&
      !r.title.toLowerCase().includes('svg')
    );
    
    if (!bestResult) {
      bestResult = results[0];
    }
    
    const filename = bestResult.title;
    
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json`;
    const infoRes = await fetch(infoUrl, { headers: { 'User-Agent': USER_AGENT } });
    const infoData = await infoRes.json();
    const pages = infoData.query.pages;
    const pageId = Object.keys(pages)[0];
    
    if (pageId !== '-1' && pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
      return pages[pageId].imageinfo[0].thumburl || pages[pageId].imageinfo[0].url;
    }
    
    return null;
  } catch (e) {
    return null;
  }
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
    
    if (page.thumbnail && page.thumbnail.source) {
      return page.thumbnail.source;
    }
    return null;
  } catch (e) {
    return null;
  }
}

async function main() {
  const filePath = 'a:/WebDev/BelovedIndia/src/data/destinations.ts';
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const arrayMatch = content.match(/export const destinations: Destination\[\] = (\[[\s\S]*\]);/);
  if (!arrayMatch) return;
  
  let destinations = JSON.parse(arrayMatch[1]);
  
  const usedImages = new Set();
  destinations.forEach(d => {
    if (!fixList[d.name]) {
      usedImages.add(d.image);
    }
  });
  
  let fixedCount = 0;
  
  for (const dest of destinations) {
    if (!fixList[dest.name]) continue;
    
    const query = fixList[dest.name];
    console.log("Fixing: " + dest.name);
    
    await delay(400);
    
    let newImage = await searchCommonsForImage(query);
    
    if (!newImage || usedImages.has(newImage)) {
      await delay(300);
      newImage = await searchCommonsForImage(dest.name + ' India tourism');
      if (!newImage || usedImages.has(newImage)) {
        await delay(300);
        newImage = await searchWikipediaForImage(dest.name + ' ' + dest.state);
      }
    }
    
    if (newImage && !usedImages.has(newImage) && !newImage.toLowerCase().includes('map') && !newImage.toLowerCase().includes('flag') && !newImage.toLowerCase().includes('.svg') && !newImage.toLowerCase().includes('gateway_of_india')) {
      console.log("  Found: " + newImage);
      dest.image = newImage;
      usedImages.add(newImage);
      fixedCount++;
    } else {
      console.log("  Failed for " + dest.name);
    }
  }
  
  const header = "// Auto-generated 720 Destinations Data\nexport interface Destination {\n  id: number;\n  name: string;\n  state: string;\n  image: string;\n  description: string;\n  rating: number;\n}\n\nexport const destinations: Destination[] = ";
  
  const output = header + JSON.stringify(destinations, null, 2) + ';\n';
  fs.writeFileSync(filePath, output);
  
  console.log("Fixed " + fixedCount + " suspicious images.");
}

main();
