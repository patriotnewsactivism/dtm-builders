import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const features = [
    "Locally Owned & Operated in Galveston",
    "Fully Licensed & Insured",
    "Premium Materials & Craftsmanship",
    "Transparent Pricing & Timelines",
    "Direct Communication with the Owner",
    "Satisfaction Guaranteed"
  ];

  return (
    <section id="about" className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1541888087525-efbd169495f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Daniel Skrzypczak - DTM Builders Owner"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-amber-400 font-bold tracking-wider uppercase text-sm mb-1">Owner & Founder</p>
                <p className="text-3xl font-bold text-white">Daniel Skrzypczak</p>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-500 rounded-2xl -z-10 opacity-50 blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-sm font-bold tracking-widest text-amber-500 uppercase mb-3">About Us</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                Building Galveston's Finest Homes.
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                DTM Builders is a premier construction and remodeling company based in Galveston, TX. Founded by Daniel Skrzypczak, we have built our reputation on unwavering quality, attention to detail, and a commitment to bringing our clients' visions to life.
              </p>
            </div>

            <p className="text-lg text-slate-300 leading-relaxed">
              Whether you are looking to build a custom home from the ground up, or breathe new life into your current space with a stunning kitchen or bathroom remodel, our team has the expertise to deliver exceptional results. We understand that your home is your most significant investment, and we treat every project with the respect and dedication it deserves.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-amber-500 shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-200 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-800">
              <p className="text-slate-400 mb-2">Ready to start your project?</p>
              <a href="tel:409-683-7127" className="text-3xl font-bold text-white hover:text-amber-400 transition-colors">
                (409) 683-7127
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
