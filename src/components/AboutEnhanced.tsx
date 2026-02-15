import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Code2, Users, Zap } from 'lucide-react';

// Skills data
const skillsData = [
  { name: 'Flutter', level: 90, category: 'Mobile', color: 'from-blue-500' },
  { name: 'Python', level: 85, category: 'Backend', color: 'from-yellow-500' },
  { name: 'Networks (TCP/IP)', level: 85, category: 'Systems', color: 'from-purple-500' },
  { name: 'JavaScript/React', level: 88, category: 'Frontend', color: 'from-cyan-500' },
  { name: 'Android Studio', level: 82, category: 'Mobile', color: 'from-green-500' },
  { name: 'C++', level: 78, category: 'Backend', color: 'from-red-500' },
  { name: 'Full-Stack (JSP/HTML/CSS)', level: 80, category: 'Full Stack', color: 'from-orange-500' },
  { name: 'GitHub', level: 90, category: 'DevOps', color: 'from-gray-500' },
];

const educationTimeline = [
  {
    year: '2022 - Present',
    title: 'BTech Computer Science',
    institution: 'JNTUH, Hyderabad',
    description: '3rd Year Student | Focus: Networks, Mobile Dev, Full Stack',
    icon: Award,
  },
  {
    year: '2024',
    title: 'SIH Hackathon Finalist',
    institution: 'Smart India Hackathon',
    description: 'Developed innovative solutions for national problems',
    icon: Zap,
  },
  {
    year: '2023 - Present',
    title: 'Freelance Developer',
    institution: 'Self-Employed',
    description: 'Building Flutter apps and web solutions for clients',
    icon: Code2,
  },
];

// Animated progress bar component
const AnimatedSkillBar = ({ skill, isVisible }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-sm">{skill.name}</span>
        <span className="text-primary text-xs">{skill.level}%</span>
      </div>
      <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden border border-border/50">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${skill.color} to-accent rounded-full shadow-lg`}
        />
      </div>
      <span className="text-xs text-gray-500 mt-1">{skill.category}</span>
    </motion.div>
  );
};

// Timeline item
const TimelineItem = ({ item, index }) => {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 mb-8"
    >
      {/* Timeline dot */}
      <motion.div
        whileHover={{ scale: 1.3 }}
        className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary border-2 border-background"
      />

      {/* Timeline line */}
      {index < educationTimeline.length - 1 && (
        <div className="absolute left-[7px] top-7 w-0.5 h-24 bg-gradient-to-b from-primary/50 to-transparent" />
      )}

      {/* Content */}
      <div className="rounded-lg border border-border/50 bg-card/50 p-4 hover:border-primary/50 transition-colors">
        <div className="flex items-start gap-3 mb-2">
          <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="text-xs text-primary font-semibold">{item.year}</p>
            <h4 className="font-bold text-lg">{item.title}</h4>
            <p className="text-sm text-gray-400">{item.institution}</p>
          </div>
        </div>
        <p className="text-sm text-gray-300">{item.description}</p>
      </div>
    </motion.div>
  );
};

export const AboutEnhanced = () => {
  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl font-bold mb-4">
          About <span className="text-primary">Me</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A passionate developer with a love for building elegant solutions. When I'm not coding,
          I'm either creating reels or competing in hackathons.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Skills section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" />
            Technical Skills
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsData.map((skill) => (
              <AnimatedSkillBar key={skill.name} skill={skill} isVisible={true} />
            ))}
          </div>

          {/* Fun fact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 p-6 rounded-lg border border-primary/30 bg-primary/5"
          >
            <p className="text-sm text-gray-300">
              <span className="font-bold text-primary">Fun Fact:</span> When I'm not building
              apps or designing networks, you'll find me editing 30-second reels or exploring new
              technologies. Hackathon warrior 🚀
            </p>
          </motion.div>
        </motion.div>

        {/* Education timeline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Journey
          </h3>

          <div className="relative">
            {educationTimeline.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
