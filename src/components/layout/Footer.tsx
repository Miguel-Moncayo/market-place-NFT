'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Twitter, 
  Instagram, 
  MessageCircle, 
  Send, 
  Mail, 
  MapPin, 
  Phone,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    quick: [
      { name: 'Inicio', href: '#home' },
      { name: 'Cómo funciona', href: '#how-it-works' },
      { name: 'Galería', href: '#gallery' },
      { name: 'Acerca de', href: '#about' },
    ],
    resources: [
      { name: 'Blog', href: '#' },
      { name: 'Tutoriales', href: '#' },
      { name: 'FAQ', href: '#' },
      { name: 'Soporte', href: '#' },
    ],
    contact: [
      { icon: Mail, text: 'contact@nftify.com' },
      { icon: MapPin, text: 'Madrid, España' },
      { icon: Phone, text: '+34 900 123 456' },
    ],
    social: [
      { icon: Twitter, href: '#', label: 'Twitter' },
      { icon: Instagram, href: '#', label: 'Instagram' },
      { icon: MessageCircle, href: '#', label: 'Discord' },
      { icon: Send, href: '#', label: 'Telegram' },
    ]
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">N</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                NFTify
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              El mercado líder de NFTs con artículos excepcionales y coleccionables digitales únicos.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Enlaces rápidos
              <motion.div
                className="absolute bottom-0 left-0 w-8 h-0.5 bg-indigo-500"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
            </h3>
            <ul className="space-y-3">
              {footerLinks.quick.map((link) => (
                <motion.li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Recursos
              <motion.div
                className="absolute bottom-0 left-0 w-8 h-0.5 bg-indigo-500"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((resource) => (
                <motion.li key={resource.name}>
                  <motion.a
                    href={resource.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {resource.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Contacto
              <motion.div
                className="absolute bottom-0 left-0 w-8 h-0.5 bg-indigo-500"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
            </h3>
            <ul className="space-y-4">
              {footerLinks.contact.map((contact, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-gray-400"
                  whileHover={{ x: 5 }}
                >
                  <contact.icon className="w-5 h-5 mt-0.5 text-indigo-400 flex-shrink-0" />
                  <span>{contact.text}</span>
                </motion.li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-gray-400 mb-3">Suscríbete a nuestro newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2023 NFTify. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                Términos
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}