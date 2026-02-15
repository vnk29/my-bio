import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus, Trash2, Upload, Save, LogOut, Home, FileText, Zap, Mail, Settings, Search, Edit2, Eye, EyeOff, ChevronRight, AlertCircle, CheckCircle2, Clock, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteContent } from "@/hooks/use-site-content";
import type { ApiProject } from "@/hooks/use-projects-api";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

const defaultContent: SiteContent = {
  hero: { greeting: "Hello, I'm", name: "V NOHITH KUMAR", title: "Full-Stack Developer", bio: "", stats: [], ctaPrimary: "View Projects", ctaSecondary: "Get in Touch" },
  journey: { 
    sectionTitle: "My Life Journey", 
    sectionDesc: "A timeline of the moments, lessons, and experiences that shaped who I am.",
    items: [
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
    ]
  },
  technicalSkills: { sectionTitle: "Technical Skills", sectionDesc: "Technologies and tools I'm proficient in.", skills: {} },
  contact: { email: "nohithkumar01@gmail.com", location: "Gandipet, Hyderabad", availability: "" },
  footer: { siteName: "Portfolio", copyrightBy: "V Nohith Kumar", socialLinks: [] },
  projects: { sectionTitle: "Projects", sectionDesc: "" },
};

const AdminNav = ({ activeTab, setActiveTab, onLogout }: { activeTab: string; setActiveTab: (tab: string) => void; onLogout: () => void }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "hero", label: "Hero Section", icon: Zap },
    { id: "projects", label: "Projects", icon: FileText },
    { id: "journey", label: "Journey", icon: Clock },
    { id: "skills", label: "Skills", icon: Zap },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "footer", label: "Footer", icon: Settings },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen p-6 flex flex-col fixed left-0 top-0">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" /> Admin
        </h2>
        <p className="text-xs text-gray-400 mt-1">Portfolio Management</p>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-primary text-white shadow-lg"
                  : "text-gray-300 hover:bg-slate-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </motion.button>
          );
        })}
      </nav>

      <div className="space-y-2 pt-4 border-t border-slate-700">
        <Link to="/">
          <Button variant="outline" className="w-full justify-start gap-2 text-gray-300">
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </Button>
        </Link>
        <Button onClick={onLogout} variant="destructive" className="w-full justify-start gap-2">
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string | number; color: string }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className={`bg-gradient-to-br from-${color}-500/10 to-${color}-600/5 border border-${color}-500/20 rounded-xl p-6`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-400 mb-1">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`p-3 rounded-lg bg-${color}-500/20`}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
    </div>
  </motion.div>
);

