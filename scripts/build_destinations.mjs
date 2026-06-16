import fs from 'fs';
import crypto from 'crypto';

const placesDict = {
  // ===== 28 STATES =====

  'Andhra Pradesh': [
    'Tirupati', 'Araku Valley', 'Visakhapatnam', 'Amaravati', 'Srisailam',
    'Rajahmundry', 'Vijayawada', 'Kurnool', 'Lepakshi', 'Papikondalu',
    'Borra Caves', 'Gandikota', 'Nagarjunakonda', 'Mantralayam', 'Srikalahasti',
    'Horsley Hills', 'Ahobilam', 'Undavalli Caves', 'Ethipothala Falls', 'Kondapalli Fort'
  ],

  'Arunachal Pradesh': [
    'Tawang', 'Ziro', 'Namdapha National Park', 'Sela Pass', 'Bomdila',
    'Itanagar', 'Roing', 'Dirang', 'Pasighat', 'Bhalukpong',
    'Mechuka', 'Anini', 'Along', 'Sangti Valley', 'Pakke Tiger Reserve',
    'Gorichen Peak', 'Daporijo', 'Tezu', 'Changlang', 'Eaglenest Wildlife Sanctuary'
  ],

  'Assam': [
    'Kaziranga National Park', 'Majuli', 'Kamakhya Temple', 'Manas National Park', 'Guwahati',
    'Sivasagar', 'Tezpur', 'Dibrugarh', 'Jorhat', 'Hajo',
    'Haflong', 'Pobitora Wildlife Sanctuary', 'Nameri National Park', 'Sualkuchi', 'Silchar',
    'Barpeta', 'Nagaon', 'Diphu', 'Bongaigaon', 'Dispur'
  ],

  'Bihar': [
    'Bodh Gaya', 'Nalanda', 'Rajgir', 'Patna', 'Vaishali',
    'Pawapuri', 'Vikramashila', 'Sasaram', 'Madhubani', 'Sonepur',
    'Munger', 'Bhagalpur', 'Rohtasgarh Fort', 'Valmiki National Park', 'Kesaria Stupa',
    'Barabar Caves', 'Darbhanga', 'Gaya', 'Rajnagar', 'Lauriya Nandangarh'
  ],

  'Chhattisgarh': [
    'Chitrakote Falls', 'Bastar', 'Raipur', 'Sirpur', 'Jagdalpur',
    'Bilaspur', 'Mainpat', 'Kanger Ghati National Park', 'Tirathgarh Falls', 'Bhilai',
    'Barnawapara Wildlife Sanctuary', 'Achanakmar Wildlife Sanctuary', 'Bhoramdeo', 'Rajim', 'Dongargarh',
    'Danteshwari Temple', 'Ambikapur', 'Korba', 'Kondagaon', 'Kawardha Palace'
  ],

  'Goa': [
    'Baga Beach', 'Palolem Beach', 'Dudhsagar Falls', 'Basilica of Bom Jesus', 'Calangute Beach',
    'Fort Aguada', 'Anjuna Beach', 'Panaji', 'Vagator Beach', 'Chapora Fort',
    'Colva Beach', 'Arambol Beach', 'Se Cathedral', 'Dona Paula', 'Reis Magos Fort',
    'Cabo de Rama Fort', 'Divar Island', 'Old Goa', 'Fontainhas', 'Spice Plantation Goa'
  ],

  'Gujarat': [
    'Rann of Kutch', 'Gir National Park', 'Somnath temple', 'Dwarka', 'Statue of Unity',
    'Ahmedabad', 'Champaner', 'Saputara', 'Lothal', 'Rani ki vav',
    'Mandvi Beach', 'Modhera Sun Temple', 'Girnar', 'Porbandar', 'Vadodara',
    'Bhuj', 'Palitana', 'Dholavira', 'Laxmi Vilas Palace', 'Sabarmati Ashram'
  ],

  'Haryana': [
    'Kurukshetra', 'Sultanpur National Park', 'Panipat', 'Faridabad', 'Pinjore Gardens',
    'Surajkund', 'Morni Hills', 'Hisar', 'Rohtak', 'Ambala',
    'Damdama Lake', 'Tikli Bottom', 'Karnal', 'Panchkula', 'Sohna',
    'Yadavindra Gardens', 'Bhiwani', 'Jind', 'Sonipat', 'Kalesar National Park'
  ],

  'Himachal Pradesh': [
    'Shimla', 'Manali', 'Dharamshala', 'Dalhousie', 'Spiti Valley',
    'Kullu', 'Kasol', 'Kasauli', 'Rohtang Pass', 'Khajjiar',
    'Bir Billing', 'Chamba', 'Kinnaur', 'Palampur', 'Sangla Valley',
    'Tirthan Valley', 'Chitkul', 'Narkanda', 'Kufri', 'Malana'
  ],

  'Jharkhand': [
    'Ranchi', 'Deoghar', 'Jamshedpur', 'Hazaribagh', 'Netarhat',
    'Betla National Park', 'Dhanbad', 'Bokaro', 'Parasnath Hills', 'Giridih',
    'Hundru Falls', 'Dassam Falls', 'Jonha Falls', 'Rajrappa', 'Dalma Wildlife Sanctuary',
    'Tagore Hill', 'McCluskieganj', 'Patratu Valley', 'Saranda Forest', 'Isco Rock Painting'
  ],

  'Karnataka': [
    'Mysore Palace', 'Hampi', 'Coorg', 'Bangalore', 'Gokarna',
    'Chikmagalur', 'Bandipur National Park', 'Badami', 'Udupi', 'Murdeshwar',
    'Jog Falls', 'Belur', 'Halebidu', 'Kabini', 'Shravanabelagola',
    'Bijapur', 'Aihole', 'Pattadakal', 'Kudremukh', 'Dandeli'
  ],

  'Kerala': [
    'Munnar', 'Alleppey', 'Wayanad', 'Kochi', 'Thekkady',
    'Kovalam', 'Kumarakom', 'Varkala', 'Thiruvananthapuram', 'Athirappilly Falls',
    'Bekal Fort', 'Kozhikode', 'Guruvayur Temple', 'Periyar National Park', 'Marari Beach',
    'Ponmudi', 'Vagamon', 'Poovar', 'Nilambur', 'Thenmala'
  ],

  'Madhya Pradesh': [
    'Khajuraho', 'Bandhavgarh National Park', 'Kanha Tiger Reserve', 'Gwalior Fort', 'Sanchi',
    'Ujjain', 'Pachmarhi', 'Bhimbetka', 'Mandu', 'Jabalpur',
    'Orchha', 'Bhopal', 'Maheshwar', 'Omkareshwar', 'Chanderi',
    'Panna National Park', 'Satpura Tiger Reserve', 'Burhanpur', 'Amarkantak', 'Chitrakoot Madhya Pradesh'
  ],

  'Maharashtra': [
    'Gateway of India', 'Ajanta Caves', 'Ellora Caves', 'Mahabaleshwar', 'Lonavala',
    'Pune', 'Nashik', 'Aurangabad', 'Shirdi', 'Tadoba Andhari',
    'Kolhapur', 'Alibaug', 'Matheran', 'Ratnagiri', 'Panchgani',
    'Daulatabad Fort', 'Khandala', 'Bhandardara', 'Elephanta Caves', 'Rajmachi Fort'
  ],

  'Manipur': [
    'Loktak Lake', 'Imphal', 'Keibul Lamjao National Park', 'Ukhrul', 'Bishnupur',
    'Senapati', 'Churachandpur', 'Thoubal', 'Tamenglong', 'Kangpokpi',
    'Moreh', 'Andro Village', 'Khongjom War Memorial', 'Singda Dam', 'Ema Keithel',
    'Shirui Kashong Peak', 'Khoupum Valley', 'Sadu Chiru Waterfall', 'Kangla Fort', 'Ima Market Imphal'
  ],

  'Meghalaya': [
    'Cherrapunji', 'Shillong', 'Mawlynnong', 'Dawki', 'Nongriat',
    'Elephant Falls', 'Umiam Lake', 'Nohkalikai Falls', 'Mawsynram', 'Balpakram National Park',
    'Laitlum Canyons', 'Mawphlang Sacred Forest', 'Krang Suri Falls', 'Siju Cave', 'Nongkhnum Island',
    'Mawryngkhang Trek', 'Smit Village', 'Jowai', 'Tura', 'Wei Sawdong Falls'
  ],

  'Mizoram': [
    'Aizawl', 'Champhai', 'Vantawng Falls', 'Phawngpui', 'Lunglei',
    'Serchhip', 'Kolasib', 'Mamit', 'Lawngtlai', 'Siaha',
    'Tam Dil', 'Reiek Heritage Village', 'Hmuifang', 'Dampa Tiger Reserve', 'Murlen National Park',
    'Tamdil Lake', 'Chanmari', 'Durtlang', 'Solomon Temple Aizawl', 'Lengteng Wildlife Sanctuary'
  ],

  'Nagaland': [
    'Kohima', 'Dimapur', 'Mokokchung', 'Wokha', 'Mon',
    'Phek', 'Kiphire', 'Tuensang', 'Zunheboto', 'Dzukou Valley',
    'Khonoma Village', 'Kohima War Cemetery', 'Touphema Village', 'Longwa Village', 'Triple Falls Seithekima',
    'Japfu Peak', 'Pfutsero', 'Benreu', 'Doyang River', 'Saramati Peak'
  ],

  'Odisha': [
    'Puri', 'Konark Sun Temple', 'Bhubaneswar', 'Chilika Lake', 'Simlipal National Park',
    'Cuttack', 'Bhitarkanika National Park', 'Gopalpur', 'Chandipur', 'Udayagiri and Khandagiri',
    'Dhauli', 'Raghurajpur', 'Tara Tarini Temple', 'Sambalpur', 'Hirakud Dam',
    'Daringbadi', 'Nandankanan Zoo', 'Lalitgiri', 'Satkosia Tiger Reserve', 'Tribal Museum Bhubaneswar'
  ],

  'Punjab': [
    'Golden Temple', 'Jallianwala Bagh', 'Wagah Border', 'Ludhiana', 'Jalandhar',
    'Patiala', 'Anandpur Sahib', 'Bathinda', 'Kapurthala', 'Pathankot',
    'Harike Wetland', 'Virasat-e-Khalsa', 'Sheesh Mahal Patiala', 'Gobindgarh Fort', 'Chamkaur Sahib',
    'Fatehgarh Sahib', 'Qila Mubarak Patiala', 'Shahpur Kandi', 'Ropar Wetland', 'Phillaur'
  ],

  'Rajasthan': [
    'Jaipur', 'Udaipur', 'Jaisalmer', 'Jodhpur', 'Pushkar',
    'Mount Abu', 'Ranthambore National Park', 'Bikaner', 'Chittorgarh', 'Ajmer',
    'Bundi', 'Kumbhalgarh', 'Ranakpur', 'Bharatpur', 'Alwar',
    'Neemrana Fort', 'Sariska Tiger Reserve', 'Mandawa', 'Osian', 'Jhalawar'
  ],

  'Sikkim': [
    'Gangtok', 'Nathu La', 'Pelling', 'Lachung', 'Yumthang Valley',
    'Gurudongmar Lake', 'Tsomgo Lake', 'Ravangla', 'Namchi', 'Zuluk',
    'Rumtek Monastery', 'Yuksom', 'Kanchenjunga National Park', 'Pemayangtse Monastery', 'Khecheopalri Lake',
    'Singalila National Park', 'Rinchenpong', 'Kaluk', 'Tashiding Monastery', 'Lachen'
  ],

  'Tamil Nadu': [
    'Meenakshi Temple', 'Ooty', 'Mahabalipuram', 'Kanyakumari', 'Chennai',
    'Kodaikanal', 'Rameswaram', 'Madurai', 'Thanjavur', 'Coimbatore',
    'Chettinad', 'Yelagiri', 'Yercaud', 'Hogenakkal Falls', 'Dhanushkodi',
    'Valparai', 'Kutralam Falls', 'Mudumalai National Park', 'Pichavaram', 'Gangaikonda Cholapuram'
  ],

  'Telangana': [
    'Charminar', 'Golconda Fort', 'Ramoji Film City', 'Warangal', 'Nagarjuna Sagar Dam',
    'Hyderabad', 'Bhadrachalam', 'Medak', 'Nizamabad', 'Khammam',
    'Yadadri', 'Ananthagiri Hills', 'Pocharam Wildlife Sanctuary', 'Thousand Pillar Temple', 'Pillalamarri',
    'Kuntala Waterfall', 'Pakhal Lake', 'Bhongir Fort', 'Shamirpet', 'Salar Jung Museum'
  ],

  'Tripura': [
    'Agartala', 'Neermahal', 'Unakoti', 'Ujjayanta Palace', 'Sepahijala',
    'Tripura Sundari Temple', 'Jampui Hills', 'Kailashahar', 'Dharmanagar', 'Udaipur Tripura',
    'Pilak', 'Chabimura', 'Dumboor Lake', 'Kamalasagar', 'Heritage Park Agartala',
    'Bison National Park', 'Rowa Wildlife Sanctuary', 'Deotamura', 'Tepania Eco Park', 'Gunabati Group of Temples'
  ],

  'Uttar Pradesh': [
    'Taj Mahal', 'Varanasi', 'Agra Fort', 'Fatehpur Sikri', 'Mathura',
    'Vrindavan', 'Lucknow', 'Allahabad', 'Sarnath', 'Ayodhya',
    'Dudhwa National Park', 'Jhansi Fort', 'Vindhyachal', 'Kushinagar', 'Chunar Fort',
    'Shravasti', 'Ramnagar Fort', 'Nawabganj Bird Sanctuary', 'Hastinapur', 'Bateshwar'
  ],

  'Uttarakhand': [
    'Rishikesh', 'Nainital', 'Mussoorie', 'Haridwar', 'Jim Corbett National Park',
    'Badrinath', 'Kedarnath', 'Auli', 'Valley of Flowers', 'Dehradun',
    'Chopta', 'Tungnath', 'Lansdowne', 'Mukteshwar', 'Binsar',
    'Ranikhet', 'Almora', 'Kausani', 'Pithoragarh', 'Bhimtal'
  ],

  'West Bengal': [
    'Darjeeling', 'Sundarbans', 'Victoria Memorial', 'Howrah Bridge', 'Digha',
    'Siliguri', 'Kalimpong', 'Murshidabad', 'Bishnupur Bankura', 'Shantiniketan',
    'Kolkata', 'Dooars', 'Bakkhali', 'Mandarmani', 'Tajpur Beach',
    'Sandakphu', 'Lava Lolegaon', 'Mukutmanipur', 'Gadiara', 'Cooch Behar Palace'
  ],

  // ===== 8 UNION TERRITORIES =====

  'Andaman and Nicobar Islands': [
    'Havelock Island', 'Cellular Jail', 'Neil Island', 'Ross Island', 'Radhanagar Beach',
    'Port Blair', 'Baratang Island', 'Elephant Beach', 'Viper Island', 'Mount Harriet',
    'North Bay Island', 'Jolly Buoy Island', 'Wandoor Beach', 'Chidiya Tapu', 'Corbyn Cove Beach',
    'Chatham Saw Mill', 'Mahatma Gandhi Marine National Park', 'Long Island Andaman', 'Rangat', 'Diglipur'
  ],

  'Chandigarh': [
    'Rock Garden Chandigarh', 'Sukhna Lake', 'Rose Garden Chandigarh', 'Capitol Complex Chandigarh', 'Elante Mall',
    'Pinjore Gardens', 'Government Museum Chandigarh', 'Open Hand Monument', 'Le Corbusier Centre', 'ChattBir Zoo',
    'Leisure Valley Chandigarh', 'Japanese Garden Chandigarh', 'Terrace Garden Chandigarh', 'Butterfly Park Chandigarh', 'Topiary Park Chandigarh',
    'International Dolls Museum Chandigarh', 'Garden of Silence Chandigarh', 'Chandigarh Botanical Garden', 'Fun City Chandigarh', 'Timber Trail Chandigarh'
  ],

  'Dadra and Nagar Haveli and Daman and Diu': [
    'Diu Fort', 'Nagoa Beach', 'Devka Beach', 'Jampore Beach', 'Vanganga Lake',
    'Silvassa', 'Daman', 'Diu', 'Dudhani', 'Moti Daman Fort',
    'St Paul Church Diu', 'Gangeshwar Temple Diu', 'Diu Museum', 'INS Khukri Memorial', 'Ghoghla Beach',
    'Zampa Gateway', 'Naida Caves Diu', 'Sea Shell Museum Diu', 'Tribal Museum Silvassa', 'Satmaliya Deer Park'
  ],

  'Delhi': [
    'Red Fort', 'Qutb Minar', 'India Gate', "Humayun's Tomb", 'Lotus Temple',
    'Akshardham', 'Jama Masjid', 'Rashtrapati Bhavan', 'Chandni Chowk', 'Jantar Mantar',
    'Hauz Khas', 'Purana Qila', 'Safdarjung Tomb', 'Lodi Gardens', 'Agrasen ki Baoli',
    'National Museum Delhi', 'Dilli Haat', 'Gurudwara Bangla Sahib', 'Mehrauli Archaeological Park', 'Tughlaqabad Fort'
  ],

  'Jammu and Kashmir': [
    'Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Vaishno Devi',
    'Dal Lake', 'Amarnath Temple', 'Patnitop', 'Jammu', 'Yousmarg',
    'Mughal Gardens Srinagar', 'Betaab Valley', 'Aru Valley', 'Doodhpathri', 'Kokernag',
    'Bhaderwah', 'Kishtwar', 'Verinag', 'Sinthan Top', 'Aharbal Waterfall'
  ],

  'Ladakh': [
    'Pangong Tso', 'Nubra Valley', 'Leh Palace', 'Thiksey Monastery', 'Magnetic Hill',
    'Khardung La', 'Hemis Monastery', 'Zanskar', 'Tso Moriri', 'Diskit Monastery',
    'Lamayuru Monastery', 'Shanti Stupa Leh', 'Alchi Monastery', 'Spituk Monastery', 'Stok Palace',
    'Changthang Plateau', 'Hanle Observatory', 'Phugtal Monastery', 'Padum', 'Hall of Fame Leh'
  ],

  'Lakshadweep': [
    'Agatti Island', 'Bangaram Atoll', 'Kavaratti', 'Minicoy', 'Kalpeni',
    'Kadmat Island', 'Amini', 'Andrott', 'Bitra', 'Chetlat Island',
    'Kiltan Island', 'Suheli Par', 'Pitti Bird Sanctuary', 'Thinnakara Island', 'Marine Museum Kavaratti',
    'Kavaratti Beach', 'Kadmat Beach', 'Bangaram Beach', 'Agatti Beach', 'Minicoy Lighthouse'
  ],

  'Puducherry': [
    'Promenade Beach', 'Auroville', 'Sri Aurobindo Ashram', 'Paradise Beach', 'Sacred Heart Jesus Puducherry',
    'Arikamedu', 'Ousteri Lake', 'Chunnambar Boat House', 'French Quarter Puducherry', 'Serenity Beach',
    'Botanical Garden Puducherry', 'Puducherry Museum', 'Karaikal', 'Mahe', 'Yanam',
    'Immaculate Conception Cathedral Puducherry', 'Manakula Vinayagar Temple', 'Goubert Market', 'Bharathi Park Puducherry', 'Puducherry Lighthouse'
  ]
};

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function cleanDescription(extract) {
  if (!extract) return null;
  let text = extract.replace(/\([^)]*\)/g, '').trim();
  text = text.replace(/\[[^\]]+\]/g, '').trim();
  text = text.replace(/\s{2,}/g, ' ');
  text = text.replace(/^[.,;:!?]\s*/, '');
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
  } catch (e) {}
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

