import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Clapperboard, Film, Video, CheckCircle2, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import logo from "@assets/MS2-1-removebg-preview_1771938423023.png";
import partnerLogos from "@assets/image_1771863300527.png";
import bgAbout from "@assets/bg-about.jpg";
import bgServices from "@assets/bg-services.jpg";
import bgPartners from "@assets/bg-partners.jpg";
import bgContact from "@assets/bg-contact.jpg";
import teamManan from "@assets/Headshot_black_and_white_photo_6d5bc8b505_1772789598184.jpeg";
import teamMatthew from "@assets/Gemini_Generated_Image_bwzpyfbwzpyfbwzp_1772182703965.png";
import teamRonit from "@assets/Gemini_Generated_Image_27bxzb27bxzb27bx_1773127693509.png";
import teamRachit from "@assets/Gemini_Generated_Image_bk69ivbk69ivbk69_1772182800428.png";
import teamTejas from "@assets/Gemini_Generated_Image_uwc2r1uwc2r1uwc2_1772182902628.png";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = 1.0;
      
      if (!isMuted) {
        if (!audioCtxRef.current) {
          try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            const audioCtx = new AudioContextClass();
            const source = audioCtx.createMediaElementSource(videoRef.current);
            const gainNode = audioCtx.createGain();
            
            gainNode.gain.value = 1.5; // 150% boost
            
            source.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            audioCtxRef.current = audioCtx;
            gainNodeRef.current = gainNode;
          } catch (e) {
            console.error("Audio boost failed:", e);
          }
        }

        if (audioCtxRef.current?.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        
        videoRef.current.play().catch(err => console.error("Playback failed:", err));
      }
    }
  }, [isMuted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted(prev => !prev);
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden bg-black">
          <video 
            ref={videoRef}
            autoPlay 
            muted={isMuted}
            loop 
            playsInline
            preload="auto"
            
            className="w-full h-full object-cover"
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              minWidth: '100%', 
              minHeight: '100%',
              zIndex: 0,
              opacity: 1
            }}
          >
            <source src="/videos/background-compressed.mp4" type="video/mp4" />
          </video>
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" style={{ zIndex: 1 }}></div>
        </div>

        {/* Sound Toggle Button */}
        <div className="absolute bottom-10 right-10 z-20">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMute}
            className="rounded-full bg-background/20 backdrop-blur-md border-white/10 text-white hover:bg-white/20 transition-all duration-300"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img src={logo} alt="MS2 Logo" className="h-32 md:h-48 w-auto mx-auto drop-shadow-2xl" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white mb-6"
          >
            MS2 Entertainment
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light"
          >
            Professional Media Services & Solutions
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-secondary text-black font-semibold text-lg px-8 py-6 rounded-full shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 hover:-translate-y-1"
            >
              Discover Our Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-muted-foreground"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgAbout} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionHeading title="About MS2 Entertainment" subtitle="Our Story" alignment="left" />
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-white">MS2 Entertainment LLP</strong> is the creative partnership between Matthew Shewchuk, 
                  founder of Big Time Decent Productions Inc., and Manan Sachdeva, a seasoned post-production 
                  expert with deep roots in Hollywood.
                </p>
                <p>
                  With over a decade of combined experience, Matt and Manan have been at the forefront of 
                  producing and delivering high-quality television content for some of the world's leading 
                  networks—including <span className="text-primary font-medium">Discovery, Bell Media, History TV, Hulu, and Netflix</span>.
                </p>
                <p>
                  Based in India and working internationally, we are committed to elevating the post-production 
                  experience for clients across the entertainment industry—delivering polished, broadcast-ready 
                  content to audiences worldwide.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 gap-6"
            >
              <div className="p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-white/5 shadow-xl hover:border-primary/30 transition-colors group">
                <h3 className="text-2xl font-bold font-display text-white mb-3 group-hover:text-primary transition-colors">Our Mission</h3>
                <p className="text-muted-foreground">
                  To become the global leader in entertainment by fusing world-class experience and technology with the 
                  richness and diversity of India's creative talent.
                </p>
              </div>
              
              <div className="p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-white/5 shadow-xl hover:border-secondary/30 transition-colors group">
                <h3 className="text-2xl font-bold font-display text-white mb-3 group-hover:text-secondary transition-colors">Our Vision</h3>
                <p className="text-muted-foreground">
                  To create and distribute culturally rich, globally appealing entertainment by leveraging our 
                  international expertise to nurture and showcase the finest Indian talent.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgServices} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/85"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionHeading title="Our Services" subtitle="End to End Production" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Pre-Production */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-white/5 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                <Clapperboard size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Pre-Production</h3>
              <p className="text-muted-foreground mb-6">We lay a strong foundation before the camera starts rolling.</p>
              <ul className="space-y-3">
                {[
                  "Concept development & creative ideation",
                  "Scriptwriting & storyboarding",
                  "Mood boards & visual references",
                  "Budget planning & scheduling",
                  "Location scouting & permissions",
                  "Casting & talent coordination"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Production */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-white/5 rounded-2xl p-8 hover:border-secondary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/10 group relative md:-mt-8"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
              <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 text-secondary group-hover:scale-110 transition-transform duration-300">
                <Camera size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Production</h3>
              <p className="text-muted-foreground mb-6">High‑quality execution with experienced crews and equipment.</p>
              <ul className="space-y-3">
                {[
                  "Film & video shoots (brand, corporate)",
                  "Product & lifestyle shoots",
                  "Automotive shoots (static, motion, rig)",
                  "Studio & on‑location production",
                  "Multi‑camera setups",
                  "Drone & aerial cinematography"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Post-Production */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-white/5 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                <Film size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Post-Production</h3>
              <p className="text-muted-foreground mb-6">Editing, enhancing, and finalizing raw footage to perfection.</p>
              <ul className="space-y-3">
                {[
                  "Video Editing, Color Grading & VFX",
                  "Sound Design, Mixing & Mastering",
                  "Motion Graphics & Animation",
                  "Finishing & Delivery",
                  "Transcription & Captioning",
                  "Subtitling & Localization"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Stats & Trusted By */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgPartners} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/85"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionHeading title="Trusted by Industry Leaders" subtitle="Our Track Record" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <img 
              src={partnerLogos} 
              alt="Partner Networks" 
              className="w-full max-w-4xl mx-auto object-contain rounded-xl"
            />
          </motion.div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: "10+", label: "Years of Partnership" },
              { value: "50M+", label: "Hours Processed" },
              { value: "99.9%", label: "Client Satisfaction" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8"
              >
                <div className="text-5xl md:text-6xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-white/60 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionHeading title="Our Team" subtitle="Meet The Experts" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              { name: "Manan Sachdeva", role: "Founder & Managing Partner", photo: teamManan },
              { name: "Matthew Shewchuk", role: "Founder & Partner", photo: teamMatthew },
              { name: "Ronit Bose", role: "Brand Partner", photo: teamRonit },
              { name: "Rachit Chauhan", role: "Lawyer & CA", photo: teamRachit },
              { name: "Tejas S Rahate", role: "Business Development & Producer", photo: teamTejas },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group text-center"
                data-testid={`card-team-${i}`}
              >
                <div className="relative mb-4 mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary/50 transition-all duration-300 shadow-xl">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-[center_20%] group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-white font-display mb-1" data-testid={`text-name-${i}`}>
                  {member.name}
                </h3>
                <p className="text-xs md:text-sm text-primary font-medium" data-testid={`text-role-${i}`}>
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgContact} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-6">Ready to join our network?</h2>
            <p className="text-xl text-muted-foreground">Let's create something extraordinary together.</p>
          </div>
          
          <ContactForm />
        </div>
        
        {/* Background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
      </section>

      <Footer />
    </div>
  );
}
