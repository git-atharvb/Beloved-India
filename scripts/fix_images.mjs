import fs from 'fs';

const stateImageMap = {
  'Andhra Pradesh': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg',
  'Arunachal Pradesh': 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Tawang_Monastery%2C_Arunachal_Pradesh.jpg',
  'Assam': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Elephant_safari_at_Kaziranga_National_Park%2C_Assam.jpg',
  'Bihar': 'https://upload.wikimedia.org/wikipedia/commons/5/57/Great_Buddha_Statue%2C_Bodh_Gaya.jpg',
  'Chhattisgarh': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Chitrakote_Waterfall.jpg',
  'Goa': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Palolem_Beach_South_Goa.jpg',
  'Gujarat': 'https://upload.wikimedia.org/wikipedia/commons/0/07/Statue_of_Unity.jpg',
  'Haryana': 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Surajkund_panoramic.jpg',
  'Himachal Pradesh': 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg',
  'Jharkhand': 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Dassam_Falls%2C_Jharkhand%2C_India_01.jpg',
  'Karnataka': 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mysore_Palace_Morning.jpg',
  'Kerala': 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Munnar_hillstation_kerala.jpg',
  'Madhya Pradesh': 'https://upload.wikimedia.org/wikipedia/commons/7/76/Lakshmana_Temple_in_Khajuraho.jpg',
  'Maharashtra': 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg',
  'Manipur': 'https://upload.wikimedia.org/wikipedia/commons/2/29/Loktak_Lake_Manipur_01.jpg',
  'Meghalaya': 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Nohkalikai_Falls%2C_Cherrapunji.jpg',
  'Mizoram': 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Aizawl_panoramicview.jpg',
  'Nagaland': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Breathtaking_beauty_of_Dzukou_Valley_in_Manipur-Nagaland_border_%28edit%29.jpg',
  'Odisha': 'https://upload.wikimedia.org/wikipedia/commons/7/78/Konark_Sun_Temple_Wheel.jpg',
  'Punjab': 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Golden_Temple_India.jpg',
  'Rajasthan': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Hawa_Mahal_Jaipur.jpg',
  'Sikkim': 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Gurudongmar_Lake_Sikkim.jpg',
  'Tamil Nadu': 'https://upload.wikimedia.org/wikipedia/commons/5/5d/MEENAKSHI_TEMPLE-_WEST_TOWER.jpg',
  'Telangana': 'https://upload.wikimedia.org/wikipedia/commons/8/87/Charminar_Hyderabad.jpg',
  'Tripura': 'https://upload.wikimedia.org/wikipedia/commons/d/db/Right_Facade_of_Ujjayanta_Palace%2C_Agartala%2C_Tripura_06.JPG',
  'Uttar Pradesh': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg',
  'Uttarakhand': 'https://upload.wikimedia.org/wikipedia/commons/4/49/Kedarnath_Temple_in_Uttarakhand%2C_India%2C_by_Yogabrata_Chakraborty.jpg',
  'West Bengal': 'https://upload.wikimedia.org/wikipedia/commons/8/80/Howrah_Bridge_Kolkata.jpg',
  'Andaman and Nicobar Islands': 'https://upload.wikimedia.org/wikipedia/commons/8/87/Havelock_Island%2C_Radhanagar_Beach_before_sunset%2C_Andaman_Islands.jpg',
  'Chandigarh': 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Rock_Garden_Chandigarh.jpg',
  'Dadra and Nagar Haveli and Daman and Diu': 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Diu_fort_Diu_india.jpg',
  'Delhi': 'https://upload.wikimedia.org/wikipedia/commons/1/12/India_Gate_New_Delhi.jpg',
  'Jammu and Kashmir': 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Dal_Lake_Srinagar_Kashmir.jpg',
  'Ladakh': 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Pangong_Tso_2.jpg',
  'Lakshadweep': 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Agatti_Island_Lakshadweep.jpg',
  'Puducherry': 'https://upload.wikimedia.org/wikipedia/commons/9/94/View_of_Rock_Beach_%28Puducherry_Beach%29_3.jpg'
};

const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg';

function convertToThumb(url) {
  if (url.includes('/thumb/')) return url.replace(/1000px-/g, '1280px-');
  const base = 'https://upload.wikimedia.org/wikipedia/commons/';
  if (!url.startsWith(base)) return url;
  const path = url.replace(base, '');
  const parts = path.split('/');
  const filename = parts[parts.length - 1];
  if (!filename) return url;
  return base + 'thumb/' + path + '/1280px-' + filename;
}

function fixDestinations() {
  const filePath = 'a:/WebDev/BelovedIndia/src/data/destinations.ts';
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  const match = fileContent.match(/export const destinations: Destination\[\] = (\[[\s\S]*\]);/);
  if (!match) {
    console.error('Could not parse destinations array from file');
    return;
  }
  
  const destinations = JSON.parse(match[1]);
  
  const fixedDestinations = destinations.map(dest => {
    let img = dest.image;
    
    // Check if broken
    if (!img || img.includes('India_Gateway_Mumbai.jpg') || img.includes('Special:FilePath') || img.includes('upload.wikimedia.org/wikipedia/commons/thumb/8/8c/')) {
      img = stateImageMap[dest.state] || defaultImage;
    }
    
    img = convertToThumb(img);
    return { ...dest, image: img };
  });

  const output = `// Auto-generated 360 Destinations Data
export interface Destination {
  id: number;
  name: string;
  state: string;
  image: string;
  description: string;
  rating: number;
}

export const destinations: Destination[] = ${JSON.stringify(fixedDestinations, null, 2)};
`;

  fs.writeFileSync(filePath, output);
  console.log('Successfully enforced 1000px THUMBNAIL links for all 360 images instantly!');
}

fixDestinations();