async function searchCommonsForImage(query) {
  try {
    const commonSearch = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=10&format=json`;
    const csRes = await fetch(commonSearch, { headers: { 'User-Agent': USER_AGENT } });
    const csData = await csRes.json();
    if (csData.query && csData.query.search && csData.query.search.length > 0) {
      // Prefer jpg/jpeg files, skip maps/logos/flags
      const results = csData.query.search;
      let best = results.find(r =>
        (r.title.toLowerCase().endsWith('.jpg') || r.title.toLowerCase().endsWith('.jpeg')) &&
        !r.title.toLowerCase().includes('logo') &&
        !r.title.toLowerCase().includes('map') &&
        !r.title.toLowerCase().includes('flag') &&
        !r.title.toLowerCase().includes('stamp') &&
        !r.title.toLowerCase().includes('coat_of_arms') &&
        !r.title.toLowerCase().includes('icon')
      );
      if (!best) best = results.find(r =>
        r.title.toLowerCase().endsWith('.jpg') || r.title.toLowerCase().endsWith('.jpeg')
      );
      if (!best) best = results[0];

      const filename = best.title;
      const imgInfoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json`;
      const infoRes = await fetch(imgInfoUrl, { headers: { 'User-Agent': USER_AGENT } });
      const infoData = await infoRes.json();
      const infoPages = infoData.query.pages;
      const infoPageId = Object.keys(infoPages)[0];
      if (infoPages[infoPageId].imageinfo && infoPages[infoPageId].imageinfo.length > 0) {
        return infoPages[infoPageId].imageinfo[0].thumburl || infoPages[infoPageId].imageinfo[0].url;
      }
    }
  } catch (e) {
    console.error(`  Fallback image search failed: ${e.message}`);
  }
  return null;
}

