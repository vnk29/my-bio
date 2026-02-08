// Backend server for V NOHITH KUMAR's portfolio - Full CMS
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const db = new sqlite3.Database('./portfolio.db', (err) => {
  if (err) {
    console.error('Failed to connect to SQLite:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Ensure uploads directory exists (relative to server)
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + (file.originalname || 'image')),
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.use(cors({ origin: ['http://localhost:8080', 'http://localhost:5173'], credentials: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use('/uploads', express.static(uploadsDir));

const sessions = {};
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

function requireAuth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token || !sessions[token]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Auth
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = crypto.randomBytes(24).toString('hex');
    sessions[token] = { username, created: Date.now() };
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
app.post('/api/logout', requireAuth, (req, res) => {
  delete sessions[req.headers['authorization']];
  res.json({ success: true });
});

// Initialize DB
const defaultSiteContent = JSON.stringify({
  hero: {
    greeting: "Hello, I'm",
    name: "V NOHITH KUMAR",
    title: "Full-Stack Developer",
    bio: "I'm passionate about building elegant solutions and learning new technologies. Ready to contribute and grow.",
    stats: [
      { value: 0, label: 'Projects', suffix: '+' },
      { value: 0, label: 'Technologies', suffix: '+' },
    ],
    ctaPrimary: "View Projects",
    ctaSecondary: "Get in Touch",
  },
  journey: {
    sectionTitle: "My Journey",
    sectionDesc: "Milestones and experiences that shaped my path.",
    items: [],
  },
  technicalSkills: {
    sectionTitle: "Technical Skills",
    sectionDesc: "Technologies and tools I'm proficient in.",
    skills: {},
  },
  contact: {
    email: "nohithkumar01@gmail.com",
    location: "Gandipet, Hyderabad",
    availability: "Open to new opportunities and collaborations. Let's build something great together.",
  },
  footer: {
    siteName: "Portfolio",
    copyrightBy: "V Nohith Kumar",
    socialLinks: [
      { platform: 'GitHub', href: 'https://github.com', icon: 'Github' },
      { platform: 'LinkedIn', href: 'https://linkedin.com/in', icon: 'Linkedin' },
    ],
  },
  projects: {
    sectionTitle: "Projects",
    sectionDesc: "Things I've built and learned from.",
  },
});

const initDb = () => {
  db.run(`CREATE TABLE IF NOT EXISTS about (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    bio TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS site_content (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    content TEXT
  )`, () => {
    db.get('SELECT * FROM site_content WHERE id = 1', (err, row) => {
      if (!row) {
        db.run('INSERT INTO site_content (id, content) VALUES (1, ?)', [defaultSiteContent]);
      }
    });
  });
  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    long_description TEXT,
    tech_stack TEXT,
    category TEXT,
    image TEXT,
    github_url TEXT,
    demo_url TEXT,
    sort_order INTEGER DEFAULT 0
  )`);
};
initDb();

app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ========== SITE CONTENT (public) ==========
app.get('/api/site-content', (req, res) => {
  db.get('SELECT content FROM site_content WHERE id = 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    try {
      const content = row ? JSON.parse(row.content) : {};
      res.json(content);
    } catch (e) {
      res.status(500).json({ error: 'Invalid content' });
    }
  });
});

app.put('/api/site-content', requireAuth, (req, res) => {
  const content = JSON.stringify(req.body);
  db.run('UPDATE site_content SET content = ? WHERE id = 1', [content], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// ========== UPLOAD ==========
app.post('/api/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

// ========== PROJECTS ==========
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects ORDER BY sort_order ASC, id ASC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const projects = (rows || []).map((p) => ({
      id: String(p.id),
      title: p.title,
      description: p.description,
      longDescription: p.long_description || p.description,
      techStack: p.tech_stack ? JSON.parse(p.tech_stack) : [],
      category: p.category || 'General',
      image: p.image || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
      githubUrl: p.github_url,
      demoUrl: p.demo_url,
    }));
    res.json(projects);
  });
});

app.post('/api/projects', requireAuth, (req, res) => {
  const { title, description, longDescription, techStack, category, image, githubUrl, demoUrl } = req.body;
  const tech = JSON.stringify(Array.isArray(techStack) ? techStack : []);
  db.run(
    'INSERT INTO projects (title, description, long_description, tech_stack, category, image, github_url, demo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [title || '', description || '', longDescription || description || '', tech, category || 'General', image || '', githubUrl || '', demoUrl || ''],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, success: true });
    }
  );
});

app.put('/api/projects/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const { title, description, longDescription, techStack, category, image, githubUrl, demoUrl } = req.body;
  const tech = techStack ? JSON.stringify(Array.isArray(techStack) ? techStack : []) : null;
  db.run(
    'UPDATE projects SET title = COALESCE(?, title), description = COALESCE(?, description), long_description = COALESCE(?, long_description), tech_stack = COALESCE(?, tech_stack), category = COALESCE(?, category), image = COALESCE(?, image), github_url = COALESCE(?, github_url), demo_url = COALESCE(?, demo_url) WHERE id = ?',
    [title, description, longDescription, tech, category, image, githubUrl, demoUrl, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.delete('/api/projects/:id', requireAuth, (req, res) => {
  db.run('DELETE FROM projects WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// ========== ABOUT (legacy, kept for compatibility) ==========
app.get('/api/about', (req, res) => {
  db.get('SELECT * FROM about ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {});
  });
});
app.post('/api/about', requireAuth, (req, res) => {
  const { name, bio } = req.body;
  db.run('INSERT INTO about (name, bio) VALUES (?, ?)', [name, bio], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name, bio });
  });
});
app.put('/api/about', requireAuth, (req, res) => {
  const { name, bio } = req.body;
  db.run('UPDATE about SET name = ?, bio = ? WHERE id = (SELECT id FROM about ORDER BY id DESC LIMIT 1)', [name, bio], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ name, bio });
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
