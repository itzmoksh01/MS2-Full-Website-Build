import logo from "@assets/MS2-1-removebg-preview_1771938423023.png";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black/40 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & About Column */}
          <div className="text-left">
            <img src={logo} alt="MS2 Entertainment" className="h-24 w-auto mb-6 object-contain" />
            <div className="flex justify-start gap-4">
              {[Instagram, Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Services Column */}
          <div className="text-left">
            <h4 className="text-lg font-bold text-white mb-6">Services</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">Pre-Production</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Production</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Post-Production</a></li>
              <li><a href="#influencers" className="hover:text-primary transition-colors">Influencer Management</a></li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="text-left">
            <h4 className="text-lg font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@ms2.co.in" className="hover:text-primary transition-colors">info@ms2.co.in</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+918384002218" className="hover:text-primary transition-colors">+91 8384002218</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="leading-relaxed">278, Sector 55-56 Rapid Metro Station, <br />Sector 55, Gurugram, Haryana, 122002</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MS2 Entertainment LLP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