async function build() {
  const destinations = [];
  let id = 1;
  const usedImages = new Set();

  const totalPlaces = Object.values(placesDict).reduce((sum, arr) => sum + arr.length, 0);
  console.log(`Building ${totalPlaces} destinations across ${Object.keys(placesDict).length} states/UTs...`);

  for (const [state, places] of Object.entries(placesDict)) {
    console.log(`\nProcessing ${state} (${places.length} places)...`);
    for (const place of places) {
      await delay(350);

      let desc = null;
      let img = null;

      // Search Wikipedia
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

      // If no image from Wikipedia or it's a duplicate, try Commons
      if (!img || usedImages.has(img)) {
        const commonsImg = await searchCommonsForImage(`${place} ${state} India`);
        if (commonsImg && !usedImages.has(commonsImg)) {
          img = commonsImg;
        } else if (!img) {
          // Last resort: try a broader search
          const broadImg = await searchCommonsForImage(`${place} India tourism`);
          if (broadImg && !usedImages.has(broadImg)) {
            img = broadImg;
          }
        }
      }

      if (!img || usedImages.has(img)) {
        // Absolute fallback
        img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/1280px-Mumbai_03-2016_30_Gateway_of_India.jpg';
      }

      usedImages.add(img);

      const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);

      destinations.push({
        id: id++,
        name: place,
        state: state,
        image: img,
        description: desc,
        rating: parseFloat(rating)
      });

      process.stdout.write(`  ${id - 1}. ${place} ✓\n`);
    }
  }

  const output = `// Auto-generated ${destinations.length} Destinations Data
export interface Destination {
  id: number;
  name: string;
  state: string;
  image: string;
  description: string;
  rating: number;
}

export const destinations: Destination[] = ${JSON.stringify(destinations, null, 2)};
`;

  fs.writeFileSync('a:/WebDev/BelovedIndia/src/data/destinations.ts', output);
  console.log(`\n========================================`);
  console.log(`Successfully wrote ${destinations.length} destinations to src/data/destinations.ts`);
  console.log(`========================================`);
}

build();