const Dashboard = ({ projects, contacts }: { projects: any[]; contacts?: any[] }) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
      <p className="text-gray-400">Welcome to your portfolio admin panel</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={FileText} label="Total Projects" value={projects.length} color="blue" />
      <StatCard icon={Users} label="Contacts" value={contacts?.length || 0} color="green" />
      <StatCard icon={CheckCircle2} label="Status" value="Active" color="emerald" />
      <StatCard icon={Zap} label="Performance" value="Excellent" color="amber" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 bg-card/50 backdrop-blur">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" /> Recent Projects
        </h3>
        <div className="space-y-3">
          {projects.slice(0, 5).map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background transition-colors">
              <div>
                <p className="font-medium text-sm">{p.title}</p>
                <p className="text-xs text-gray-400">{p.category}</p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{p.techStack?.length || 0} tech</span>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-gray-400 text-sm">No projects yet</p>}
        </div>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-green-500" /> Quick Stats
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
            <span className="text-sm text-gray-400">All Sections Complete</span>
            <span className="text-lg font-bold text-green-500">✓</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
            <span className="text-sm text-gray-400">Last Updated</span>
            <span className="text-sm font-medium">Just now</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
            <span className="text-sm text-gray-400">Site Status</span>
            <span className="text-sm font-medium text-green-500">Live</span>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const HeroEditor = ({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Hero Section</h2>
        <Button variant="outline" onClick={() => setShowPreview(!showPreview)} size="sm" className="gap-2">
          {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showPreview ? "Hide" : "Show"} Preview
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-card/50 backdrop-blur">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> Hero Content
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">greeting</Label>
                <Input
                  value={content.hero?.greeting ?? ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, greeting: e.target.value },
                    })
                  }
                  placeholder="e.g., Hello, I'm"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Your Name</Label>
                <Input
                  value={content.hero?.name ?? ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, name: e.target.value },
                    })
                  }
                  placeholder="V NOHITH KUMAR"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Job Title</Label>
                <Input
                  value={content.hero?.title ?? ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, title: e.target.value },
                    })
                  }
                  placeholder="Full-Stack Developer"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Bio / About</Label>
                <Textarea
                  value={content.hero?.bio ?? ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, bio: e.target.value },
                    })
                  }
                  placeholder="Tell about yourself..."
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur">
            <h3 className="text-lg font-bold mb-4">Call-to-Action Buttons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Primary Button</Label>
                <Input
                  value={content.hero?.ctaPrimary ?? ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, ctaPrimary: e.target.value },
                    })
                  }
                  placeholder="View Projects"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Secondary Button</Label>
                <Input
                  value={content.hero?.ctaSecondary ?? ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, ctaSecondary: e.target.value },
                    })
                  }
                  placeholder="Get in Touch"
                  className="mt-1"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur">
            <h3 className="text-lg font-bold mb-4">Achievement Stats</h3>
            <div className="space-y-4">
              {[0, 1].map((i) => {
                const s = (content.hero?.stats || [])[i] || {
                  value: 0,
                  label: "",
                  suffix: "",
                };
                return (
                  <div key={i} className="p-4 bg-background/50 rounded-lg border border-border">
                    <p className="font-medium mb-3 text-sm">Stat {i + 1}</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">Value</Label>
                        <Input
                          type="number"
                          value={s.value ?? ""}
                          onChange={(e) => {
                            const stats = [
                              ...(content.hero?.stats || []).slice(0, 2),
                            ];
                            while (stats.length <= i)
                              stats.push({ value: 0, label: "", suffix: "" });
                            stats[i] = {
                              ...stats[i],
                              value: parseInt(e.target.value) || 0,
                            };
                            setContent({
                              ...content,
                              hero: { ...content.hero, stats },
                            });
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Label</Label>
                        <Input
                          value={s.label ?? ""}
                          onChange={(e) => {
                            const stats = [
                              ...(content.hero?.stats || []).slice(0, 2),
                            ];
                            while (stats.length <= i)
                              stats.push({ value: 0, label: "", suffix: "" });
                            stats[i] = { ...stats[i], label: e.target.value };
                            setContent({
                              ...content,
                              hero: { ...content.hero, stats },
                            });
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Suffix</Label>
                        <Input
                          value={s.suffix ?? ""}
                          onChange={(e) => {
                            const stats = [
                              ...(content.hero?.stats || []).slice(0, 2),
                            ];
                            while (stats.length <= i)
                              stats.push({ value: 0, label: "", suffix: "" });
                            stats[i] = { ...stats[i], suffix: e.target.value };
                            setContent({
                              ...content,
                              hero: { ...content.hero, stats },
                            });
                          }}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {showPreview && (
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card/50 backdrop-blur sticky top-6">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4" /> Live Preview
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-gray-400">Greeting</p>
                  <p className="font-bold text-lg">{content.hero?.greeting}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Name</p>
                  <p className="font-bold text-primary text-xl">
                    {content.hero?.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Title</p>
                  <p className="text-base">{content.hero?.title}</p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-gray-400 mb-2">Stats Preview</p>
                  <div className="space-y-1">
                    {(content.hero?.stats || []).map((stat, i) => (
                      <div key={i} className="text-xs">
                        <span className="font-bold">{stat.value}{stat.suffix}</span>{" "}
                        <span className="text-gray-400">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectsEditor = ({ projects, content, setContent, token }: { projects: any[]; content: SiteContent; setContent: (c: SiteContent) => void; token: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [projectForm, setProjectForm] = useState<Partial<any>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "All" || p.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, filterCategory]);

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      title: projectForm.title,
      description: projectForm.description,
      longDescription:
        projectForm.longDescription || projectForm.description,
      techStack: Array.isArray(projectForm.techStack)
        ? projectForm.techStack
        : (projectForm.techStack as string)
            ?.split(",")
            .map((s) => s.trim())
            .filter(Boolean) || [],
      category: projectForm.category || "General",
      image: projectForm.image,
      githubUrl: projectForm.githubUrl,
      demoUrl: projectForm.demoUrl,
    };

    try {
      if (editingId) {
        await fetch(`${API}/api/projects/${editingId}`, {
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
      queryClient.invalidateQueries({ queryKey: ["projects-api"] });
      setProjectForm({});
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await fetch(`${API}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      queryClient.invalidateQueries({ queryKey: ["projects-api"] });
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Projects Management</h2>
          <p className="text-gray-400 text-sm mt-1">
            {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="gap-2"
          size="lg"
        >
          <Plus className="w-4 h-4" /> New Project
        </Button>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur">
        <h3 className="text-lg font-bold mb-4">Projects Section Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Section Title</Label>
            <Input
              value={content.projects?.sectionTitle ?? ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  projects: {
                    ...content.projects,
                    sectionTitle: e.target.value,
                  },
                })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Section Description</Label>
            <Input
              value={content.projects?.sectionDesc ?? ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  projects: {
                    ...content.projects,
                    sectionDesc: e.target.value,
                  },
                })
              }
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur border-primary/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">
                  {editingId ? "Edit Project" : "New Project"}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowForm(false)}
                >
                  ✕
                </Button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Project Title *</Label>
                    <Input
                      value={projectForm.title ?? ""}
                      onChange={(e) =>
                        setProjectForm((f) => ({
                          ...f,
                          title: e.target.value,
                        }))
                      }
                      placeholder="My Awesome Project"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Category</Label>
                    <Input
                      value={projectForm.category ?? ""}
                      onChange={(e) =>
                        setProjectForm((f) => ({
                          ...f,
                          category: e.target.value,
                        }))
                      }
                      placeholder="Web Development"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Short Description *
                  </Label>
                  <Input
                    value={projectForm.description ?? ""}
                    onChange={(e) =>
                      setProjectForm((f) => ({
                        ...f,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Brief description for the project"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Long Description</Label>
                  <Textarea
                    value={projectForm.longDescription ?? ""}
                    onChange={(e) =>
                      setProjectForm((f) => ({
                        ...f,
                        longDescription: e.target.value,
                      }))
                    }
                    placeholder="Detailed description of what the project does..."
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Tech Stack (comma separated)
                  </Label>
                  <Input
                    value={
                      Array.isArray(projectForm.techStack)
                        ? projectForm.techStack.join(", ")
                        : projectForm.techStack ?? ""
                    }
                    onChange={(e) =>
                      setProjectForm((f) => ({
                        ...f,
                        techStack: e.target.value,
                      }))
                    }
                    placeholder="React, Node.js, PostgreSQL"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Image URL</Label>
                    <Input
                      value={projectForm.image ?? ""}
                      onChange={(e) =>
                        setProjectForm((f) => ({
                          ...f,
                          image: e.target.value,
                        }))
                      }
                      placeholder="https://..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">GitHub URL</Label>
                    <Input
                      value={projectForm.githubUrl ?? ""}
                      onChange={(e) =>
                        setProjectForm((f) => ({
                          ...f,
                          githubUrl: e.target.value,
                        }))
                      }
                      placeholder="https://github.com/..."
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Demo URL</Label>
                  <Input
                    value={projectForm.demoUrl ?? ""}
                    onChange={(e) =>
                      setProjectForm((f) => ({
                        ...f,
                        demoUrl: e.target.value,
                      }))
                    }
                    placeholder="https://demo-link.com"
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="gap-2">
                    <Save className="w-4 h-4" /> Save Project
                  </Button>
                  {editingId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setProjectForm({});
                        setEditingId(null);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="p-6 bg-card/50 backdrop-blur">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="pl-10"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-background text-sm"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -2 }}
                className="border border-border rounded-lg overflow-hidden bg-background/50 hover:bg-background transition-colors"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-sm">{project.title}</h4>
                      <p className="text-xs text-gray-400">{project.category}</p>
                    </div>
                    {project.image && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-3">
                    {project.description}
                  </p>
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setProjectForm(project);
                        setEditingId(project.id);
                        setShowForm(true);
                      }}
                      className="flex-1 gap-1"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteProject(project.id)}
                      className="flex-1 gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-400">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No projects found</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

const SectionEditor = ({ title, description, content, field, setContent, children }: { title: string; description?: string; content: SiteContent; field: string; setContent: (c: SiteContent) => void; children: React.ReactNode }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold">{title}</h2>
      {description && <p className="text-gray-400 text-sm mt-1">{description}</p>}
    </div>
    <Card className="p-6 bg-card/50 backdrop-blur">
      <div className="space-y-6">{children}</div>
    </Card>
  </div>
);

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const queryClient = useQueryClient();

  const { data: siteContent = defaultContent, refetch: refetchContent } =
    useQuery({
      queryKey: ["site-content"],
      queryFn: async () => {
        const res = await fetch(`${API}/api/site-content`);
        if (!res.ok) throw new Error("Failed");
        return res.json();
      },
      enabled: !!token,
    });

  const { data: projects = [] } = useQuery({
    queryKey: ["projects-api"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/projects`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    enabled: !!token,
  });

  const [content, setContent] = useState<SiteContent>(siteContent);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const contentLoadedRef = React.useRef(false);

  useEffect(() => {
    // Only update content on initial load, not on subsequent refetches
    if (!contentLoadedRef.current && siteContent) {
      setContent(siteContent);
      contentLoadedRef.current = true;
    }
  }, []);

  // Check if token is still valid by fetching content
  useEffect(() => {
    if (token) {
      fetch(`${API}/api/site-content`, {
        headers: { Authorization: token }
      }).catch(() => {
        // If fetch fails, session is likely expired
        setSessionError('Session expired. Please refresh and login again.');
      });
    }
  }, [token]);

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
        setLoginForm({ username: "", password: "" });
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
    setActiveTab("dashboard");
  };

  const saveSiteContent = async () => {
    setSaving(true);
    setSaveMessage(null);
    
    // Check if token is still valid, if not try to re-login
    if (!token) {
      setSaveMessage({ type: 'error', text: '❌ Session expired. Please refresh and login again.' });
      setSaving(false);
      return;
    }
    
    try {
      const res = await fetch(`${API}/api/site-content`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(content),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setSaveMessage({ type: 'success', text: '✅ All changes saved successfully!' });
        // Refetch to sync with backend
        setTimeout(() => {
          refetchContent();
          queryClient.invalidateQueries({ queryKey: ["site-content"] });
        }, 500);
        // Clear message after 3 seconds
        setTimeout(() => setSaveMessage(null), 3000);
      } else if (res.status === 401) {
        setSaveMessage({ type: 'error', text: '❌ Session expired. Refreshing page to login again...' });
        // Clear localStorage and refresh
        setTimeout(() => {
          localStorage.removeItem("admin_token");
          window.location.reload();
        }, 2000);
      } else {
        setSaveMessage({ type: 'error', text: `❌ Save failed: ${data.error || 'Unknown error'}` });
      }
    } catch (error: any) {
      setSaveMessage({ type: 'error', text: `❌ Error: ${error.message || 'Failed to save'}` });
    } finally {
      setSaving(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 bg-card/50 backdrop-blur border border-border/50">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Admin Login</h2>
              <p className="text-gray-400 text-sm mt-1">
                Access your portfolio dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Username</Label>
                <Input
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm((f) => ({ ...f, username: e.target.value }))
                  }
                  placeholder="admin"
                  className="mt-1"
                  autoFocus
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Password</Label>
                <Input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm((f) => ({ ...f, password: e.target.value }))
                  }
                  placeholder="••••••••"
                  className="mt-1"
                />
              </div>

              {loginError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-400">{loginError}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loggingIn}
                className="w-full"
                size="lg"
              >
                {loggingIn ? "Logging in..." : "Login"}
              </Button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">
              Credentials: admin / admin123
            </p>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <div className="flex-1 ml-64">
        <div className="max-w-6xl mx-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "dashboard" && (
                <Dashboard projects={projects} contacts={[]} />
              )}

              {activeTab === "hero" && (
                <HeroEditor content={content} setContent={setContent} />
              )}

              {activeTab === "projects" && (
                <ProjectsEditor
                  projects={projects}
                  content={content}
                  setContent={setContent}
                  token={token}
                />
              )}

              {activeTab === "journey" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold">Journey Section</h2>
                    <p className="text-gray-400 text-sm mt-1">Add education, experience, and milestones</p>
                  </div>
                  
                  <Card className="p-6 bg-card/50 backdrop-blur">
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label className="text-sm font-medium">Section Title</Label>
                        <Input
                          value={content.journey?.sectionTitle ?? ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              journey: {
                                ...content.journey,
                                sectionTitle: e.target.value,
                              },
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Section Description</Label>
                        <Textarea
                          value={content.journey?.sectionDesc ?? ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              journey: {
                                ...content.journey,
                                sectionDesc: e.target.value,
                              },
                            })
                          }
                          rows={3}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-card/50 backdrop-blur">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Journey Items</h3>
                      <Button
                        onClick={() => {
                          const newItem = { year: new Date().getFullYear().toString(), title: "", description: "", icon: "Rocket" };
                          setContent({
                            ...content,
                            journey: {
                              ...content.journey,
                              items: [...(content.journey?.items || []), newItem],
                            },
                          });
                        }}
                        size="sm"
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" /> Add Item
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {(content.journey?.items || []).map((item, idx) => (
                        <Card key={idx} className="p-4 bg-background/50 border border-border">
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <Label className="text-xs font-medium">Year</Label>
                                <Input
                                  value={item.year ?? ""}
                                  onChange={(e) => {
                                    const newItems = [...(content.journey?.items || [])];
                                    newItems[idx].year = e.target.value;
                                    setContent({
                                      ...content,
                                      journey: { ...content.journey, items: newItems },
                                    });
                                  }}
                                  placeholder="2024"
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label className="text-xs font-medium">Icon</Label>
                                <select
                                  value={item.icon ?? "Rocket"}
                                  onChange={(e) => {
                                    const newItems = [...(content.journey?.items || [])];
                                    newItems[idx].icon = e.target.value;
                                    setContent({
                                      ...content,
                                      journey: { ...content.journey, items: newItems },
                                    });
                                  }}
                                  className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-sm"
                                >
                                  <option>Rocket</option>
                                  <option>GraduationCap</option>
                                  <option>Briefcase</option>
                                  <option>Award</option>
                                  <option>MapPin</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs font-medium">Title</Label>
                              <Input
                                value={item.title ?? ""}
                                onChange={(e) => {
                                  const newItems = [...(content.journey?.items || [])];
                                  newItems[idx].title = e.target.value;
                                  setContent({
                                    ...content,
                                    journey: { ...content.journey, items: newItems },
                                  });
                                }}
                                placeholder="Journey milestone title"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-xs font-medium">Description</Label>
                              <Textarea
                                value={item.description ?? ""}
                                onChange={(e) => {
                                  const newItems = [...(content.journey?.items || [])];
                                  newItems[idx].description = e.target.value;
                                  setContent({
                                    ...content,
                                    journey: { ...content.journey, items: newItems },
                                  });
                                }}
                                placeholder="Describe this journey milestone"
                                rows={2}
                                className="mt-1"
                              />
                            </div>
                            <Button
                              onClick={() => {
                                const newItems = (content.journey?.items || []).filter((_, i) => i !== idx);
                                setContent({
                                  ...content,
                                  journey: { ...content.journey, items: newItems },
                                });
                              }}
                              variant="destructive"
                              size="sm"
                              className="gap-2"
                            >
                              <Trash2 className="w-4 h-4" /> Remove
                            </Button>
                          </div>
                        </Card>
                      ))}
                      {(!content.journey?.items || content.journey.items.length === 0) && (
                        <p className="text-center text-gray-400 py-8">No journey items yet. Add one to get started!</p>
                      )}
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === "skills" && (
                <SectionEditor
                  title="Technical Skills"
                  description="Add technologies and tools"
                  content={content}
                  field="technicalSkills"
                  setContent={setContent}
                >
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Section Title
                      </Label>
                      <Input
                        value={content.technicalSkills?.sectionTitle ?? ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            technicalSkills: {
                              ...content.technicalSkills,
                              sectionTitle: e.target.value,
                            },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Section Description
                      </Label>
                      <Textarea
                        value={content.technicalSkills?.sectionDesc ?? ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            technicalSkills: {
                              ...content.technicalSkills,
                              sectionDesc: e.target.value,
                            },
                          })
                        }
                        rows={3}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </SectionEditor>
              )}

              {activeTab === "contact" && (
                <SectionEditor
                  title="Contact Information"
                  description="Update your contact details"
                  content={content}
                  field="contact"
                  setContent={setContent}
                >
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <Input
                        type="email"
                        value={content.contact?.email ?? ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            contact: {
                              ...content.contact,
                              email: e.target.value,
                            },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Location</Label>
                      <Input
                        value={content.contact?.location ?? ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            contact: {
                              ...content.contact,
                              location: e.target.value,
                            },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Availability Message
                      </Label>
                      <Textarea
                        value={content.contact?.availability ?? ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            contact: {
                              ...content.contact,
                              availability: e.target.value,
                            },
                          })
                        }
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </SectionEditor>
              )}

              {activeTab === "footer" && (
                <SectionEditor
                  title="Footer"
                  description="Configure footer content"
                  content={content}
                  field="footer"
                  setContent={setContent}
                >
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Site Name</Label>
                      <Input
                        value={content.footer?.siteName ?? ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: {
                              ...content.footer,
                              siteName: e.target.value,
                            },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Copyright By
                      </Label>
                      <Input
                        value={content.footer?.copyrightBy ?? ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: {
                              ...content.footer,
                              copyrightBy: e.target.value,
                            },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                </SectionEditor>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 space-y-4">
            {saveMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-lg border ${
                  saveMessage.type === 'success'
                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}
              >
                {saveMessage.text}
              </motion.div>
            )}
            <div className="flex justify-end">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={saveSiteContent}
                  disabled={saving}
                  size="lg"
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save All Changes"}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
