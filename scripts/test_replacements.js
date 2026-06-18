const places = ['Bhedaghat', 'Khangkhui Cave', 'Khwairamband Bazar', 'Lady Hydari Park', 'Nartiang Monoliths', 'Mizoram State Museum', 'Naga Heritage Village', 'Nagaland State Museum', 'Intanki National Park', 'Maha Muni Buddha Vihar', 'Gedu Mia Mosque', 'Cinque Island', 'Nakshatra Garden Silvassa', 'BAPS Swaminarayan Temple Silvassa', 'Hirwa Van Garden', 'Pitti Island', 'Cherbaniani Reef', 'Ujra Mosque Kavaratti', 'French War Memorial Pondicherry', 'Old Lighthouse Pondicherry', 'Pondicherry Museum'];

async function searchWiki(query) {
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=1&format=json`;
  const res = await fetch(searchUrl);
  const data = await res.json();
  if (data.query && data.query.search && data.query.search.length > 0) {
    console.log('✅ ' + query + ': ' + data.query.search[0].title);
  } else {
    console.log('❌ ' + query);
  }
}

async function run() {
  for (const p of places) {
    await searchWiki(p);
  }
}
run();
