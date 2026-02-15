import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Star, Zap } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      {/* Glowing background effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background: `linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--accent) / 0.4), hsl(var(--primary) / 0.3))`,
          filter: 'blur(20px)',
        }}
        animate={isHovered ? { scale: [1, 1.1, 1], opacity: [0, 100, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ripple effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            border: '2px solid hsl(var(--primary) / 0.4)',
          }}
        />
      )}

      {/* Main card */}
      <motion.div
        className="relative bg-gradient-to-br from-card to-card/80 border border-border/60 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 group-hover:border-primary/40"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image container with parallax effect */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ transform: "translateZ(20px)" }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Category badge */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.12 + 0.2 }}
          >
            <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-primary/30 to-accent/30 text-primary backdrop-blur-md rounded-full border border-primary/40">
              {project.category}
            </span>
          </motion.div>

          {/* Icon overlay */}
          <motion.div
            className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            {project.featured && (
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="p-2 bg-amber-500/20 backdrop-blur-md rounded-lg text-amber-400 border border-amber-500/30"
              >
                <Star className="w-4 h-4 fill-current" />
              </motion.div>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-background/60 backdrop-blur-md rounded-lg text-foreground hover:text-primary transition-colors border border-border/50"
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-background/60 backdrop-blur-md rounded-lg text-foreground hover:text-primary transition-colors border border-border/50"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Content section */}
        <div className="p-6" style={{ transform: "translateZ(30px)" }}>
          {/* Title */}
          <motion.h3
            className="text-xl font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12 + 0.1 }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-sm text-muted-foreground mb-4 line-clamp-2 group-hover:text-muted-foreground/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12 + 0.15 }}
          >
            {project.description}
          </motion.p>

          {/* Tech stack tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12 + 0.2 }}
          >
            {project.techStack.slice(0, 3).map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.12 + 0.25 + i * 0.05 }}
                className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md border border-primary/20 group-hover:border-primary/50 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
                +{project.techStack.length - 3}
              </span>
            )}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            whileHover={{ scale: 1.02, gap: "8px" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group-hover:gap-3"
          >
            <span>View Project</span>
            <motion.span
              animate={isHovered ? { x: 2 } : { x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Zap className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
