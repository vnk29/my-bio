// Verify journey data is in database
import http from 'http';

http.get('http://localhost:4000/api/site-content', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const content = JSON.parse(data);
    console.log(`✅ Journey Items in Database: ${content.journey.items.length}`);
    console.log(`📍 Section Title: ${content.journey.sectionTitle}`);
    console.log('\n📋 Items List:');
    content.journey.items.forEach((item, i) => {
      console.log(`  ${i+1}. [Lv${i+1}] ${item.title} (${item.year}) - ${item.icon}`);
    });
    console.log(`\n📊 Total: ${content.journey.items.length} items`);
    console.log('✅ Journey section is ready to display on your website!');
  });
});
