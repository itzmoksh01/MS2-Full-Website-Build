import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Users } from "lucide-react";
import bgTeam from "@assets/bg-about.jpg";

const teamMembers = [
  {
    name: "Manan Sachdeva",
    role: "Founder & Managing Partner",
    color: "primary",
  },
  {
    name: "Shabnam Kumari",
    role: "HR Professional | Empowering People & Driving Organisational Success | Talent Strategy, Employee Experience, Leadership Development, Employee Well-being",
    color: "secondary",
  },
  {
    name: "Harshit Lamba",
    role: "Graphic Designer | Video Editor | VFX Compositing | Motion Graphic Designer | FX Artist | Avid Media Composer",
    color: "primary",
  },
  {
    name: "Sukhvinder Singh",
    role: "Graphic Designer | Video Editor | Compositor | Motion Graphic Designer",
    color: "secondary",
  },
  {
    name: "Tejas Rahate",
    role: "Business Development | Production & Post-Production Manager",
    color: "primary",
  },
  {
    name: "Khushboo Rajawat",
    role: "Turning audio into accurate, polished text with speed and precision",
    color: "secondary",
  },
  {
    name: "Madhur Sharma",
    role: "Production Manager, Editor, DJ/Producer | Creating Content with Stories",
    color: "primary",
  },
];

export default function Team() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgTeam} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/85"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-secondary font-medium tracking-wider text-sm uppercase mb-2 block">
              The People Behind MS2
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-4">
              Our Team
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, i) => {
              const isPrimary = member.color === "primary";
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`bg-card border border-white/5 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl group ${isPrimary ? "hover:border-primary/40 hover:shadow-primary/10" : "hover:border-secondary/40 hover:shadow-secondary/10"}`}
                  data-testid={`card-team-${i}`}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 ${isPrimary ? "bg-primary/10" : "bg-secondary/10"}`}>
                    <Users className={`w-10 h-10 ${isPrimary ? "text-primary" : "text-secondary"}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-3 font-display" data-testid={`text-name-${i}`}>
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-center text-sm leading-relaxed" data-testid={`text-role-${i}`}>
                    {member.role}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
