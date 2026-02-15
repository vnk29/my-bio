import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle, Rocket } from 'lucide-react';

// Email JS contact form
export const ContactFormEnhanced = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [message, setMessage] = useState('');
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate email sending (in production, use email-js library)
    // Install: npm install @emailjs/browser
    // Then use: emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
    
    setTimeout(() => {
      setStatus('success');
      setMessage('Message sent successfully! I'll get back to you soon. 🚀');
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-gray-400">
          Have a project idea or want to collaborate? Let's talk!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h3 className="text-2xl font-bold mb-8">Let's Connect</h3>

          {[
            {
              icon: Mail,
              label: 'Email',
              value: 'nohithkumar01@gmail.com',
              href: 'mailto:nohithkumar01@gmail.com',
            },
            {
              icon: Rocket,
              label: 'Quick Response Time',
              value: 'Usually within 24 hours',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className="flex items-start gap-4"
                whileHover={{ x: 8 }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-semibold hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-semibold">{item.value}</p>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Social links */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-gray-400 mb-4">Follow me on</p>
            <div className="flex gap-4">
              {[
                { name: 'GitHub', href: 'https://github.com' },
                { name: 'LinkedIn', href: 'https://linkedin.com' },
                { name: 'Twitter', href: 'https://twitter.com' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="px-4 py-2 rounded-lg border border-border/50 hover:border-primary/50 bg-background/50 hover:bg-primary/10 transition-colors text-sm"
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background/50 focus:bg-background focus:border-primary outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background/50 focus:bg-background focus:border-primary outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell me about your project or idea..."
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background/50 focus:bg-background focus:border-primary outline-none transition-colors resize-none"
            />
          </div>

          {/* Status messages */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-2 text-green-400 text-sm"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                {message}
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400 text-sm"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 rounded-lg border border-primary/50 hover:border-primary bg-primary/10 hover:bg-primary/20 font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </motion.button>

          {/* Rocket launch animation on success */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: -100 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute right-4 top-4"
            >
              <Rocket className="w-8 h-8 text-primary" />
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
};

// Easter egg hook
export const useConsoleEasterEgg = () => {
  useEffect(() => {
    // Log welcome message
    const styles = {
      header: 'color: #00ff88; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00ff88;',
      default: 'color: #0a0a0a; font-size: 12px;',
      command: 'color: #00ff88; font-weight: bold;',
    };

    console.log('%c🎉 Welcome to V Nohith Kumar\'s Portfolio!', styles.header);
    console.log(
      '%c%cHere are some commands you can try:%c\n' +
      '%c> help%c - Show all available commands\n' +
      '%c> skills%c - View technical skills\n' +
      '%c> projects%c - List projects\n' +
      '%c> contact%c - Get contact information\n' +
      '%c> secret%c - 🤫 Find a hidden message\n',
      styles.default,
      styles.default,
      '',
      styles.command,
      styles.default,
      styles.command,
      styles.default,
      styles.command,
      styles.default,
      styles.command,
      styles.default,
      styles.command,
      styles.default
    );

    // Define console commands
    window.commands = {
      help: () => {
        console.log(
          '%c📚 Available Commands:%c\n' +
          '• help - Show this message\n' +
          '• skills - View all skills\n' +
          '• projects - List projects\n' +
          '• contact - Contact information\n' +
          '• secret - Find the easter egg\n' +
          '• clear() - Clear console (browser built-in)',
          'color: #00ff88; font-weight: bold;',
          'color: #00ff88;'
        );
      },
      skills: () => {
        console.table({
          'Flutter': '90%',
          'React/JavaScript': '88%',
          'Python': '85%',
          'Networks (TCP/IP)': '85%',
          'Android Studio': '82%',
          'C++': '78%',
          'Full-Stack Development': '80%',
          'GitHub': '90%',
        });
      },
      projects: () => {
        console.log(
          '%c🚀 My Projects:%c\n' +
          '1. Movie Ticket Booking App (Flutter)\n' +
          '2. Money Split Application (Flutter)\n' +
          '3. Industrial Networks Mini-Project (Python)\n' +
          '4. Personal Portfolio Site (React)\n' +
          '5. SIH Hackathon Entries\n' +
          '6. Full-Stack Web Applications',
          'color: #00ff88; font-weight: bold;',
          'color: #00ff88;'
        );
      },
      contact: () => {
        console.log(
          '%c📧 Contact Me:%c\n' +
          'Email: nohithkumar01@gmail.com\n' +
          'GitHub: https://github.com\n' +
          'LinkedIn: https://linkedin.com\n' +
          'Location: Hyderabad, India',
          'color: #00ff88; font-weight: bold;',
          'color: #00ff88;'
        );
      },
      secret: () => {
        console.log(
          '%c✨ You found the secret! ✨%c\n' +
          'Easter egg: If you\'re reading this, you\'re already a true developer! 👨‍💻\n' +
          'Keep exploring, keep building, keep learning!\n' +
          'P.S. - I\'m always looking for talented developers. Let\'s build something amazing together! 🚀',
          'color: #ff88ff; font-weight: bold; font-size: 14px;',
          'color: #ff88ff;'
        );
      },
    };

    // Make commands accessible
    window.help = window.commands.help;
    window.skills = window.commands.skills;
    window.projects = window.commands.projects;
    window.contact = window.commands.contact;
    window.secret = window.commands.secret;
  }, []);
};
