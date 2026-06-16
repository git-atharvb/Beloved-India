import fs from 'fs';

const placesDict = {
  // 28 States
  'Andhra Pradesh': ['Tirupati', 'Araku Valley', 'Visakhapatnam', 'Amaravati', 'Srisailam', 'Rajahmundry', 'Vijayawada', 'Kurnool', 'Lepakshi', 'Papikondalu'],
  'Arunachal Pradesh': ['Tawang', 'Ziro', 'Namdapha National Park', 'Sela Pass', 'Bomdila', 'Itanagar', 'Roing', 'Dirang', 'Pasighat', 'Bhalukpong'],
  'Assam': ['Kaziranga National Park', 'Majuli', 'Kamakhya Temple', 'Manas National Park', 'Guwahati', 'Sivasagar', 'Tezpur', 'Dibrugarh', 'Jorhat', 'Hajo'],
  'Bihar': ['Bodh Gaya', 'Nalanda', 'Rajgir', 'Patna', 'Vaishali', 'Pawapuri', 'Vikramashila', 'Sasaram', 'Madhubani', 'Sonepur'],
  'Chhattisgarh': ['Chitrakote Falls', 'Bastar', 'Raipur', 'Sirpur', 'Jagdalpur', 'Bilaspur', 'Mainpat', 'Kanger Ghati National Park', 'Tirathgarh Falls', 'Bhilai'],
  'Goa': ['Baga Beach', 'Palolem Beach', 'Dudhsagar Falls', 'Basilica of Bom Jesus', 'Calangute Beach', 'Fort Aguada', 'Anjuna Beach', 'Panaji', 'Vagator Beach', 'Chapora Fort'],
  'Gujarat': ['Rann of Kutch', 'Gir National Park', 'Somnath temple', 'Dwarka', 'Statue of Unity', 'Ahmedabad', 'Champaner', 'Saputara', 'Lothal', 'Rani ki vav'],
  'Haryana': ['Kurukshetra', 'Sultanpur National Park', 'Panipat', 'Faridabad', 'Pinjore Gardens', 'Surajkund', 'Morni Hills', 'Hisar', 'Rohtak', 'Ambala'],
  'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Dalhousie', 'Spiti Valley', 'Kullu', 'Kasol', 'Kasauli', 'Rohtang Pass', 'Khajjiar'],
  'Jharkhand': ['Ranchi', 'Deoghar', 'Jamshedpur', 'Hazaribagh', 'Netarhat', 'Betla National Park', 'Dhanbad', 'Bokaro', 'Parasnath Hills', 'Giridih'],
  'Karnataka': ['Mysore Palace', 'Hampi', 'Coorg', 'Bangalore', 'Gokarna', 'Chikmagalur', 'Bandipur National Park', 'Badami', 'Udupi', 'Murdeshwar'],
  'Kerala': ['Munnar', 'Alleppey', 'Wayanad', 'Kochi', 'Thekkady', 'Kovalam', 'Kumarakom', 'Varkala', 'Thiruvananthapuram', 'Athirappilly Falls'],
  'Madhya Pradesh': ['Khajuraho', 'Bandhavgarh National Park', 'Kanha Tiger Reserve', 'Gwalior Fort', 'Sanchi', 'Ujjain', 'Pachmarhi', 'Bhimbetka', 'Mandu', 'Jabalpur'],
  'Maharashtra': ['Gateway of India', 'Ajanta Caves', 'Ellora Caves', 'Mahabaleshwar', 'Lonavala', 'Pune', 'Nashik', 'Aurangabad', 'Shirdi', 'Tadoba Andhari'],
  'Manipur': ['Loktak Lake', 'Imphal', 'Keibul Lamjao National Park', 'Ukhrul', 'Bishnupur', 'Senapati', 'Churachandpur', 'Thoubal', 'Tamenglong', 'Kangpokpi'],
  'Meghalaya': ['Cherrapunji', 'Shillong', 'Mawlynnong', 'Dawki', 'Nongriat', 'Elephant Falls', 'Umiam Lake', 'Nohkalikai Falls', 'Mawsynram', 'Balpakram National Park'],
  'Mizoram': ['Aizawl', 'Champhai', 'Vantawng Falls', 'Phawngpui', 'Lunglei', 'Serchhip', 'Kolasib', 'Mamit', 'Lawngtlai', 'Siaha'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Wokha', 'Mon', 'Phek', 'Kiphire', 'Tuensang', 'Zunheboto', 'Dzukou Valley'],
  'Odisha': ['Puri', 'Konark Sun Temple', 'Bhubaneswar', 'Chilika Lake', 'Simlipal National Park', 'Cuttack', 'Bhitarkanika National Park', 'Gopalpur', 'Chandipur', 'Udayagiri and Khandagiri'],
  'Punjab': ['Golden Temple', 'Jallianwala Bagh', 'Wagah Border', 'Ludhiana', 'Jalandhar', 'Patiala', 'Anandpur Sahib', 'Bathinda', 'Kapurthala', 'Pathankot'],
  'Rajasthan': ['Jaipur', 'Udaipur', 'Jaisalmer', 'Jodhpur', 'Pushkar', 'Mount Abu', 'Ranthambore National Park', 'Bikaner', 'Chittorgarh', 'Ajmer'],
  'Sikkim': ['Gangtok', 'Nathu La', 'Pelling', 'Lachung', 'Yumthang Valley', 'Gurudongmar Lake', 'Tsomgo Lake', 'Ravangla', 'Namchi', 'Zuluk'],
  'Tamil Nadu': ['Meenakshi Temple', 'Ooty', 'Mahabalipuram', 'Kanyakumari', 'Chennai', 'Kodaikanal', 'Rameswaram', 'Madurai', 'Thanjavur', 'Coimbatore'],
  'Telangana': ['Charminar', 'Golconda Fort', 'Ramoji Film City', 'Warangal', 'Nagarjuna Sagar Dam', 'Hyderabad', 'Bhadrachalam', 'Medak', 'Nizamabad', 'Khammam'],
  'Tripura': ['Agartala', 'Neermahal', 'Unakoti', 'Ujjayanta Palace', 'Sepahijala', 'Tripura Sundari Temple', 'Jampui Hills', 'Kailashahar', 'Dharmanagar', 'Udaipur Tripura'],
  'Uttar Pradesh': ['Taj Mahal', 'Varanasi', 'Agra Fort', 'Fatehpur Sikri', 'Mathura', 'Vrindavan', 'Lucknow', 'Allahabad', 'Sarnath', 'Ayodhya'],
  'Uttarakhand': ['Rishikesh', 'Nainital', 'Mussoorie', 'Haridwar', 'Jim Corbett National Park', 'Badrinath', 'Kedarnath', 'Auli', 'Valley of Flowers', 'Dehradun'],
  'West Bengal': ['Darjeeling', 'Sundarbans', 'Victoria Memorial', 'Howrah Bridge', 'Digha', 'Siliguri', 'Kalimpong', 'Murshidabad', 'Bishnupur Bankura', 'Shantiniketan'],
  
  // 8 Union Territories
  'Andaman and Nicobar Islands': ['Havelock Island', 'Cellular Jail', 'Neil Island', 'Ross Island', 'Radhanagar Beach', 'Port Blair', 'Baratang Island', 'Elephant Beach', 'Viper Island', 'Mount Harriet'],
  'Chandigarh': ['Rock Garden Chandigarh', 'Sukhna Lake', 'Rose Garden Chandigarh', 'Capitol Complex Chandigarh', 'Elante Mall', 'Pinjore Gardens', 'Government Museum Chandigarh', 'Open Hand Monument', 'Le Corbusier Centre', 'ChattBir Zoo'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Diu Fort', 'Nagoa Beach', 'Devka Beach', 'Jampore Beach', 'Vanganga Lake', 'Silvassa', 'Daman', 'Diu', 'Dudhani', 'Moti Daman Fort'],
  'Delhi': ["Red Fort", "Qutb Minar", "India Gate", "Humayun's Tomb", "Lotus Temple", "Akshardham", "Jama Masjid", "Rashtrapati Bhavan", "Chandni Chowk", "Jantar Mantar"],
  'Jammu and Kashmir': ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Vaishno Devi', 'Dal Lake', 'Amarnath Temple', 'Patnitop', 'Jammu', 'Yousmarg'],
  'Ladakh': ['Pangong Tso', 'Nubra Valley', 'Leh Palace', 'Thiksey Monastery', 'Magnetic Hill', 'Khardung La', 'Hemis Monastery', 'Zanskar', 'Tso Moriri', 'Diskit Monastery'],
  'Lakshadweep': ['Agatti Island', 'Bangaram Atoll', 'Kavaratti', 'Minicoy', 'Kalpeni', 'Kadmat Island', 'Amini', 'Andrott', 'Bitra', 'Chetlat Island'],
  'Puducherry': ['Promenade Beach', 'Auroville', 'Sri Aurobindo Ashram', 'Paradise Beach', 'Sacred Heart Jesus Puducherry', 'Arikamedu', 'Ousteri Lake', 'Chunnambar Boat House', 'French Quarter Puducherry', 'Serenity Beach']
};

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function cleanDescription(extract) {
  if (!extract) return null;
  // Remove text inside parentheses e.g. (Hindi: [xyz])
  let text = extract.replace(/\([^)]*\)/g, '').trim();
  // Remove phonetic symbols and brackets like [a.b.c]
  text = text.replace(/\[[^\]]+\]/g, '').trim();
  text = text.replace(/\s{2,}/g, ' ');
  // Remove dangling punctuation at the start if any
  text = text.replace(/^[.,;:!?]\s*/, '');
  // Get first sentence
  const match = text.match(/^[^.!?]+[.!?]/);
  if (match && match[0].length > 30) {
    return match[0].trim();
  }
  return null;
}

