import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Zap, Code2 } from 'lucide-react';
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
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40"
          />

          {/* Floating Modal with better centering */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.16, 1, 0.3, 1],
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 pointer-events-auto"
          >
            <div className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 -z-10"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--card)), hsl(var(--background)))`,
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Glowing border effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  padding: "1px",
                  background: `linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.3))`,
                  borderRadius: "24px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  pointerEvents: "none",
                }}
              />

              {/* Content container */}
              <div className="relative bg-card/95 backdrop-blur-md rounded-3xl overflow-hidden flex flex-col h-full">
                
                {/* Close Button - Floating */}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-background/40 hover:bg-background/60 backdrop-blur-md flex items-center justify-center transition-all border border-border/50"
                >
                  <X className="w-5 h-5 text-foreground" />
                </motion.button>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                  {/* Hero Image Section */}
                  <div className="relative h-80 md:h-96 overflow-hidden group">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    
                    {/* Category badge - positioned bottom left */}
                    <motion.div
                      className="absolute bottom-6 left-6 flex items-center gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="px-4 py-2 text-sm font-semibold bg-primary/20 text-primary backdrop-blur-md rounded-full border border-primary/30">
                        {project.category}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 md:p-12">
                    {/* Title */}
                    <motion.h2
                      className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {project.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      className="text-lg text-muted-foreground leading-relaxed mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {project.longDescription || project.description}
                    </motion.p>

                    {/* Tech Stack - Grid layout */}
                    {project.techStack && project.techStack.length > 0 && (
                      <motion.div
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <Code2 className="w-5 h-5 text-primary" />
                          <h3 className="text-sm font-semibold text-foreground">Technologies Utilized</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {project.techStack.map((tech, idx) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 0.4 + idx * 0.05 }}
                            >
                              <span className="px-4 py-2 text-sm font-medium bg-gradient-to-br from-primary/20 to-accent/20 text-foreground rounded-xl border border-primary/30 hover:border-primary/60 transition-all cursor-default hover:shadow-lg hover:shadow-primary/20">
                                {tech}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <motion.div
                      className="flex flex-wrap gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/50"
                        >
                          <Zap className="w-4 h-4" />
                          View Live Demo
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-secondary/50"
                        >
                          <Github className="w-4 h-4" />
                          Source Code
                        </motion.a>
                      )}
                    </motion.div>
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
