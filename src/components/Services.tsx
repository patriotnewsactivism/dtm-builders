import { motion } from 'motion/react';
import { Home, Droplets, Utensils, Wrench } from 'lucide-react';

const services = [
  {
    title: 'New Construction',
    description: 'From the ground up, we build custom beach homes tailored to your coastal lifestyle, ensuring structural integrity against the elements and stunning design.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Kitchen Remodels',
    description: 'Transform the heart of your home. We specialize in bright, airy coastal kitchens with custom cabinetry, durable countertops, and modern appliance integration.',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Bath Remodels',
    description: 'Create your personal oasis after a day at the beach. From walk-in showers and soaking tubs to custom vanities and elegant, moisture-resistant tile work.',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'General Remodeling',
    description: 'Whole-home renovations, additions, and structural changes to modernize and expand your Galveston living space for family and guests.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-amber-600 uppercase mb-3">Our Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Building Services
          </h3>
          <p className="mt-6 text-lg text-slate-600">
            At DTM Builders, we bring decades of experience to every project on the island. Whether you're building a new beach house or remodeling an existing coastal property, we deliver excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                  <service.icon size={24} />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
