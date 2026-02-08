import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Award, Rocket, MapPin } from 'lucide-react';
import { useSiteContent } from '@/hooks/use-site-content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Briefcase,
  Award,
  Rocket,
  MapPin,
};

export const Journey = () => {
  const { content } = useSiteContent();
  const journeyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(journeyRef, { once: true, margin: '-80px' });
  const journey = content.journey || {};
  const items = journey.items || [];

  if (items.length === 0) return null;

  return (
    <section id="journey" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <motion.div
        className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div ref={journeyRef} className="container mx-auto px-6 relative z-10">
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
            {journey.sectionTitle ?? 'My Journey'}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {journey.sectionDesc ?? "Milestones and experiences that shaped my path."}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <motion.div
            className="absolute left-[19px] md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent"
            initial={{ height: 0 }}
            animate={{ height: isInView ? '100%' : 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="space-y-10">
            {items.map((item, index) => (
              <motion.div
                key={`${item.year}-${index}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-14 md:pl-16"
              >
                <motion.div
                  className="absolute left-0 w-10 h-10 rounded-xl bg-card border-2 border-primary flex items-center justify-center shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                >
                  {(() => {
                    const Icon = iconMap[item.icon] || Rocket;
                    return <Icon className="w-5 h-5 text-primary" />;
                  })()}
                </motion.div>

                <motion.div
                  className="bg-card/80 backdrop-blur border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors duration-300"
                  whileHover={{ x: 8, boxShadow: '0 20px 40px -15px hsl(var(--primary) / 0.15)' }}
                >
                  <span className="text-xs font-semibold text-primary tracking-wider uppercase">
                    {item.year}
                  </span>
                  <h4 className="text-xl font-bold text-foreground mt-2">{item.title}</h4>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
