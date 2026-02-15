// Backend server for V NOHITH KUMAR's portfolio - Full CMS with Supabase
try {
  require('dotenv').config();
} catch (e) {
  console.log('dotenv not available (normal on Vercel)');
}

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Get environment variables with fallbacks
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

console.log('📋 Environment Check:');
console.log('SUPABASE_URL:', SUPABASE_URL ? '✅ Set' : '❌ Missing');
console.log('SUPABASE_KEY:', SUPABASE_KEY ? '✅ Set' : '❌ Missing');
console.log('JWT_SECRET:', JWT_SECRET ? '✅ Set' : '❌ Missing');
console.log('ADMIN_USER:', ADMIN_USER);

// Initialize Supabase client
let supabase = null;
try {
  if (SUPABASE_URL && SUPABASE_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('🔌 Supabase client initialized');
  } else {
    console.warn('⚠️  Supabase credentials missing - some features will not work');
  }
} catch (err) {
  console.error('❌ Failed to initialize Supabase:', err.message);
}

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    env: {
      SUPABASE_URL: SUPABASE_URL ? '✅' : '❌',
      SUPABASE_KEY: SUPABASE_KEY ? '✅' : '❌',
      JWT_SECRET: JWT_SECRET ? '✅' : '❌',
      ADMIN_USER: ADMIN_USER || 'admin',
    }
  });
});

function requireAuth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ========== AUTH ==========
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/logout', requireAuth, (req, res) => {
  // JWT logout is client-side (just remove the token)
  res.json({ success: true });
});

// ========== SITE CONTENT (public) ==========
app.get('/api/site-content', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Database service unavailable' });
    }
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('id', 1)
      .single();

    if (error && error.code !== 'PGRST116') {
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.json({
        hero: {
          greeting: "Hello, I'm",
          name: "V NOHITH KUMAR",
          title: "Full-Stack Developer",
          bio: "I'm passionate about building elegant solutions and learning new technologies.",
          stats: [{ value: 0, label: 'Projects', suffix: '+' }],
          ctaPrimary: "View Projects",
          ctaSecondary: "Get in Touch",
        },
        projects: { sectionTitle: "Projects", sectionDesc: "Things I've built." },
        contact: { email: "nohithkumar01@gmail.com", location: "Hyderabad" },
      });
    }

    res.json(data.content || {});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/site-content', requireAuth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('site_content')
      .upsert({ id: 1, content: req.body }, { onConflict: 'id' });

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ========== UPLOAD ==========
app.post('/api/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

// ========== PROJECTS ==========
app.get('/api/projects', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    const projects = (data || []).map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      longDescription: p.long_description || p.description,
      techStack: Array.isArray(p.tech_stack) ? p.tech_stack : [],
      category: p.category || 'General',
      image: p.image_url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
      githubUrl: p.github_url,
      demoUrl: p.demo_url,
      featured: p.featured || false,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    }));

    res.json(projects);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/projects', requireAuth, async (req, res) => {
  try {
    const { title, description, longDescription, techStack, category, image, githubUrl, demoUrl } = req.body;

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          title: title || '',
          description: description || '',
          long_description: longDescription || description || '',
          tech_stack: Array.isArray(techStack) ? techStack : [],
          category: category || 'General',
          image_url: image || '',
          github_url: githubUrl || '',
          demo_url: demoUrl || '',
          featured: false,
          display_order: 0,
        },
      ])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json({ id: data.id, success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/projects/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, longDescription, techStack, category, image, githubUrl, demoUrl } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (longDescription !== undefined) updateData.long_description = longDescription;
    if (techStack !== undefined) updateData.tech_stack = Array.isArray(techStack) ? techStack : [];
    if (category !== undefined) updateData.category = category;
    if (image !== undefined) updateData.image_url = image;
    if (githubUrl !== undefined) updateData.github_url = githubUrl;
    if (demoUrl !== undefined) updateData.demo_url = demoUrl;

    const { error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/projects/:id', requireAuth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', req.params.id);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ========== CONTACTS (public form) ==========
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const { error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get all contacts (admin only)
app.get('/api/contacts', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data || []);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ========== ANALYTICS (public) ==========
app.post('/api/analytics', async (req, res) => {
  try {
    const { eventType, page, projectId, sessionId, metadata } = req.body;

    const { error } = await supabase
      .from('analytics')
      .insert([
        {
          event_type: eventType,
          page,
          project_id: projectId,
          session_id: sessionId,
          metadata: metadata || {},
        },
      ]);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get analytics (admin only)
app.get('/api/analytics', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (error) return res.status(500).json({ error: error.message });
    res.json(data || []);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ========== ERROR HANDLING ==========
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Export for Vercel serverless
module.exports = app;

// For local development
// ========== ERROR HANDLING ==========
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Export for Vercel serverless
module.exports = app;

// For local development
const PORT = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
    console.log(`📦 Connected to Supabase at ${process.env.SUPABASE_URL}`);
  });
}
