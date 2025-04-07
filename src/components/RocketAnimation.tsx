
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

interface RocketAnimationProps {
  size?: number;
  color?: string;
}

const RocketAnimation = ({ 
  size = 120, 
  color = '#10B981'
}: RocketAnimationProps) => {
  const rocketRef = useRef<HTMLDivElement>(null);

  // Subtle floating animation parameters
  const rocketAnimation = {
    initial: { y: 0, rotate: -45 },
    animate: { 
      y: [-10, 10, -10], 
      rotate: [-45, -43, -47, -45],
      transition: { 
        y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" } 
      }
    }
  };

  // Particle trails
  const particles = Array(5).fill(0).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    delay: i * 0.2,
    duration: Math.random() * 1 + 1.5
  }));

  return (
    <div className="relative h-40 w-40 flex items-center justify-center perspective-800">
      <div ref={rocketRef} className="relative">
        <motion.div
          className="relative z-10"
          variants={rocketAnimation}
          initial="initial"
          animate="animate"
          style={{ originX: 0.5, originY: 0.5 }}
        >
          <Rocket 
            size={size} 
            strokeWidth={1.5} 
            className="text-hypes-green drop-shadow-lg" 
          />
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-hypes-green/20 filter blur-lg animate-pulse-glow" />
        </motion.div>
        
        {/* Particle trails */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-hypes-green/80"
            style={{ 
              width: particle.size,
              height: particle.size,
              bottom: '15%',
              left: '50%',
              x: '-50%',
              boxShadow: '0 0 8px rgba(52, 211, 153, 0.8)'
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              y: [0, 30, 60],
              x: [0, Math.random() * 20 - 10]
            }}
            transition={{
              delay: particle.delay,
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RocketAnimation;
