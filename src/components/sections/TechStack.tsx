'use client';

import { motion } from 'framer-motion';
import { mockTechStack } from '@/lib/data/tech-stack';

export default function TechStack() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
            Tecnologías que utilizamos
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nuestra plataforma está construida con las tecnologías más avanzadas para garantizar seguridad, velocidad y la mejor experiencia de usuario.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {mockTechStack.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
              whileHover={{ y: -10 }}
            >
              {/* Icon */}
              <motion.div
                className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <i className={`${tech.icon} text-3xl text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300`}></i>
              </motion.div>

              {/* Tech Name */}
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                {tech.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                {tech.description}
              </p>

              {/* Category Badge */}
              <div className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                {tech.category}
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Comprometidos con la excelencia tecnológica
            </h3>
            <p className="text-gray-600 mb-6">
              Utilizamos las mejores herramientas y tecnologías del mercado para asegurar que nuestra plataforma sea segura, rápida y escalable. Nuestro equipo de expertos trabaja constantemente para mantenernos a la vanguardia de la innovación.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                ✓ Seguridad Blockchain
              </div>
              <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                ✓ Rendimiento Optimizado
              </div>
              <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                ✓ Escalabilidad Total
              </div>
              <div className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                ✓ Soporte 24/7
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}