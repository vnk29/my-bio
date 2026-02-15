import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '@/hooks/use-site-content';
import { ArrowLeft, ArrowRight, 
  Rocket,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  Zap,
  Star,
  Trophy,
  Heart,
  Target,
  Code,
  Users,
} from 'lucide-react';

interface JourneyItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  Zap,
  Star,
  Trophy,
  Heart,
  Target,
  Code,
  Users,
};

export const JourneyEnhanced = () => {
  const { content } = useSiteContent();
  const journeyRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const journey = content.journey || {};
  const items = (journey.items || []) as JourneyItem[];

  if (items.length === 0) return null;

  const handleClick = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  const item = items[currentSlide];
  const Icon = iconMap[item.icon as keyof typeof iconMap] || Rocket;

  return (
    <section 
      id="journey" 
      className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-background/80"
      onClick={handleClick}
      ref={journeyRef}
    >
      {/* Background Animation */}
      <motion.div
        key="bg-left"
        className="absolute -left-1/2 -top-1/2 w-full h-full bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        key="bg-right"
        className="absolute -right-1/2 -bottom-1/2 w-full h-full bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Main Slide Container */}
      <div className="relative z-10 w-full h-screen flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full border border-primary/30">
                <Icon className="w-20 h-20 text-primary" />
              </div>
            </motion.div>

            {/* Year */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-primary font-bold text-lg mb-4"
            >
              {item.year}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            >
              {item.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto px-4"
            >
              {item.description}
            </motion.p>

            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="text-sm text-primary/60">
                {currentSlide + 1} / {items.length}
              </div>
              <div className="flex gap-1">
                {items.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className={`h-2 rounded-full ${
                      idx === currentSlide
                        ? 'bg-primary w-8'
                        : 'bg-primary/30 w-2'
                    }`}
                    animate={{
                      width: idx === currentSlide ? 32 : 8,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Previous Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary/20 hover:bg-primary/40 border border-primary/30 transition-all z-20 hidden md:flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-primary" />
        </motion.button>

        {/* Next Button Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-right pointer-events-none hidden md:block"
        >
          <p className="text-sm text-primary/60 mb-2">Click to advance</p>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Counter - Top Right */}
      <div className="absolute top-6 right-6 z-20 text-sm text-primary/60">
        <span className="font-bold text-primary">{currentSlide + 1}</span>
        <span className="text-primary/40"> of {items.length}</span>
      </div>

      {/* Scroll Hint - Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-primary/40 text-center z-20"
      >
        Click to advance • Use arrow buttons to go back
      </motion.div>
    </section>
  );
};;

export default JourneyEnhanced;
