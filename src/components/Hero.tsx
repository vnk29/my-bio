import { motion } from 'framer-motion';
import { ArrowDown, Code2, Briefcase, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSiteContent } from '@/hooks/use-site-content';

const statIcons = [Code2, Sparkles];
const defaultStats = [
  { value: 0, label: 'Projects', suffix: '+' },
  { value: 0, label: 'Technologies', suffix: '+' },
];

const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

export const Hero = () => {
  const { content } = useSiteContent();
  const hero = content.hero || {};
  const stats = (hero.stats || defaultStats).map((s, i) => ({ ...defaultStats[i], ...s }));

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dot pattern background */}
      <div className="absolute inset-0 dot-pattern opacity-50" />
      
      {/* Gradient orbs - floating ambient glow */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-primary/15 rounded-full blur-3xl animate-glow-pulse"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-3xl animate-glow-pulse"
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Photo */}
          {hero.profilePhoto && (
            <div className="flex justify-center mb-6">
              <img
                src={hero.profilePhoto}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
                style={{ background: '#fff' }}
              />
            </div>
          )}
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-medium mb-4"
          >
            {hero.greeting ?? "Hello, I'm"}
          </motion.p>

          {/* Name - gradient text with shimmer */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight"
          >
            <motion.span
              className="gradient-text inline-block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              {hero.name ?? "V NOHITH KUMAR"}
            </motion.span>
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8"
          >
            {hero.title ?? "Full-Stack Developer & Systems Architect"}
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            {hero.bio ?? "I craft elegant solutions to complex problems, from distributed systems to intuitive user interfaces. Passionate about clean code, performance, and building products that make a difference."}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-2 mb-2">
                  {(() => { const Icon = statIcons[index] || Code2; return <Icon className="w-5 h-5 text-primary" />; })()}
                  <span className="text-3xl md:text-4xl font-bold text-foreground">
                    <AnimatedCounter value={stat.value ?? 0} suffix={stat.suffix ?? ''} />
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="#projects"
              className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg echo-glow hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {hero.ctaPrimary ?? "View Projects"}
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {hero.ctaSecondary ?? "Get in Touch"}
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll indicator - bouncy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#projects"
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors group"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs mb-2 tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
