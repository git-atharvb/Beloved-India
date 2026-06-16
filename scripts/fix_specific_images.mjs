/**
 * Fix specific destination images that have irrelevant, wrong, or duplicate images.
 * 
 * Strategy:
 * 1. For each destination that needs fixing, use a curated search query
 * 2. Query Wikimedia Commons API to find a relevant .jpg image
 * 3. Get the verified thumbnail URL via imageinfo API
 * 4. Update destinations.ts with the correct image URLs
 */
import fs from 'fs';

const USER_AGENT = 'BelovedIndiaApp/1.0 (contact@belovedindia.com)';

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// Map of destination names to specific search queries for better results
// For entire states, we list all 10 places
const fixList = {
  // ===== ENTIRE STATES (all 10 cards) =====
  
  // Andaman and Nicobar Islands
  'Havelock Island': 'Havelock Island Andaman beach',
  'Cellular Jail': 'Cellular Jail Port Blair',
  'Neil Island': 'Neil Island Andaman',
  'Ross Island': 'Ross Island Andaman ruins',
  'Radhanagar Beach': 'Radhanagar Beach Havelock',
  'Port Blair': 'Port Blair Andaman city',
  'Baratang Island': 'Baratang Island mangrove limestone',
  'Elephant Beach': 'Elephant Beach Havelock coral',
  'Viper Island': 'Viper Island Andaman',
  'Mount Harriet': 'Mount Harriet Andaman',

  // Chandigarh
  'Rock Garden Chandigarh': 'Rock Garden Chandigarh Nek Chand',
  'Sukhna Lake': 'Sukhna Lake Chandigarh',
  'Rose Garden Chandigarh': 'Zakir Hussain Rose Garden Chandigarh',
  'Capitol Complex Chandigarh': 'Capitol Complex Chandigarh Le Corbusier',
  'Elante Mall': 'Elante Mall Chandigarh',
  'Government Museum Chandigarh': 'Government Museum and Art Gallery Chandigarh',
  'Open Hand Monument': 'Open Hand Monument Chandigarh',
  'Le Corbusier Centre': 'Le Corbusier Centre Chandigarh',
  'ChattBir Zoo': 'Chhatbir Zoo Chandigarh',

  // Chhattisgarh
  'Chitrakote Falls': 'Chitrakote Falls Bastar waterfall',
  'Bastar': 'Bastar Chhattisgarh tribal',
  'Raipur': 'Raipur Chhattisgarh city',
  'Sirpur': 'Sirpur Chhattisgarh ancient temple',
  'Jagdalpur': 'Jagdalpur Chhattisgarh',
  'Bilaspur': 'Bilaspur Chhattisgarh city',
  'Mainpat': 'Mainpat Chhattisgarh hill station',
  'Kanger Ghati National Park': 'Kanger Valley National Park cave',
  'Tirathgarh Falls': 'Tirathgarh Falls Chhattisgarh waterfall',
  'Bhilai': 'Bhilai Chhattisgarh steel city',

  // Dadra and Nagar Haveli and Daman and Diu
  'Diu Fort': 'Diu Fort Gujarat India',
  'Nagoa Beach': 'Nagoa Beach Diu',
  'Devka Beach': 'Devka Beach Daman India',
  'Jampore Beach': 'Jampore Beach Daman India',
  'Vanganga Lake': 'Vanganga Lake Garden Silvassa',
  'Silvassa': 'Silvassa Dadra Nagar Haveli',
  'Daman': 'Daman India Portuguese',
  'Diu': 'Diu island Gujarat India',
  'Dudhani': 'Dudhani Lake Silvassa',
  'Moti Daman Fort': 'Moti Daman Fort',

  // Lakshadweep
  'Agatti Island': 'Agatti Island Lakshadweep lagoon',
  'Bangaram Atoll': 'Bangaram Atoll Lakshadweep',
  'Kavaratti': 'Kavaratti Lakshadweep',
  'Minicoy': 'Minicoy Island Lakshadweep lighthouse',
  'Kalpeni': 'Kalpeni Island Lakshadweep',
  'Kadmat Island': 'Kadmat Island Lakshadweep',
  'Amini': 'Amini Island Lakshadweep',
  'Andrott': 'Andrott Island Lakshadweep',
  'Bitra': 'Bitra Island Lakshadweep',
  'Chetlat Island': 'Chetlat Island Lakshadweep',

  // Jharkhand
  'Ranchi': 'Ranchi Jharkhand Tagore Hill',
  'Deoghar': 'Baidyanath Dham Deoghar temple',
  'Jamshedpur': 'Jamshedpur Jubilee Park Jharkhand',
  'Hazaribagh': 'Hazaribagh National Park Jharkhand',
  'Netarhat': 'Netarhat hill station Jharkhand sunrise',
  'Betla National Park': 'Betla National Park Jharkhand',
  'Dhanbad': 'Dhanbad Jharkhand coal',
  'Bokaro': 'Bokaro Steel City Jharkhand',
  'Parasnath Hills': 'Parasnath Hill Jharkhand Jain temple',
  'Giridih': 'Giridih Jharkhand',

  // ===== SPECIFIC CARDS =====
  
  // Uttar Pradesh
  'Taj Mahal': 'Taj Mahal Agra sunrise',
  'Agra Fort': 'Agra Fort India Mughal',

  // Telangana
  'Nizamabad': 'Nizamabad Fort Telangana',

  // Tamil Nadu
  'Rameswaram': 'Ramanathaswamy Temple Rameswaram corridor',
  'Thanjavur': 'Brihadeeswarar Temple Thanjavur',

  // Punjab
  'Kapurthala': 'Jagatjit Palace Kapurthala Punjab',

  // Puducherry
  'Sri Aurobindo Ashram': 'Sri Aurobindo Ashram Pondicherry',
  'Arikamedu': 'Arikamedu Puducherry archaeological',

  // Odisha
  'Chandipur': 'Chandipur Beach Odisha',

  // Nagaland
  'Mon': 'Mon Nagaland Konyak tribe',
  'Dimapur': 'Dimapur Nagaland ruins',

  // Mizoram
  'Serchhip': 'Serchhip Mizoram town',

  // Meghalaya
  'Cherrapunji': 'Cherrapunji Sohra Meghalaya waterfall',
  'Nongriat': 'Nongriat Living Root Bridge Meghalaya',

  // Manipur
  'Churachandpur': 'Churachandpur Manipur hill',
  'Tamenglong': 'Tamenglong Manipur Zeilad Lake',
  'Kangpokpi': 'Kangpokpi Manipur hills',

  // Karnataka
  'Chikmagalur': 'Chikmagalur coffee plantation Karnataka hills',
};

