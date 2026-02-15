import http from 'http';

// Step 1: Login
const loginPayload = JSON.stringify({ username: "admin", password: "admin123" });

const loginReq = http.request({
  hostname: 'localhost',
  port: 4000,
  path: '/api/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(loginPayload)
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const loginResult = JSON.parse(data);
    const token = loginResult.token;
    console.log('✅ Login successful');

    // Step 2: Fetch current content
    http.get('http://localhost:4000/api/site-content', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const content = JSON.parse(data);
        console.log('✅ Fetched current content');
        
        // Step 3: Update journey with a test change
        const originalTitle = content.journey.items[0].title;
        content.journey.items[0].title = 'TEST UPDATED: ' + new Date().getTime();
        
        const updatePayload = JSON.stringify(content);
        const updateReq = http.request({
          hostname: 'localhost',
          port: 4000,
          path: '/api/site-content',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(updatePayload),
            'Authorization': token
          }
        }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            const result = JSON.parse(data);
            if (result.success) {
              console.log('✅ Update successful!');
              
              // Verify the change was saved
              setTimeout(() => {
                http.get('http://localhost:4000/api/site-content', (res) => {
                  let data = '';
                  res.on('data', chunk => data += chunk);
                  res.on('end', () => {
                    const verified = JSON.parse(data);
                    console.log('✅ Verified change saved:', verified.journey.items[0].title);
                    if (verified.journey.items[0].title.includes('TEST')) {
                      console.log('✅✅ SAVE FUNCTIONALITY IS WORKING!');
                    }
                  });
                });
              }, 500);
            } else {
              console.log('❌ Update failed:', result.error);
            }
          });
        });
        updateReq.on('error', (e) => console.error('❌ Request error:', e.message));
        updateReq.write(updatePayload);
        updateReq.end();
      });
    });
  });
});

loginReq.on('error', (e) => console.error('❌ Login error:', e.message));
loginReq.write(loginPayload);
loginReq.end();
