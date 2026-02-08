import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Award, Rocket } from 'lucide-react';
import { useSiteContent } from '@/hooks/use-site-content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { GraduationCap, Briefcase, Award, Rocket };
const defaultTimeline = [
  { year: '2024', title: 'Senior Software Engineer', description: 'Leading distributed systems architecture at a growth-stage startup', icon: 'Rocket' },
  { year: '2023', title: 'ML Engineer', description: 'Built production ML pipelines serving millions of predictions daily', icon: 'Briefcase' },
  { year: '2022', title: 'Full-Stack Developer', description: 'Developed scalable web applications and microservices', icon: 'Award' },
  { year: '2021', title: 'B.S. Computer Science', description: 'Graduated with honors, specializing in distributed systems', icon: 'GraduationCap' },
];

const defaultSkills = {
  Languages: ['TypeScript', 'Python', 'Go', 'Rust', 'Java'],
  Frontend: ['React', 'Next.js', 'Vue', 'Tailwind CSS', 'Three.js'],
  Backend: ['Node.js', 'FastAPI', 'gRPC', 'GraphQL', 'Kafka'],
  Cloud: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform'],
  ML: ['PyTorch', 'TensorFlow', 'LangChain', 'Hugging Face'],
};

export const About = () => {
  const { content } = useSiteContent();
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const about = content.about || {};
  const timeline = about.timeline || defaultTimeline;
  const skills = about.skills || defaultSkills;

  return (
    <section id="about" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">{about.sectionTitle ?? "Get to Know Me"}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">About</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {about.sectionDesc ?? "My journey from curious student to building systems that scale."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Timeline */}
          <div ref={timelineRef}>
            <h3 className="text-xl font-semibold text-foreground mb-8">Journey</h3>
            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className="absolute left-[15px] top-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"
                initial={{ height: 0 }}
                animate={{ height: isTimelineInView ? '100%' : 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              {/* Timeline items */}
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={`${item.year}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative pl-12"
                  >
                    {/* Icon */}
                    <motion.div
                      className="absolute left-0 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                    >
                      {(() => { const Icon = iconMap[item.icon] || Rocket; return Icon ? <Icon className="w-4 h-4 text-primary" /> : null; })()}
                    </motion.div>

                    {/* Content */}
                    <div className="bg-card border border-border rounded-xl p-5 echo-orb">
                      <span className="text-xs text-primary font-medium">{item.year}</span>
                      <h4 className="text-lg font-semibold text-foreground mt-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-8">Skills</h3>
            <div className="space-y-6">
              {Object.entries(skills).map(([category, items], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
