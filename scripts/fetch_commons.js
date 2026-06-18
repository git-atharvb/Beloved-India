const USER_AGENT = 'BelovedIndiaApp/1.0';
async function getImages(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=20&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  const data = await res.json();
  const results = data.query.search.filter(r => r.title.toLowerCase().endsWith('.jpg') && !r.title.toLowerCase().includes('map') && !r.title.toLowerCase().includes('flag') && !r.title.toLowerCase().includes('pdf') && !r.title.toLowerCase().includes('locator'));
  for (let i=0; i<Math.min(5, results.length); i++) {
    const title = results[i].title;
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json`;
    const infoRes = await fetch(infoUrl, { headers: { 'User-Agent': USER_AGENT } });
    const infoData = await infoRes.json();
    const pages = infoData.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== '-1' && pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
      console.log(query + ': ' + title + ' -> ' + (pages[pageId].imageinfo[0].thumburl || pages[pageId].imageinfo[0].url));
    }
  }
}
async function run() {
  await getImages('incategory:"Tripura"');
  await getImages('incategory:"Silvassa"');
  await getImages('incategory:"Lakshadweep"');
}
run();
