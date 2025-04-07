import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import RocketAnimation from './RocketAnimation';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  showLogo?: boolean;
  linkText?: string;
  linkTo?: string;
}

const AuthLayout = ({
  children,
  title,
  subtitle,
  showLogo = true,
  linkText,
  linkTo,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Form */}
      <motion.div 
        className="flex flex-col justify-center items-center px-6 py-12 lg:px-8 bg-white"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md space-y-8">
          {showLogo && (
            <div className="flex justify-center mb-10">
              <Logo size="lg" showTagline={true} />
            </div>
          )}
          
          <div className="text-center mb-10">
            <motion.h1 
              className="text-4xl font-bold tracking-tight text-hypes-gray-900 font-display"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {title}
            </motion.h1>
            <motion.p 
              className="mt-3 text-hypes-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {subtitle}
            </motion.p>
          </div>
          
          {children}
          
          {linkText && linkTo && (
            <div className="text-center mt-6">
              <Link to={linkTo} className="text-hypes-green hover:text-hypes-green-dark font-medium transition-colors">
                {linkText}
              </Link>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Right side - Decorative */}
      <motion.div 
        className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-tr from-hypes-green to-hypes-green-light relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Abstract shapes */}
        <div className="absolute w-full h-full">
          <motion.div 
            className="absolute top-[20%] left-[20%] w-40 h-40 rounded-full bg-white/10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-[30%] right-[15%] w-60 h-60 rounded-full bg-white/10"
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
          />
          <motion.div 
            className="absolute top-[60%] left-[5%] w-52 h-52 rounded-full bg-white/10"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 2 }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-8 max-w-md">
          <h2 className="text-3xl font-bold text-white font-display mb-6">Elevate Your Startup's Potential</h2>
          <p className="text-white/90 mb-12">
            Join the ecosystem where startups thrive through collaboration, visibility, and access to the right resources.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="glass-effect p-1 rounded-xl">
              <div className="animate-float">
                <div className="card-3d">
                  <div className="relative">
                    <motion.div 
                      drag
                      dragConstraints={{
                        top: -20,
                        left: -20,
                        right: 20,
                        bottom: 20,
                      }}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <div className="transform-gpu rotate-12 transition-transform">
                        <RocketsScene />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-5 text-white/70 text-sm">
          © 2025 hypes.in • All rights reserved
        </div>
      </motion.div>
    </div>
  );
};

const RocketsScene = () => {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative">
          <RocketAnimation />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
