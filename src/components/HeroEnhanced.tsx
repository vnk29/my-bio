import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, Code2, Github, Linkedin, FileDown, ArrowDown } from 'lucide-react';

// Typing effect hook
const useTypeEffect = (text: string, speed = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
};

// Particle background component
const ParticleBackground = () => {
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 20,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-primary/30 rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export const HeroEnhanced = () => {
  const { displayedText: nameText, isComplete: nameComplete } = useTypeEffect(
    'V NOHITH KUMAR',
    80
  );
  const { displayedText: roleText, isComplete: roleComplete } = useTypeEffect(
    'Full-Stack Developer | Networks Enthusiast | Hackathon Warrior',
    50
  );

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FileDown, href: '/resume.pdf', label: 'Resume' },
  ];

  return (
    <section className="relative min-h-[120vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background */}
      <ParticleBackground />
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-6 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-primary font-semibold">Welcome to My Portfolio</span>
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        </motion.div>

        {/* Main name with typing effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-primary via-accent to-blue-500 bg-clip-text text-transparent">
            {nameText}
          </span>
          <motion.span
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.7, repeat: Infinity }}
            className="text-primary"
          >
            |
          </motion.span>
        </motion.h1>

        {/* Role with typing effect */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-2 h-8"
        >
          {roleText}
          {!roleComplete && (
            <motion.span
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              _
            </motion.span>
          )}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          3rd-year BTech CS student crafting elegant solutions for complex problems. 
          Passionate about cloud networks, mobile development, and building products that matter.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex gap-4 justify-center mb-12 flex-wrap"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="relative px-6 py-3 rounded-lg border border-primary/50 hover:border-primary bg-primary/10 hover:bg-primary/20 transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-lg border border-primary opacity-0 group-hover:opacity-100"
                  animate={{ boxShadow: ['0 0 0 0 rgba(0, 255, 136, 0.7)', '0 0 0 10px rgba(0, 255, 136, 0)'] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          {[
            { label: 'Projects', value: '6+' },
            { label: 'Hackathons', value: '3' },
            { label: 'Skills', value: '12+' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-lg bg-card/50 backdrop-blur border border-border/50">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center"
        >
          <ArrowDown className="w-6 h-6 text-primary" />
        </motion.div>
      </div>
    </section>
  );
};
