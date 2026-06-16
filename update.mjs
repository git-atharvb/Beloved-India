import fs from 'fs';

const places = [
  { id: 1, name: 'Taj Mahal', wiki: 'Taj_Mahal' },
  { id: 2, name: 'Jaipur', wiki: 'Hawa_Mahal' },
  { id: 3, name: 'Kerala Backwaters', wiki: 'Kerala_backwaters' },
  { id: 4, name: 'Leh-Ladakh', wiki: 'Pangong_Tso' },
  { id: 5, name: 'Varanasi', wiki: 'Varanasi' },
  { id: 6, name: 'Goa Beaches', wiki: 'Baga_Beach' },
  { id: 7, name: 'Rann of Kutch', wiki: 'Great_Rann_of_Kutch' },
  { id: 8, name: 'Mysore Palace', wiki: 'Mysore_Palace' }
];

async function update() {
  const destinationsFile = 'a:/WebDev/BelovedIndia/src/data/destinations.ts';
  let content = fs.readFileSync(destinationsFile, 'utf8');

  for (let place of places) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${place.wiki}&pithumbsize=1000&format=json`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      const pages = json.query.pages;
      let img = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1000&q=80'; // fallback
      for (let key in pages) {
        if (pages[key].thumbnail) {
          img = pages[key].thumbnail.source;
        }
      }
      console.log(`Resolved ${place.name} to ${img}`);
      const regex = new RegExp(`name: '${place.name}',[\\s\\S]*?image: '([^']+)'`);
      content = content.replace(regex, (match) => {
          return match.replace(/image: '[^']+'/, `image: '${img}'`);
      });
    } catch(e) {
      console.error(e);
    }
  }

  fs.writeFileSync(destinationsFile, content);
  console.log('Update Complete!');
}

update();