// For Pinjore Gardens (appears in both Chandigarh and Haryana), only fix the Chandigarh one
// We'll handle this by checking state too

async function searchCommonsForImage(query) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=10&format=json`;
    const res = await fetch(searchUrl, { headers: { 'User-Agent': USER_AGENT } });
    const data = await res.json();
    
    if (!data.query || !data.query.search || data.query.search.length === 0) {
      return null;
    }

    // Prefer .jpg/.jpeg files
    const results = data.query.search;
    let bestResult = results.find(r => 
      (r.title.toLowerCase().endsWith('.jpg') || r.title.toLowerCase().endsWith('.jpeg')) &&
      !r.title.toLowerCase().includes('logo') &&
      !r.title.toLowerCase().includes('icon') &&
      !r.title.toLowerCase().includes('map') &&
      !r.title.toLowerCase().includes('flag') &&
      !r.title.toLowerCase().includes('stamp') &&
      !r.title.toLowerCase().includes('coat_of_arms')
    );
    
    if (!bestResult) {
      bestResult = results[0];
    }
    
    const filename = bestResult.title;
    
    // Get the actual thumbnail URL via imageinfo API
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
    console.error(`  Commons search failed for "${query}":`, e.message);
    return null;
  }
}

async function searchWikipediaForImage(place, state) {
  try {
    // Search Wikipedia for the place
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(place + ' ' + state)}&format=json`;
    const res = await fetch(searchUrl, { headers: { 'User-Agent': USER_AGENT } });
    const data = await res.json();
    
    if (!data.query || !data.query.search || data.query.search.length === 0) {
      return null;
    }
    
    const pageid = data.query.search[0].pageid;
    
    // Get page image
    const pageUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&pageids=${pageid}&pithumbsize=1280&format=json`;
    const pageRes = await fetch(pageUrl, { headers: { 'User-Agent': USER_AGENT } });
    const pageData = await pageRes.json();
    const page = pageData.query.pages[pageid];
    
    if (page.thumbnail && page.thumbnail.source) {
      return page.thumbnail.source;
    }
    
    return null;
  } catch (e) {
    console.error(`  Wikipedia search failed for "${place}":`, e.message);
    return null;
  }
}

async function main() {
  // Read current destinations.ts
  const filePath = 'a:/WebDev/BelovedIndia/src/data/destinations.ts';
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Parse the destinations array
  const arrayMatch = content.match(/export const destinations: Destination\[\] = (\[[\s\S]*\]);/);
  if (!arrayMatch) {
    console.error('Could not parse destinations array!');
    return;
  }
  
  let destinations;
  try {
    destinations = JSON.parse(arrayMatch[1]);
  } catch (e) {
    console.error('JSON parse error:', e.message);
    return;
  }
  
  console.log(`Loaded ${destinations.length} destinations.`);
  
  // Track which images we've already used (to avoid duplicates)
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
    console.log(`\nFixing: ${dest.name} (${dest.state})`);
    console.log(`  Search query: "${query}"`);
    
    await delay(500); // Rate limiting
    
    // Try Wikimedia Commons first (usually better quality images)
    let newImage = await searchCommonsForImage(query);
    
    if (!newImage || usedImages.has(newImage)) {
      console.log(`  Trying alternative Commons search...`);
      await delay(300);
      // Try with just the place name
      newImage = await searchCommonsForImage(dest.name + ' India tourism');
      
      if (!newImage || usedImages.has(newImage)) {
        console.log(`  Trying Wikipedia...`);
        await delay(300);
        newImage = await searchWikipediaForImage(dest.name, dest.state);
      }
    }
    
    if (newImage && !usedImages.has(newImage)) {
      console.log(`  ✅ Found: ${newImage.substring(0, 80)}...`);
      dest.image = newImage;
      usedImages.add(newImage);
      fixedCount++;
    } else if (newImage) {
      console.log(`  ⚠️ Image was duplicate, keeping current`);
    } else {
      console.log(`  ❌ No suitable image found, keeping current`);
    }
  }
  
  // Write back
  const header = `// Auto-generated 360 Destinations Data
export interface Destination {
  id: number;
  name: string;
  state: string;
  image: string;
  description: string;
  rating: number;
}

export const destinations: Destination[] = `;
  
  const output = header + JSON.stringify(destinations, null, 2) + ';\n';
  fs.writeFileSync(filePath, output);
  
  console.log(`\n========================================`);
  console.log(`Fixed ${fixedCount} destination images.`);
  console.log(`========================================`);
}

main();
