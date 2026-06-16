const fs = require('fs');
const https = require('https');

const places = [
  { id: 1, name: 'Taj Mahal', wiki: 'Taj_Mahal' },
  { id: 2, name: 'Jaipur', wiki: 'Hawa_Mahal' },
  { id: 3, name: 'Kerala Backwaters', wiki: 'Kerala_backwaters' },
  { id: 4, name: 'Leh-Ladakh', wiki: 'Pangong_Tso' },
  { id: 5, name: 'Varanasi', wiki: 'Ghats_in_Varanasi' },
  { id: 6, name: 'Goa Beaches', wiki: 'Palolem_Beach' },
  { id: 7, name: 'Rann of Kutch', wiki: 'Great_Rann_of_Kutch' },
  { id: 8, name: 'Mysore Palace', wiki: 'Mysore_Palace' }
];

async function getWikiImageUrl(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${title}&pithumbsize=800&format=json`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          for (let key in pages) {
            if (pages[key].thumbnail) {
              resolve(pages[key].thumbnail.source);
            } else {
              resolve('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80'); // Fallback to a real India picture
            }
            return;
          }
        } catch (e) {
          resolve('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80');
        }
      });
    }).on('error', reject);
  });
}

async function update() {
  const destinationsFile = 'a:/WebDev/BelovedIndia/src/data/destinations.ts';
  let content = fs.readFileSync(destinationsFile, 'utf8');

  for (let place of places) {
    let img = await getWikiImageUrl(place.wiki);
    console.log(`Resolved ${place.name} to ${img}`);
    const regex = new RegExp(`name: '${place.name}',[\\s\\S]*?image: '([^']+)'`);
    content = content.replace(regex, (match) => {
        return match.replace(/image: '[^']+'/, `image: '${img}'`);
    });
  }

  fs.writeFileSync(destinationsFile, content);
  console.log('Update Complete!');
}

update();
