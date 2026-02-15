import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitBranch, Code2, TrendingUp } from 'lucide-react';

// Counter component for animating numbers
const AnimatedCounter = ({ from = 0, to, duration = 2 }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / (duration * 1000);
      if (progress < 1) {
        setCount(Math.floor(from + (to - from) * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };
    requestAnimationFrame(animate);
  }, [to, duration, from]);

  return <span>{count.toLocaleString()}</span>;
};

// GitHub Stats Component
const GithubStats = ({ username = 'vnohith' }) => {
  const [stats, setStats] = useState({
    repos: 0,
    followers: 0,
    contributions: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        // Fetch user stats
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();

        // For demo purposes, use static values
        // In production, you'd fetch actual data from multiple API calls
        setStats({
          repos: userData.public_repos || 15,
          followers: userData.followers || 45,
          contributions: 320, // Would need separate API call or GitHub GraphQL
          loading: false,
        });
      } catch (error) {
        console.log('GitHub API fetch - using defaults');
        setStats({
          repos: 15,
          followers: 45,
          contributions: 320,
          loading: false,
        });
      }
    };

    fetchGithubStats();
  }, [username]);

  const statItems = [
    {
      icon: Code2,
      label: 'Repositories',
      value: stats.repos,
      color: 'from-blue-500',
    },
    {
      icon: Star,
      label: 'Followers',
      value: stats.followers,
      color: 'from-yellow-500',
    },
    {
      icon: TrendingUp,
      label: 'Contributions',
      value: stats.contributions,
      color: 'from-green-500',
    },
  ];

  return (
    <div className="my-12">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Github className="w-6 h-6 text-primary" />
        GitHub Statistics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-lg border border-border/50 bg-card/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-primary" />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </motion.div>
              </div>
              <p className="text-3xl font-bold mb-2">
                {!stats.loading ? (
                  <AnimatedCounter to={item.value} />
                ) : (
                  '...'
                )}
              </p>
              <p className="text-gray-400 text-sm">{item.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* GitHub contribution graph placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 p-6 rounded-lg border border-border/50 bg-card/50"
      >
        <p className="font-semibold mb-4">Recent Activity</p>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-sm bg-primary/20 hover:bg-primary/40 transition-colors"
              whileHover={{ scale: 1.2 }}
              style={{
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          📈 Contribution graph visualization
        </p>
      </motion.div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8"
      >
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/50 hover:border-primary bg-primary/10 hover:bg-primary/20 transition-all"
        >
          <Github className="w-4 h-4" />
          <span>Visit My GitHub Profile</span>
        </a>
      </motion.div>
    </div>
  );
};

// Live project stats
const ProjectStats = () => {
  const projects = [
    { name: 'Movie Ticket Booking', tech: 'Flutter', status: 'active', stars: 12 },
    { name: 'Money Split App', tech: 'Flutter', status: 'active', stars: 8 },
    { name: 'TCP/IP Networks', tech: 'Python', status: 'active', stars: 24 },
    { name: 'Portfolio Site', tech: 'React', status: 'active', stars: 15 },
  ];

  return (
    <div className="my-8">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Code2 className="w-5 h-5 text-primary" />
        Project Statistics
      </h3>
      <div className="space-y-2">
        {projects.map((proj, idx) => (
          <motion.div
            key={proj.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/20 hover:border-primary/30"
          >
            <div className="flex-1">
              <p className="font-medium text-sm">{proj.name}</p>
              <p className="text-xs text-gray-400">{proj.tech}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                {proj.status}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-3 h-3 fill-yellow-500" />
                <span className="text-xs">{proj.stars}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export { GithubStats, AnimatedCounter, ProjectStats };
