import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus, Trash2, Upload, Save } from "lucide-react";
import type { SiteContent } from "@/hooks/use-site-content";
import type { ApiProject } from "@/hooks/use-projects-api";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

const defaultContent: SiteContent = {
  hero: { greeting: "Hello, I'm", name: "V NOHITH KUMAR", title: "Full-Stack Developer", bio: "", stats: [], ctaPrimary: "View Projects", ctaSecondary: "Get in Touch" },
  journey: { sectionTitle: "My Journey", sectionDesc: "Milestones and experiences that shaped my path.", items: [] },
  technicalSkills: { sectionTitle: "Technical Skills", sectionDesc: "Technologies and tools I'm proficient in.", skills: {} },
  contact: { email: "nohithkumar01@gmail.com", location: "Gandipet, Hyderabad", availability: "" },
  footer: { siteName: "Portfolio", copyrightBy: "V Nohith Kumar", socialLinks: [] },
  projects: { sectionTitle: "Projects", sectionDesc: "" },
};

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  const { data: siteContent = defaultContent, refetch: refetchContent } = useQuery({
    queryKey: ["site-content"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/site-content`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    enabled: !!token,
  });

  const { data: projects = [], refetch: refetchProjects } = useQuery({
    queryKey: ["projects-api"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/projects`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    enabled: !!token,
  });

  const [content, setContent] = useState<SiteContent>(siteContent);
  const [projectForm, setProjectForm] = useState<Partial<ApiProject>>({});
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  useEffect(() => {
    setContent(siteContent);
  }, [siteContent]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem("admin_token", data.token);
      } else {
        setLoginError(data.error || "Login failed");
      }
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("admin_token");
  };

  const saveSiteContent = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/site-content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        refetchContent();
        queryClient.invalidateQueries({ queryKey: ["site-content"] });
      }
    } finally {
      setSaving(false);
    }
  };

  const addJourneyItem = () => {
    setContent((c) => ({
      ...c,
      journey: {
        ...c.journey,
        items: [...(c.journey?.items || []), { year: "", title: "", description: "", icon: "Rocket" }],
      },
    }));
  };

  const updateJourneyItem = (index: number, field: string, value: string) => {
    setContent((c) => {
      const t = [...(c.journey?.items || [])];
      t[index] = { ...t[index], [field]: value };
      return { ...c, journey: { ...c.journey, items: t } };
    });
  };

  const removeJourneyItem = (index: number) => {
    setContent((c) => ({
      ...c,
      journey: { ...c.journey, items: (c.journey?.items || []).filter((_, i) => i !== index) },
    }));
  };

  const addSocialLink = () => {
    setContent((c) => ({
      ...c,
      footer: {
        ...c.footer,
        socialLinks: [...(c.footer?.socialLinks || []), { platform: "GitHub", href: "", icon: "Github" }],
      },
    }));
  };

  const addSkillsCategory = () => {
    const name = prompt("Category name (e.g. Languages, Frontend):");
    if (name?.trim()) setContent((c) => ({
      ...c,
      technicalSkills: { ...c.technicalSkills, skills: { ...(c.technicalSkills?.skills || {}), [name.trim()]: [] } },
    }));
  };

  const updateSkillsCategory = (oldName: string, newName: string, skills: string[]) => {
    setContent((c) => {
      const s = { ...(c.technicalSkills?.skills || {}) };
      delete s[oldName];
      s[newName] = skills;
      return { ...c, technicalSkills: { ...c.technicalSkills, skills: s } };
    });
  };

  const removeSkillsCategory = (name: string) => {
    setContent((c) => {
      const s = { ...(c.technicalSkills?.skills || {}) };
      delete s[name];
      return { ...c, technicalSkills: { ...c.technicalSkills, skills: s } };
    });
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    setContent((c) => {
      const s = [...(c.footer?.socialLinks || [])];
      s[index] = { ...s[index], [field]: value };
      return { ...c, footer: { ...c.footer, socialLinks: s } };
    });
  };

  const removeSocialLink = (index: number) => {
    setContent((c) => ({
      ...c,
      footer: { ...c.footer, socialLinks: (c.footer?.socialLinks || []).filter((_, i) => i !== index) },
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`${API}/api/upload`, {
      method: "POST",
      headers: { Authorization: token },
      body: fd,
    });
    const data = await res.json();
    if (data.url) setProjectForm((f) => ({ ...f, image: `${API}${data.url}` }));
  };

  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      title: projectForm.title,
      description: projectForm.description,
      longDescription: projectForm.longDescription || projectForm.description,
      techStack: Array.isArray(projectForm.techStack) ? projectForm.techStack : (projectForm.techStack as string)?.split(",").map((s) => s.trim()).filter(Boolean) || [],
      category: projectForm.category || "General",
      image: projectForm.image,
      githubUrl: projectForm.githubUrl,
      demoUrl: projectForm.demoUrl,
    };
    if (editingProjectId) {
      await fetch(`${API}/api/projects/${editingProjectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`${API}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(body),
      });
    }
    setProjectForm({});
    setEditingProjectId(null);
    refetchProjects();
  };

  const deleteProject = async (id: string) => {
    await fetch(`${API}/api/projects/${id}`, { method: "DELETE", headers: { Authorization: token } });
    refetchProjects();
  };

  const editProject = (p: ApiProject) => {
    setProjectForm(p);
    setEditingProjectId(p.id);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="p-6 w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input placeholder="Username" value={loginForm.username} onChange={(e) => setLoginForm((f) => ({ ...f, username: e.target.value }))} />
            <Input type="password" placeholder="Password" value={loginForm.password} onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))} />
            {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
            <Button type="submit" disabled={loggingIn} className="w-full">{loggingIn ? "Logging in..." : "Login"}</Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
            </Link>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="journey">Journey</TabsTrigger>
            <TabsTrigger value="skills">Technical Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
              <div className="space-y-4">
                <div><Label>Greeting</Label><Input value={content.hero?.greeting ?? ""} onChange={(e) => setContent((c) => ({ ...c, hero: { ...c.hero, greeting: e.target.value } }))} /></div>
                <div><Label>Name (Title)</Label><Input value={content.hero?.name ?? ""} onChange={(e) => setContent((c) => ({ ...c, hero: { ...c.hero, name: e.target.value } }))} /></div>
                <div><Label>Job Title</Label><Input value={content.hero?.title ?? ""} onChange={(e) => setContent((c) => ({ ...c, hero: { ...c.hero, title: e.target.value } }))} /></div>
                <div><Label>Bio</Label><Textarea value={content.hero?.bio ?? ""} onChange={(e) => setContent((c) => ({ ...c, hero: { ...c.hero, bio: e.target.value } }))} rows={4} /></div>
                <div>
                  <Label>Profile Photo URL</Label>
                  <div className="flex gap-2 items-center">
                    <Input value={content.hero?.profilePhoto ?? ""} onChange={(e) => setContent((c) => ({ ...c, hero: { ...c.hero, profilePhoto: e.target.value } }))} placeholder="Paste image URL or upload" />
                    <Label className="cursor-pointer flex items-center gap-1 px-4 py-2 border rounded-md hover:bg-secondary">
                      <Upload className="w-4 h-4" /> Upload
                      <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file || !token) return;
                        const fd = new FormData();
                        fd.append("file", file);
                        const res = await fetch(`${API}/api/upload`, {
                          method: "POST",
                          headers: { Authorization: token },
                          body: fd,
                        });
                        const data = await res.json();
                        if (data.url) setContent((c) => ({ ...c, hero: { ...c.hero, profilePhoto: `${API}${data.url}` } }));
                      }} />
                    </Label>
                    {content.hero?.profilePhoto && (
                      <img src={content.hero.profilePhoto} alt="Profile" className="w-12 h-12 rounded-full object-cover border ml-2" />
                    )}
                  </div>
                </div>
                <div><Label>CTA Primary</Label><Input value={content.hero?.ctaPrimary ?? ""} onChange={(e) => setContent((c) => ({ ...c, hero: { ...c.hero, ctaPrimary: e.target.value } }))} /></div>
                <div><Label>CTA Secondary</Label><Input value={content.hero?.ctaSecondary ?? ""} onChange={(e) => setContent((c) => ({ ...c, hero: { ...c.hero, ctaSecondary: e.target.value } }))} /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[0, 1].map((i) => {
                    const s = (content.hero?.stats || [])[i] || { value: 0, label: "", suffix: "" };
                    return (
                      <div key={i} className="space-y-2"><Label>Stat {i + 1}</Label>
                        <Input placeholder="Value" type="number" value={s.value ?? ""} onChange={(e) => {
                          const stats = [...(content.hero?.stats || []).slice(0, 2)];
                          while (stats.length <= i) stats.push({ value: 0, label: "", suffix: "" });
                          stats[i] = { ...stats[i], value: parseInt(e.target.value) || 0, label: stats[i]?.label ?? "", suffix: stats[i]?.suffix ?? "" };
                          setContent((c) => ({ ...c, hero: { ...c.hero, stats } }));
                        }} />
                        <Input placeholder="Label" value={s.label ?? ""} onChange={(e) => {
                          const stats = [...(content.hero?.stats || []).slice(0, 2)];
                          while (stats.length <= i) stats.push({ value: 0, label: "", suffix: "" });
                          stats[i] = { ...stats[i], value: stats[i]?.value ?? 0, label: e.target.value, suffix: stats[i]?.suffix ?? "" };
                          setContent((c) => ({ ...c, hero: { ...c.hero, stats } }));
                        }} />
                        <Input placeholder="Suffix (e.g. +)" value={s.suffix ?? ""} onChange={(e) => {
                          const stats = [...(content.hero?.stats || []).slice(0, 2)];
                          while (stats.length <= i) stats.push({ value: 0, label: "", suffix: "" });
                          stats[i] = { ...stats[i], value: stats[i]?.value ?? 0, label: stats[i]?.label ?? "", suffix: e.target.value };
                          setContent((c) => ({ ...c, hero: { ...c.hero, stats } }));
                        }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="journey" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Journey Section</h3>
              <p className="text-sm text-muted-foreground mb-6">Add your education, experience, and milestones.</p>
              <div className="space-y-4">
                <div><Label>Section Title</Label><Input value={content.journey?.sectionTitle ?? ""} onChange={(e) => setContent((c) => ({ ...c, journey: { ...c.journey, sectionTitle: e.target.value } }))} /></div>
                <div><Label>Section Description</Label><Textarea value={content.journey?.sectionDesc ?? ""} onChange={(e) => setContent((c) => ({ ...c, journey: { ...c.journey, sectionDesc: e.target.value } }))} /></div>
                <div>
                  <div className="flex justify-between items-center mb-2"><Label>Journey Items</Label><Button type="button" size="sm" variant="outline" onClick={addJourneyItem}><Plus className="w-4 h-4 mr-1" />Add Item</Button></div>
                  <div className="space-y-3">
                    {(content.journey?.items || []).map((item, i) => (
                      <div key={i} className="border rounded-xl p-4 space-y-3 bg-card/50">
                        <div className="flex flex-wrap gap-2 items-center">
                          <Input placeholder="Year" value={item.year} onChange={(e) => updateJourneyItem(i, "year", e.target.value)} className="w-24" />
                          <Input placeholder="Title (e.g. B.Tech, Internship)" value={item.title} onChange={(e) => updateJourneyItem(i, "title", e.target.value)} className="flex-1 min-w-[150px]" />
                          <select value={item.icon} onChange={(e) => updateJourneyItem(i, "icon", e.target.value)} className="rounded-md border px-3 py-2 bg-background">
                            <option value="GraduationCap">Education</option><option value="Briefcase">Work</option><option value="Award">Achievement</option><option value="Rocket">Project</option><option value="MapPin">Other</option>
                          </select>
                          <Button type="button" size="icon" variant="ghost" onClick={() => removeJourneyItem(i)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                        <Textarea placeholder="Description" value={item.description} onChange={(e) => updateJourneyItem(i, "description", e.target.value)} rows={2} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
              <p className="text-sm text-muted-foreground mb-6">Add categories and skills. Format: {"{ \"Category\": [\"skill1\", \"skill2\"] }"}</p>
              <div className="space-y-4">
                <div><Label>Section Title</Label><Input value={content.technicalSkills?.sectionTitle ?? ""} onChange={(e) => setContent((c) => ({ ...c, technicalSkills: { ...c.technicalSkills, sectionTitle: e.target.value } }))} /></div>
                <div><Label>Section Description</Label><Textarea value={content.technicalSkills?.sectionDesc ?? ""} onChange={(e) => setContent((c) => ({ ...c, technicalSkills: { ...c.technicalSkills, sectionDesc: e.target.value } }))} /></div>
                <div>
                  <div className="flex justify-between items-center mb-2"><Label>Skill Categories</Label><Button type="button" size="sm" variant="outline" onClick={addSkillsCategory}><Plus className="w-4 h-4 mr-1" />Add Category</Button></div>
                  <div className="space-y-4">
                    {Object.entries(content.technicalSkills?.skills || {}).map(([catName, skills]) => (
                      <div key={catName} className="border rounded-xl p-4 bg-card/50">
                        <div className="flex gap-2 mb-2">
                          <Input value={catName} onChange={(e) => updateSkillsCategory(catName, e.target.value, skills)} placeholder="Category" className="font-medium" />
                          <Button type="button" size="icon" variant="ghost" onClick={() => removeSkillsCategory(catName)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                        <Input placeholder="Skills (comma separated)" value={skills.join(", ")} onChange={(e) => updateSkillsCategory(catName, catName, e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Or edit as JSON</Label>
                  <Textarea value={JSON.stringify(content.technicalSkills?.skills || {}, null, 2)} onChange={(e) => {
                    try { setContent((c) => ({ ...c, technicalSkills: { ...c.technicalSkills, skills: JSON.parse(e.target.value || "{}") } })); } catch {}
                  }} rows={10} className="font-mono text-sm mt-2" />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Projects Section</h3>
              <div className="space-y-4 mb-6">
                <div><Label>Section Title</Label><Input value={content.projects?.sectionTitle ?? ""} onChange={(e) => setContent((c) => ({ ...c, projects: { ...c.projects, sectionTitle: e.target.value } }))} /></div>
                <div><Label>Section Description</Label><Textarea value={content.projects?.sectionDesc ?? ""} onChange={(e) => setContent((c) => ({ ...c, projects: { ...c.projects, sectionDesc: e.target.value } }))} /></div>
              </div>
              <form onSubmit={saveProject} className="border rounded-lg p-4 space-y-4 mb-6">
                <h4 className="font-medium">{editingProjectId ? "Edit Project" : "Add Project"}</h4>
                <div className="grid gap-2">
                  <Label>Title</Label><Input value={projectForm.title ?? ""} onChange={(e) => setProjectForm((f) => ({ ...f, title: e.target.value }))} required />
                  <Label>Description</Label><Input value={projectForm.description ?? ""} onChange={(e) => setProjectForm((f) => ({ ...f, description: e.target.value }))} />
                  <Label>Long Description</Label><Textarea value={projectForm.longDescription ?? ""} onChange={(e) => setProjectForm((f) => ({ ...f, longDescription: e.target.value }))} rows={3} />
                  <Label>Tech Stack (comma separated)</Label><Input value={Array.isArray(projectForm.techStack) ? projectForm.techStack.join(", ") : projectForm.techStack ?? ""} onChange={(e) => setProjectForm((f) => ({ ...f, techStack: e.target.value }))} />
                  <Label>Category</Label><Input value={projectForm.category ?? ""} onChange={(e) => setProjectForm((f) => ({ ...f, category: e.target.value }))} />
                  <Label>Image URL</Label>
                  <div className="flex gap-2">
                    <Input value={projectForm.image ?? ""} onChange={(e) => setProjectForm((f) => ({ ...f, image: e.target.value }))} placeholder="URL or upload" />
                    <Label className="cursor-pointer flex items-center gap-1 px-4 py-2 border rounded-md hover:bg-secondary">
                      <Upload className="w-4 h-4" /> Upload
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </Label>
                  </div>
                  <Label>GitHub URL</Label><Input value={projectForm.githubUrl ?? ""} onChange={(e) => setProjectForm((f) => ({ ...f, githubUrl: e.target.value }))} />
                  <Label>Demo URL</Label><Input value={projectForm.demoUrl ?? ""} onChange={(e) => setProjectForm((f) => ({ ...f, demoUrl: e.target.value }))} />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Save Project</Button>
                  {editingProjectId && <Button type="button" variant="outline" onClick={() => { setProjectForm({}); setEditingProjectId(null); }}>Cancel</Button>}
                </div>
              </form>
              <div className="space-y-2">
                {projects.map((p) => (
                  <div key={p.id} className="flex items-center justify-between border rounded p-3">
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-sm text-muted-foreground">{p.description}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => editProject(p)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteProject(p.id)}>Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Section</h3>
              <div className="space-y-4">
                <div><Label>Email</Label><Input value={content.contact?.email ?? ""} onChange={(e) => setContent((c) => ({ ...c, contact: { ...c.contact, email: e.target.value } }))} /></div>
                <div><Label>Location</Label><Input value={content.contact?.location ?? ""} onChange={(e) => setContent((c) => ({ ...c, contact: { ...c.contact, location: e.target.value } }))} /></div>
                <div><Label>Availability Message</Label><Textarea value={content.contact?.availability ?? ""} onChange={(e) => setContent((c) => ({ ...c, contact: { ...c.contact, availability: e.target.value } }))} rows={4} /></div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="footer" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Footer</h3>
              <div className="space-y-4">
                <div><Label>Site Name</Label><Input value={content.footer?.siteName ?? ""} onChange={(e) => setContent((c) => ({ ...c, footer: { ...c.footer, siteName: e.target.value } }))} /></div>
                <div><Label>Copyright By</Label><Input value={content.footer?.copyrightBy ?? ""} onChange={(e) => setContent((c) => ({ ...c, footer: { ...c.footer, copyrightBy: e.target.value } }))} /></div>
                <div>
                  <div className="flex justify-between items-center mb-2"><Label>Social Links</Label><Button type="button" size="sm" variant="outline" onClick={addSocialLink}><Plus className="w-4 h-4 mr-1" />Add</Button></div>
                  <div className="space-y-2">
                    {(content.footer?.socialLinks || []).map((link, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <select value={link.icon} onChange={(e) => updateSocialLink(i, "icon", e.target.value)} className="rounded-md border px-3 py-2 bg-background w-32">
                          <option value="Github">GitHub</option><option value="Linkedin">LinkedIn</option><option value="Twitter">Twitter</option>
                        </select>
                        <Input placeholder="URL" value={link.href} onChange={(e) => updateSocialLink(i, "href", e.target.value)} className="flex-1" />
                        <Input placeholder="Platform" value={link.platform} onChange={(e) => updateSocialLink(i, "platform", e.target.value)} />
                        <Button type="button" size="icon" variant="ghost" onClick={() => removeSocialLink(i)}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button onClick={saveSiteContent} disabled={saving} className="gap-2">
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
