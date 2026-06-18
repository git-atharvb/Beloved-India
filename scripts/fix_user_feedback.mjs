/**
 * Script to fix specific images reported by user as irrelevant or maps.
 */
import fs from 'fs';

const USER_AGENT = 'BelovedIndiaApp/1.0 (contact@belovedindia.com)';

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

const replacements = {
  'Viper Island': { query: 'Viper Island Andaman ruins', state: 'Andaman and Nicobar Islands' },
  'Chidiya Tapu': { query: 'Chidiya Tapu sunset', state: 'Andaman and Nicobar Islands' },
  'Corbyn Cove Beach': { query: "Corbyn's Cove Beach", state: 'Andaman and Nicobar Islands' },
  'Borra Caves': { query: 'Borra Caves inside stalactites', state: 'Andhra Pradesh' },
  'Mantralayam': { query: 'Mantralayam Temple', state: 'Andhra Pradesh' },
  'Pakke Tiger Reserve': { query: 'Pakke Tiger Reserve nature', state: 'Arunachal Pradesh' },
  'Sivasagar': { query: 'Shivadol Sivasagar OR Rang Ghar Sivasagar', state: 'Assam' },
  'Lauriya Nandangarh': { query: 'Lauriya Nandangarh pillar', state: 'Bihar' },
  'Rajnagar': { query: 'Navlakha Palace Rajnagar Bihar', state: 'Bihar' },
  'Pinjore Gardens': { query: 'Pinjore Gardens Haryana', state: 'Chandigarh' },
  'Diu Museum': { query: 'St Thomas Church Diu Museum', state: 'Dadra and Nagar Haveli and Daman and Diu' },
  'Churches in Dadra and Nagar Haveli and Daman and Diu': { rename: 'Our Lady of Piety Church', query: 'Our Lady of Piety Church Silvassa', state: 'Dadra and Nagar Haveli and Daman and Diu' },
  'Churches in Dadra and Nagar Haveli and Daman and Diu Dadra and Nagar Haveli and Daman and Diu': { rename: 'Jalandhar Shrine Diu', query: 'Jalandhar Shrine Diu', state: 'Dadra and Nagar Haveli and Daman and Diu' },
  'Divar Island': { query: 'Divar Island Goa church', state: 'Goa' },
  'Bhuj': { query: 'Prag Mahal Bhuj', state: 'Gujarat' },
  'Panipat': { query: 'Ibrahim Lodhi Tomb Panipat', state: 'Haryana' },
  'Tikli Bottom': { rename: 'Damdama Lake', query: 'Damdama Lake Haryana', state: 'Haryana' },
  'Karnal': { query: 'Karna Lake Karnal', state: 'Haryana' },
  'Ranchi': { query: 'Ranchi city OR Dassam Falls Ranchi', state: 'Jharkhand' },
  'Hazaribagh': { query: 'Hazaribagh National Park', state: 'Jharkhand' },
  'Isco Rock Painting': { rename: 'Maithon Dam', query: 'Maithon Dam Jharkhand', state: 'Jharkhand' },
  'Chikmagalur': { query: 'Chikmagalur tea estate hills', state: 'Karnataka' },
  'Bijapur': { query: 'Gol Gumbaz Bijapur', state: 'Karnataka' },
  'Changthang Plateau': { query: 'Changthang Ladakh landscape', state: 'Ladakh' },
  'Bangaram Atoll': { query: 'Bangaram island beach', state: 'Lakshadweep' },
  'Andrott': { query: 'Andrott island', state: 'Lakshadweep' },
  'Bitra': { rename: 'Chetlat Island', query: 'Lakshadweep coral beach', state: 'Lakshadweep' },
  'Suheli Par': { query: 'Lakshadweep lagoon', state: 'Lakshadweep' },
  'Bangaram Beach': { query: 'Bangaram beach resort', state: 'Lakshadweep' },
  'Minicoy Lighthouse': { query: 'Minicoy Lighthouse Lakshadweep', state: 'Lakshadweep' },
  'Shirdi': { query: 'Sai Baba Temple Shirdi', state: 'Maharashtra' },
  'Alibag': { query: 'Alibag beach OR Kolaba Fort', state: 'Maharashtra' },
  'Kangpokpi': { rename: 'Sadu Chiru Waterfall', query: 'Sadu Chiru Waterfall Manipur', state: 'Manipur' },
  'Moreh': { rename: 'Khongjom War Memorial', query: 'Khongjom War Memorial Manipur', state: 'Manipur' },
  'Cherrapunji': { query: 'Nohkalikai Falls Cherrapunji', state: 'Meghalaya' },
  'Tamdil Lake': { query: 'Tam Dil lake Mizoram', state: 'Mizoram' },
  'Teunsang': { rename: 'Tuensang', query: 'Tuensang Nagaland village', state: 'Nagaland' },
  'Tuensang': { query: 'Tuensang Nagaland village', state: 'Nagaland' },
  'Longwa Village': { query: 'Longwa village Nagaland', state: 'Nagaland' },
  'Bhubhneshwar': { rename: 'Bhubaneswar', query: 'Lingaraj Temple Bhubaneswar', state: 'Odisha' },
  'Bhubaneswar': { query: 'Lingaraj Temple Bhubaneswar', state: 'Odisha' },
  'Chandipur': { query: 'Chandipur beach Odisha', state: 'Odisha' },
  'Arikamedu': { query: 'Arikamedu ruins Pondicherry', state: 'Puducherry' },
  'Frencher Quarter': { rename: 'French Quarter', query: 'White Town Pondicherry', state: 'Puducherry' },
  'French Quarter': { query: 'White Town Pondicherry', state: 'Puducherry' },
  'Bundi': { query: 'Taragarh Fort Bundi', state: 'Rajasthan' },
  'Kaluk': { query: 'Kaluk Sikkim landscape', state: 'Sikkim' },
  'Lachen': { query: 'Lachen Sikkim village', state: 'Sikkim' },
  'Mahabalipuram': { query: 'Shore Temple Mahabalipuram', state: 'Tamil Nadu' },
  'Rameswaram': { query: 'Ramanathaswamy Temple Rameswaram', state: 'Tamil Nadu' },
  'Thanjavur': { query: 'Brihadeeswarar Temple Thanjavur', state: 'Tamil Nadu' },
  'Nizamabad': { query: 'Nizamabad Fort Telangana', state: 'Telangana' },
  'Udaipur Tripura': { query: 'Neermahal Palace Tripura', state: 'Tripura' },
  'Dharinjoy': { rename: 'Unakoti Rock Carvings', query: 'Unakoti Rock Carvings Tripura', state: 'Tripura' },
  'Allahabad': { query: 'Triveni Sangam Prayagraj', state: 'Uttar Pradesh' },
  'Chunnar Fort': { rename: 'Chunar Fort', query: 'Chunar Fort Uttar Pradesh', state: 'Uttar Pradesh' },
  'Chunar Fort': { query: 'Chunar Fort Uttar Pradesh', state: 'Uttar Pradesh' }
};

