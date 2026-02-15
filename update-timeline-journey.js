import http from 'http';

const items = [
  { year: "2022", title: "First Lines of Code", description: "Curiosity sparked when I wrote my first program. Discovered the power of creating things with code.", icon: "Rocket" },
  { year: "2023", title: "Learning the Fundamentals", description: "Started my BTech journey, mastering programming languages and core concepts. Each new language was a tool to unlock new possibilities.", icon: "GraduationCap" },
  { year: "2023", title: "Debugging and Problem Solving", description: "Spent countless hours debugging, dealing with race conditions and memory leaks. Every error taught me something valuable.", icon: "Target" },
  { year: "2024", title: "Joining the Developer Community", description: "Connected with other developers, found my tribe. Realized that growth happens through collaboration and mentorship.", icon: "Users" },
  { year: "2024", title: "My First Open Source Contribution", description: "Contributed to someone else's project. Got my first merged PR. Learned the power and responsibility of open source.", icon: "Code" },
  { year: "2024", title: "Hackathon Experience", description: "Built something real in 24-48 hours. Adrenaline, teamwork, and shipped features. Won recognition for the work.", icon: "Zap" },
  { year: "2024", title: "First Professional Project", description: "Took payment for my code. Shifted from hobbyist to professional. Built Flutter apps for real clients with real stakes.", icon: "Briefcase" },
  { year: "2024", title: "Becoming Full-Stack", description: "Expanded my skill tree. Learned backend with Node.js and DevOps. No longer a specialist—became a generalist.", icon: "Trophy" },
  { year: "2025", title: "Production Fire", description: "First critical bug in production. Database went down. Learned monitoring, alerting, and staying calm under pressure.", icon: "Award" },
  { year: "2025", title: "Interview Journey", description: "Multiple technical interviews. Some rejections, many learnings. Each one taught me something about growth.", icon: "Target" },
  { year: "2025", title: "Building With a Team", description: "Shipped a major feature with experienced senior developers. Realized the scope of the impact—my code powers millions.", icon: "Trophy" },
  { year: "2026", title: "Giving Back", description: "Now teaching juniors, sharing knowledge. The journey doesn't end—it evolves into mentoring and lifting others up.", icon: "Heart" },
];

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
    if (!loginResult.token) {
      console.error('❌ Login failed:', data);
      process.exit(1);
    }
    console.log('✅ Login successful!');
    const token = loginResult.token;

    // Step 2: Update content with journey items
    const siteContent = {
      hero: { 
        greeting: "Hello, I'm",
        name: "V NOHITH KUMAR",
        title: "Full-Stack Developer",
        bio: "",
        stats: [],
        ctaPrimary: "View Projects",
        ctaSecondary: "Get in Touch"
      },
      journey: {
        sectionTitle: "My Life Journey",
        sectionDesc: "A timeline of the moments, lessons, and experiences that shaped who I am.",
        items: items
      },
      projects: {
        sectionTitle: "Projects",
        sectionDesc: ""
      },
      contact: {
        email: "nohithkumar01@gmail.com",
        location: "Gandipet, Hyderabad"
      },
      footer: {
        siteName: "Portfolio",
        copyrightBy: "V Nohith Kumar"
      }
    };

    const updatePayload = JSON.stringify(siteContent);
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
          console.log('✅ Updated site content with 12 journey items!');
          console.log('✅ New timeline-based journey is ready to display!');
          console.log('🎯 Theme: Personal Life Journey (No more "quest" theme)');
        } else {
          console.error('❌ Update failed:', result.error);
        }
      });
    });

    updateReq.on('error', (e) => {
      console.error('❌ Update error:', e.message);
    });
    updateReq.write(updatePayload);
    updateReq.end();
  });
});

loginReq.on('error', (e) => {
  console.error('❌ Login error:', e.message);
});
loginReq.write(loginPayload);
loginReq.end();
