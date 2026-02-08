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
    <footer className="py-12 border-t border-border relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <span className="text-lg font-bold gradient-text">{footer.siteName ?? 'Portfolio'}</span>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1 justify-center md:justify-start">
              © {currentYear} Made with <Heart className="w-3 h-3 text-destructive inline animate-pulse" /> by {footer.copyrightBy ?? 'V Nohith Kumar'}
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex gap-6"
          >
            {[
              { label: 'Home', href: '#home' },
              { label: 'Projects', href: '#projects' },
              { label: 'Journey', href: '#journey' },
              { label: 'Technical Skills', href: '#technical-skills' },
              { label: 'Contact', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socialLinksFinal.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
