import { motion } from 'framer-motion';
import { useSiteContent } from '@/hooks/use-site-content';

const categoryColors = [
  'from-primary/20 to-accent/20 border-primary/30',
  'from-accent/20 to-primary/20 border-accent/30',
  'from-primary/15 to-accent/15 border-primary/25',
  'from-accent/15 to-primary/15 border-accent/25',
];

export const TechnicalSkills = () => {
  const { content } = useSiteContent();
  const tech = content.technicalSkills || {};
  const skills = tech.skills || {};
  const entries = Object.entries(skills);

  if (entries.length === 0) {
    return (
      <section id="technical-skills" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Technical Skills</h2>
            <p className="text-muted-foreground">Add your technical skills from the Admin panel.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="technical-skills" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <motion.div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl translate-x-1/2"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-medium mb-4 block"
          >
            {tech.sectionTitle ?? 'Technical Skills'}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Technical Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {tech.sectionDesc ?? "Technologies and tools I'm proficient in."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {entries.map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className={`rounded-2xl border bg-gradient-to-br p-6 backdrop-blur-sm ${categoryColors[categoryIndex % categoryColors.length]}`}
            >
              <motion.h3
                className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border/50"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 + 0.2 }}
              >
                {category}
              </motion.h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {items.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="px-4 py-2 text-sm font-medium bg-background/60 hover:bg-primary/20 text-foreground rounded-xl border border-border/50 hover:border-primary/40 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
