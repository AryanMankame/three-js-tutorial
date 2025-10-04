import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code, GraduationCap, Award } from 'lucide-react';
import BookComponent from './BookComponent';
import { pageNo } from './App';
import { useAtom } from 'jotai';
const AnimatedNavbar = () => {
  const [pageNumber,setPageNumber] = useAtom(pageNo);
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = [
    { id: 0, label: 'Experience', icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
    { id: 1, label: 'Projects', icon: Code, color: 'from-purple-500 to-pink-500' },
    { id: 2, label: 'Education', icon: GraduationCap, color: 'from-emerald-500 to-teal-500' },
    { id: 3, label: 'Skills & Achievements', icon: Award, color: 'from-orange-500 to-red-500' }
  ];

  const handleClick = (id : any) => {
    setActiveSection(id);
    // Here you would update your atom/state
    setPageNumber(id);
    console.log(`Navigating to section: ${id} ${pageNumber}`);
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
      {/* Decorative background glow */}
      <motion.div
        className="absolute inset-0 blur-3xl opacity-20"
        animate={{
          background: [
            'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            'radial-gradient(circle, #10b981 0%, transparent 70%)',
            'radial-gradient(circle, #f59e0b 0%, transparent 70%)',
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative flex flex-col gap-6">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={item.id}
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            >
              {/* Animated connection line */}
              <AnimatePresence>
                {(isActive || isHovered) && (
                  <motion.div
                    className={`absolute right-full mr-4 top-1/2 h-0.5 bg-gradient-to-r ${item.color}`}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 60, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              {/* Main button */}
              <motion.button
                onClick={() => handleClick(item.id)}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className={`
                  relative group flex items-center justify-end gap-4 
                  transition-all duration-300 cursor-pointer
                  ${isActive ? 'pr-0' : 'pr-0'}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Label - appears on hover or when active */}
                <AnimatePresence>
                  {(isHovered || isActive) && (
                    <motion.span
                      className={`
                        text-white font-semibold text-sm whitespace-nowrap
                        px-4 py-2 rounded-full
                        bg-gradient-to-r ${item.color}
                        shadow-lg
                      `}
                      initial={{ opacity: 0, x: 20, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Icon container */}
                <motion.div
                  className={`
                    relative w-14 h-14 rounded-full
                    flex items-center justify-center
                    transition-all duration-300
                    ${isActive 
                      ? `bg-gradient-to-br ${item.color} shadow-xl` 
                      : 'bg-white/10 backdrop-blur-sm border border-white/20'
                    }
                  `}
                  animate={isActive ? {
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                      '0 0 40px rgba(139, 92, 246, 0.5)',
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                    ]
                  } : {}}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {/* Rotating ring on active */}
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 rounded-full border-2 border-white/30`}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    animate={isActive ? {
                      rotate: [0, 5, -5, 0],
                    } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: isActive ? Infinity : 0,
                      repeatDelay: 2
                    }}
                  >
                    <Icon 
                      className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-300'}`}
                      strokeWidth={2.5}
                    />
                  </motion.div>

                  {/* Particles on hover */}
                  {isHovered && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${item.color}`}
                          initial={{ 
                            x: 0, 
                            y: 0, 
                            opacity: 1,
                            scale: 0 
                          }}
                          animate={{ 
                            x: Math.cos((i / 6) * Math.PI * 2) * 30,
                            y: Math.sin((i / 6) * Math.PI * 2) * 30,
                            opacity: 0,
                            scale: 1
                          }}
                          transition={{ 
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.1
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>

                {/* Ripple effect on click */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className={`absolute right-0 w-14 h-14 rounded-full bg-gradient-to-r ${item.color}`}
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ scale: 1, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Index number indicator */}
              <motion.div
                className={`
                  absolute -right-2 -top-2 w-6 h-6 rounded-full
                  flex items-center justify-center text-xs font-bold
                  ${isActive 
                    ? `bg-gradient-to-br ${item.color} text-white shadow-lg` 
                    : 'bg-white/10 text-gray-400 backdrop-blur-sm'
                  }
                `}
                initial={{ scale: 0 }}
                animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
                transition={{
                  scale: {
                    duration: 0.3,
                    repeat: isActive ? Infinity : 0,
                    repeatDelay: 2
                  }
                }}
              >
                {index + 1}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="absolute -left-8 top-0 bottom-0 w-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500"
          initial={{ height: '0%' }}
          animate={{ height: `${((activeSection + 1) / navItems.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// Demo wrapper
export default function RightsideNav() {
  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Center placeholder for 3D book */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"> 
          <BookComponent />
      </div>

      {/* Animated Navbar */}
      <AnimatedNavbar />

    </div>
  );
}