const USER_AGENT = 'BelovedIndiaApp/1.0 (contact@belovedindia.com)';

async function searchWiki(query) {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json`;
  try {
    const res = await fetch(searchUrl, { headers: { 'User-Agent': USER_AGENT } });
    const data = await res.json();
    if (data.query && data.query.search && data.query.search.length > 0) {
      return data.query.search[0].pageid;
    }
  } catch(e) {}
  return null;
}

async function fetchWikiData(pageid) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro=1&explaintext=1&pageids=${pageid}&pithumbsize=1280&format=json`;
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    const data = await res.json();
    const page = data.query.pages[pageid];
    const desc = cleanDescription(page.extract);
    let img = null;
    if (page.thumbnail && page.thumbnail.source) {
      img = page.thumbnail.source;
    }
    return { desc, img };
  } catch (e) {
    return null;
  }
}

import crypto from 'crypto';

function getWikimediaCDNUrl(filename, width = 1280) {
  const cleanName = filename.replace('File:', '').replace(/ /g, '_');
  const hash = crypto.createHash('md5').update(cleanName).digest('hex');
  const h1 = hash[0];
  const h2 = hash.substring(0, 2);
  const encodedName = encodeURIComponent(cleanName).replace(/%2B/g, '+');
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${h1}/${h2}/${encodedName}/${width}px-${encodedName}`;
}

async function build() {
  const destinations = [];
  let id = 1;
  for (const [state, places] of Object.entries(placesDict)) {
    console.log(`Processing ${state}...`);
    for (const place of places) {
      await delay(400);
      let desc = null;
      let img = null;
      let pageid = await searchWiki(`${place} ${state}`);
      if (!pageid) {
        pageid = await searchWiki(`${place} India`);
      }
      if (pageid) {
        const data = await fetchWikiData(pageid);
        if (data) {
          desc = data.desc;
          img = data.img;
        }
      }
      if (!desc || desc.length < 15) {
        desc = `${place} is a highly sought-after destination in ${state}, renowned for its rich heritage and breathtaking sights.`;
      }
      if (!img) {
        try {
          const commonSearch = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(place + ' India')}&srnamespace=6&format=json`;
          const csRes = await fetch(commonSearch, { headers: { 'User-Agent': USER_AGENT } });
          const csData = await csRes.json();
          if (csData.query && csData.query.search && csData.query.search.length > 0) {
            let filename = csData.query.search[0].title.replace('File:', '').trim();
            const jpg = csData.query.search.find(s => s.title.toLowerCase().endsWith('.jpg') || s.title.toLowerCase().endsWith('.jpeg'));
            if (jpg) {
              filename = jpg.title.replace('File:', '').trim();
            }
            const imgInfoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json`;
            const infoRes = await fetch(imgInfoUrl, { headers: { 'User-Agent': USER_AGENT } });
            const infoData = await infoRes.json();
            const infoPages = infoData.query.pages;
            const infoPageId = Object.keys(infoPages)[0];
            if (infoPages[infoPageId].imageinfo && infoPages[infoPageId].imageinfo.length > 0) {
              img = infoPages[infoPageId].imageinfo[0].thumburl;
            }
          }
        } catch(e) {
          console.error(`Fallback image search failed for ${place}:`, e.message);
        }
      }
      if (!img) {
        img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/1280px-Mumbai_03-2016_30_Gateway_of_India.jpg';
      }
      const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
      destinations.push({
        id: id++,
        name: place,
        state: state,
        image: img,
        description: desc,
        rating: parseFloat(rating)
      });
    }
  }
  const output = `// Auto-generated 360 Destinations Data\nexport interface Destination {\n  id: number;\n  name: string;\n  state: string;\n  image: string;\n  description: string;\n  rating: number;\n}\n\nexport const destinations: Destination[] = ${JSON.stringify(destinations, null, 2)};\n`;
  fs.writeFileSync('a:/WebDev/BelovedIndia/src/data/destinations.ts', output);
  console.log('Successfully wrote 360 destinations to src/data/destinations.ts');
}

build();
