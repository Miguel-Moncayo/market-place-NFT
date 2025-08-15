'use client';

import { motion } from 'framer-motion';
import { Wallet, Search, Gavel } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Wallet className="w-12 h-12" />,
      title: "Configura tu billetera",
      description: "Conecta tu billetera digital para empezar a comprar y vender NFTs de forma segura.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Search className="w-12 h-12" />,
      title: "Explora colecciones",
      description: "Descubre obras de arte digitales únicas de artistas de todo el mundo.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Gavel className="w-12 h-12" />,
      title: "Participa en subastas",
      description: "Ofrece por tus NFTs favoritos y añade piezas exclusivas a tu colección.",
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
            Cómo funciona
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre cómo puedes comprar, vender y crear NFTs en nuestra plataforma de forma sencilla y segura.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              whileHover={{ y: -10 }}
            >
              {/* Gradient Border Effect */}
              <motion.div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
              />

              {/* Icon */}
              <motion.div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 5 }}
              >
                <div className="text-white relative z-10">{feature.icon}</div>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.5 }}
                />
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para empezar tu viaje en el mundo NFT?
            </h3>
            <p className="text-gray-600 mb-6">
              Únete a miles de artistas y coleccionistas que ya están disfrutando de la plataforma NFTify.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4"
              >
                Explorar ahora
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}