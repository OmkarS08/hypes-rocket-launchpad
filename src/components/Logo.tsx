
import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

const Logo = ({ size = 'md', showTagline = false }: LogoProps) => {
  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };
  
  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <span 
          className={`font-display font-bold text-hypes-green ${textSizes[size]}`}
        >
          hypes<span className="text-hypes-gray-800">.in</span>
        </span>
      </div>
      
      {showTagline && (
        <motion.p 
          className="text-sm text-hypes-gray-500 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Ignite Your Startup Journey
        </motion.p>
      )}
    </motion.div>
  );
};

export default Logo;
