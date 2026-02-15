// Script to update journey items in the database
import http from 'http';

const items = [
  { year: "2022", title: "Tutorial Zone: Hello, World!", description: "First lines of code written; curiosity sparked like the opening cutscene. Discovered the power of creating things with code.", icon: "Rocket" },
  { year: "2023", title: "Mage's Academy: Learning Spells", description: "BTech coursework mastering programming languages. Each tool became a new spell to cast—Python, C++, JavaScript.", icon: "GraduationCap" },
  { year: "2023", title: "Bug Dungeon: Debugging Nightmares", description: "Spent hours debugging race conditions and memory leaks. Learned that errors are just part of the game—every bug teaches you something.", icon: "Target" },
  { year: "2024", title: "Networking Quest: Building Allies", description: "Joined dev communities and GitHub. Realized growth happens through collaboration, not solo grinding. Found my tribe.", icon: "Briefcase" },
  { year: "2024", title: "Side Quest Unlocked: First OSS", description: "Contributed to someone else's project. Learned humility and the power of open source. Got my first merged PR.", icon: "Award" },
  { year: "2024", title: "Mini-Boss: Hackathon Sprint", description: "Built something real in 24-48 hours during SIH. Adrenaline, teamwork, and shipped features. Won best UI award.", icon: "Zap" },
  { year: "2024", title: "Leveling Up: First Freelance", description: "Took payment for code. Shifted from hobbyist to professional. Created Flutter apps for real clients.", icon: "Star" },
  { year: "2024", title: "Skill Tree Expansion: Full-Stack", description: "Learned backend with Node.js, DevOps with docker. No longer a one-trick pony—became a full-stack developer.", icon: "Trophy" },
  { year: "2025", title: "Raid Boss: Production Gone Wrong", description: "First critical bug in production. Database went down. Learned monitoring, alerting, and panic management. Battle scars = experience.", icon: "Briefcase" },
  { year: "2025", title: "Boss Rush: Interview Gauntlet", description: "Multiple technical interviews, some rejections, many learnings. Each rejection = XP toward the right opportunity.", icon: "Target" },
  { year: "2025", title: "Legendary Status: Big Team Ship", description: "Shipped major feature with a team of seniors. Realized my code powers millions of interactions daily.", icon: "Trophy" },
  { year: "2026", title: "New Game+: Mentoring Juniors", description: "Teaching others, sharing knowledge. Realized the journey doesn't end—it loops into giving back and leveling up the next generation.", icon: "Award" }
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
        sectionTitle: "Level Up: My Developer Journey",
        sectionDesc: "Each milestone is a new level. Watch me grow from curious learner to skilled developer.",
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
          console.log('✅ Journey section is now ready to display!');
        } else {
          console.error('❌ Update failed:', data);
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