async function fetchGoodImage(query) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=15&format=json`;
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
    
    await delay(300);
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(bestResult.title)}&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json`;
    const infoRes = await fetch(infoUrl, { headers: { 'User-Agent': USER_AGENT } });
    const infoData = await infoRes.json();
    const pages = infoData.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== '-1' && pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
      return pages[pageId].imageinfo[0].thumburl || pages[pageId].imageinfo[0].url;
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
  let fixedCount = 0;
  
  const usedImages = new Set();
  destinations.forEach(d => usedImages.add(d.image));

  for (const d of destinations) {
    const target = replacements[d.name] || replacements[d.name.trim()];
    if (target) {
      console.log(`Fixing: ${d.name}`);
      const newName = target.rename || d.name;
      
      let img = await fetchGoodImage(target.query);
      if (!img || usedImages.has(img)) {
         await delay(300);
         img = await fetchGoodImage(newName + " tourism");
      }
      if (!img || usedImages.has(img)) {
         await delay(300);
         img = await fetchGoodImage(target.state + " beautiful");
      }

      if (img && !img.includes('.pdf') && !img.includes('gateway_of_india')) {
        d.name = newName;
        d.image = img;
        usedImages.add(img);
        console.log(`  ✅ Fixed with: ${img}`);
        fixedCount++;
      } else {
        console.log(`  ❌ Failed to fetch clean image for ${d.name}`);
      }
    }
  }
  
  const header = "// Auto-generated 720 Destinations Data\nexport interface Destination {\n  id: number;\n  name: string;\n  state: string;\n  image: string;\n  description: string;\n  rating: number;\n}\n\nexport const destinations: Destination[] = ";
  
  const output = header + JSON.stringify(destinations, null, 2) + ';\n';
  fs.writeFileSync(filePath, output);
  
  console.log(`\nFixed ${fixedCount} specific user-requested cards.`);
}

main();
