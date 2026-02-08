import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { Project } from '@/data/projects';
import { Button } from '@/components/ui/button';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[85vh] z-50 overflow-hidden"
          >
            <div className="relative h-full bg-card border border-border rounded-2xl shadow-lg overflow-hidden flex flex-col">
              {/* Generative art border effect */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute top-0 left-0 w-32 h-32 opacity-30"
                  style={{
                    background: `radial-gradient(circle, hsl(var(--primary) / 0.5), transparent)`,
                  }}
                  animate={{
                    x: [0, 20, 0],
                    y: [0, 10, 0],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-48 h-48 opacity-20"
                  style={{
                    background: `radial-gradient(circle, hsl(var(--accent) / 0.5), transparent)`,
                  }}
                  animate={{
                    x: [0, -15, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
              </div>

              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-background/50 backdrop-blur-sm"
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Content */}
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                {/* Image */}
                <div className="relative h-64 md:h-80">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Category */}
                  <div className="absolute bottom-6 left-6">
                    <span className="px-4 py-2 text-sm font-medium bg-primary/20 text-primary backdrop-blur-sm rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {project.title}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.longDescription}
                  </p>

                  {/* Tech stack */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-foreground mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-lg echo-glow"
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </motion.a>
                    )}
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
