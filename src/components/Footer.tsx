import { Hammer } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-md bg-amber-500 text-slate-900">
                <Hammer size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                DTM Builders
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed">
              Premium custom home construction and remodeling services. Serving the Galveston area since Hurricane Ike, specializing in high-end coastal properties.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-amber-500 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-amber-500 transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-amber-500 transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-amber-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Daniel Skrzypczak</li>
              <li>Galveston, TX</li>
              <li><a href="tel:409-683-7127" className="hover:text-amber-500 transition-colors">(409) 683-7127</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {currentYear} DTM Builders. All rights reserved.</p>
          <p>Designed for excellence in construction.</p>
        </div>
      </div>
    </footer>
  );
}
