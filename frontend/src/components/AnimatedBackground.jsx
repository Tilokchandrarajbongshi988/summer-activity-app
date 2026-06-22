import { motion } from "framer-motion";
import FloatingActivities from "./FloatingActivities";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06142d] via-[#10254d] to-[#1e3a70]" />

      {/* Moon */}
      <div className="absolute top-16 right-20">
        {/* Glow */}
        <div className="absolute inset-0 scale-150 rounded-full bg-white/20 blur-3xl" />

        {/* Moon */}
        <div className="h-24 w-24 rounded-full bg-white blur-md opacity-80" />
        <div className="absolute inset-0 h-24 w-24 rounded-full bg-white" />
      </div>

      {/* Stars */}
      {[...Array(60)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            width: 2,
            height: 2,
            top: `${Math.random() * 70}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Cloud 1 */}
      <motion.div
        className="absolute top-24"
        animate={{
          x: [-300, 1800],
        }}
        transition={{
          duration: 70,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="relative">
          <div className="h-16 w-56 rounded-full bg-white/30 blur-lg" />
          <div className="absolute -top-6 left-10 h-20 w-20 rounded-full bg-white/30 blur-lg" />
          <div className="absolute -top-4 right-8 h-24 w-24 rounded-full bg-white/30 blur-lg" />
        </div>
      </motion.div>

      {/* Cloud 2 */}
      <motion.div
        className="absolute top-48"
        animate={{
          x: [1800, -400],
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="relative">
          <div className="h-20 w-72 rounded-full bg-white/25 blur-lg" />
          <div className="absolute -top-8 left-12 h-24 w-24 rounded-full bg-white/25 blur-lg" />
          <div className="absolute -top-6 right-10 h-28 w-28 rounded-full bg-white/25 blur-lg" />
        </div>
      </motion.div>

      {/* Floating Activities */}
      <FloatingActivities />

      {/* Back Mountain */}
      <div
        className="absolute bottom-0 h-[320px] w-full bg-[#0b1730]"
        style={{
          clipPath:
            "polygon(0% 100%,0% 70%,15% 45%,30% 65%,45% 35%,60% 60%,75% 30%,100% 65%,100% 100%)",
        }}
      />

      {/* Front Mountain */}
      <div
        className="absolute bottom-0 h-[250px] w-full bg-black"
        style={{
          clipPath:
            "polygon(0% 100%,0% 75%,15% 40%,35% 80%,55% 25%,75% 70%,100% 35%,100% 100%)",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;