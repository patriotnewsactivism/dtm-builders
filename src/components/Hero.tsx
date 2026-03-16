import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury custom home exterior"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Galveston, TX Premier Builder
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Building Your Vision, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Crafting Your Future.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            DTM Builders specializes in high-end new construction, and transformative kitchen & bath remodels. Quality craftsmanship led by Daniel Skrzypczak.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-md font-semibold bg-amber-500 text-slate-900 hover:bg-amber-400 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              Get a Free Estimate
              <ArrowRight size={20} />
            </a>
            <a
              href="tel:409-683-7127"
              className="w-full sm:w-auto px-8 py-4 rounded-md font-semibold bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              (409) 683-7127
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
