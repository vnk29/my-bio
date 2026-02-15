import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { useSiteContent } from '@/hooks/use-site-content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Github, Linkedin, Twitter };
const defaultSocialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

export const Footer = () => {
  const { content } = useSiteContent();
  const footer = content.footer || {};
  const currentYear = new Date().getFullYear();
  const socialLinks = (footer.socialLinks || []).map((s) => ({
    icon: iconMap[s.icon] || Github,
    href: s.href,
    label: s.platform,
  }));
  const socialLinksFinal = socialLinks.length ? socialLinks : defaultSocialLinks;

  return (
    <footer className="py-16 md:py-24 border-t border-border/50 relative overflow-hidden bg-gradient-to-b from-background to-background/50 backdrop-blur-sm">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/3 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Content - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {/* Logo */}
            <motion.div
              className="inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl font-bold gradient-text">{footer.siteName ?? 'Portfolio'}</span>
            </motion.div>

            {/* Main Footer Text - Prominent */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-lg md:text-xl text-foreground font-semibold">
                Made with <motion.span 
                  className="text-destructive inline-block"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
    
                </motion.span> by <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">V Nohith Kumar</span>
              </p>
              <p className="text-sm text-muted-foreground">
                © {currentYear} All Rights Reserved
              </p>
            </motion.div>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {[
              { label: 'Home', href: '#home' },
              { label: 'Projects', href: '#projects' },
              { label: 'Journey', href: '#journey' },
              { label: 'Skills', href: '#technical-skills' },
              { label: 'Contact', href: '#contact' },
            ].map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 relative group"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.nav>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-6 mb-8"
          >
            {socialLinksFinal.map((link, idx) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent my-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />

          {/* Bottom Text */}
          <motion.p
            className="text-center text-xs text-muted-foreground/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Crafted with passion • Deployed with precision
          </motion.p>
        </div>
      </div>
    </footer>
  );
};
