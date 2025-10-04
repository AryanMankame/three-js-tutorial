import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronRight, Sparkles, Package, Terminal, ShoppingCart, Dumbbell, TrendingUp, Zap } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  stats?: { label: string; value: string }[];
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  npmUrl?: string;
  color: string;
  icon: any;
}

const ProjectsSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Mongo-Bolt',
      subtitle: 'TypeScript MongoDB Wrapper',
      description: 'A lightweight, TypeScript-based npm package designed to simplify MongoDB operations for Node.js developers with powerful features.',
      highlights: [
        'Designed and published a lightweight npm package for MongoDB operations',
        'Built intuitive API with inbuilt caching, simplified joins, and fluent aggregation builder',
        'Enabled seamless multi-collection queries and indexing strategies',
        'Achieved 200+ weekly downloads on npm'
      ],
      stats: [
        { label: 'Weekly Downloads', value: '200+' },
        { label: 'Package Size', value: 'Lightweight' }
      ],
      tags: ['Node.js', 'TypeScript', 'MongoDB', 'Mongoose', 'NPM'],
      npmUrl: 'https://www.npmjs.com/package/mongo-bolt',
      githubUrl: 'https://github.com/AryanMankame/mongo-bolt',
      demoUrl: 'https://www.npmjs.com/package/mongo-bolt',
      color: 'from-green-500 to-emerald-500',
      icon: Package
    },
    {
      id: 2,
      title: 'CLIBook',
      subtitle: 'Bash Workflow Automation',
      description: 'A Bash-based CLI tool that saves and executes frequently used Linux workflows using custom keywords for improved developer productivity.',
      highlights: [
        'Built a Bash-based CLI tool for workflow automation',
        'Store complex command sequences under shorthand aliases',
        'One-command execution of predefined routines',
        'Reduces manual errors and enhances speed'
      ],
      stats: [
        { label: 'Commands Saved', value: 'Unlimited' },
        { label: 'Productivity', value: '10x Faster' }
      ],
      tags: ['Bash', 'Linux', 'CLI', 'Automation'],
      githubUrl: 'https://github.com/AryanMankame/bash-scripts',
      color: 'from-purple-500 to-violet-500',
      icon: Terminal
    },
    {
      id: 3,
      title: 'PaisaBachat',
      subtitle: 'Real-time Price Tracker',
      description: 'A sophisticated price tracking solution built with Next.js 14, featuring real-time monitoring, smart search, and automated notifications.',
      highlights: [
        'Real-time price tracking with Next.js 14 and Tailwind CSS',
        'Secure authentication via Clerk.js',
        'Dynamic data scraping using Cheerio and BrightData',
        'Interactive cart system for product management',
        'Automated cron jobs for 6-hour price updates',
        'Smart search functionality'
      ],
      stats: [
        { label: 'Performance', value: '92' },
        { label: 'Accessibility', value: '100' },
        { label: 'Best Practices', value: '96' },
        { label: 'SEO', value: '100' }
      ],
      tags: ['Next.js 14', 'Tailwind CSS', 'PostgreSQL', 'Vercel', 'Cheerio'],
      demoUrl: 'https://paisabachat.vercel.app',
      githubUrl: 'https://github.com/AryanMankame/paisabachat',
      color: 'from-blue-500 to-cyan-500',
      icon: ShoppingCart
    },
    {
      id: 4,
      title: 'FitTrackMe',
      subtitle: 'AI-Powered Fitness Platform',
      description: 'A comprehensive fitness tracking platform featuring meal planning, exercise tracking, and GPT-3 powered health assistance.',
      highlights: [
        'Comprehensive fitness tracking with multiple modules',
        'MealPlanner for monitoring daily food intake and nutrition',
        'ExerciseTracker for recording physical activity',
        'GPT-3 integration for real-time health queries',
        'Proactive reminder system with 5 daily prompts',
        'Near-perfect web performance scores'
      ],
      stats: [
        { label: 'Performance', value: '99' },
        { label: 'Accessibility', value: '94' },
        { label: 'Best Practices', value: '100' },
        { label: 'SEO', value: '100' }
      ],
      tags: ['React.js', 'Express.js', 'AppwriteDb', 'Redux.js', 'GPT-3'],
      demoUrl: 'https://fittrackme.onrender.com',
      githubUrl: 'https://github.com/AryanMankame/TrackMeFrontend',
      color: 'from-orange-500 to-red-500',
      icon: Dumbbell
    }
  ];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  return (
    <>
            <motion.a
        href="/Aryan_Mankame_Resume.pdf" // Update this path to your actual resume file
        download="Aryan_Mankame_Resume.pdf"
        className="fixed right-8 bottom-28 z-50 group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* Button */}
          <div className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-xl flex items-center gap-3 border border-white/20">
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <span className="text-white font-semibold text-sm whitespace-nowrap">
              Download Resume
            </span>
          </div>
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-lg -z-10"
            animate={{
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Hover particles */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-cyan-400"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, Math.cos((i / 4) * Math.PI * 2) * 40],
                  y: [0, Math.sin((i / 4) * Math.PI * 2) * 40],
                  opacity: [1, 0],
                  scale: [0, 1.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.a>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-8 bottom-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      >
        <motion.div
          animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white" strokeWidth={2.5} />
          ) : (
            <Sparkles className="w-7 h-7 text-white" strokeWidth={2.5} />
          )}
        </motion.div>
        
        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              className="fixed right-0 top-0 h-full w-[480px] bg-gradient-to-br from-gray-900 via-gray-800 to-black z-50 shadow-2xl overflow-hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Decorative background */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col p-8">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Featured Projects
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Click to explore my latest work
                  </p>
                </motion.div>

                {/* Projects List */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
                  {projects.map((project, index) => {
                    const Icon = project.icon;
                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        whileHover={{ scale: 1.02, x: -8 }}
                        onClick={() => handleProjectClick(project)}
                        className="relative group cursor-pointer"
                      >
                        {/* Project Card */}
                        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                          {/* Gradient overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                          
                          {/* Content */}
                          <div className="relative z-10">
                            <div className="flex items-start gap-4 mb-3">
                              {/* Icon */}
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}>
                                <Icon className="w-6 h-6 text-white br-2" strokeWidth={2} />
                              </div>
                              
                              {/* Title */}
                              <div className="flex-1 min-w-0">
                                <h3 className="text-white font-bold text-lg mb-0.5 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                                  {project.title}
                                </h3>
                                <p className="text-gray-400 text-xs font-medium">
                                  {project.subtitle}
                                </p>
                              </div>
                              
                              <motion.div
                                className="text-white/50 group-hover:text-white flex-shrink-0"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ 
                                  duration: 1.5, 
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                <ChevronRight className="w-5 h-5" />
                              </motion.div>
                            </div>

                            <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                              {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {project.tags.slice(0, 3).map((tag, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 3 && (
                                <span className="px-2 py-1 text-xs rounded-full bg-white/5 text-gray-400">
                                  +{project.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Shine effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto z-[70]"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-8 shadow-2xl border border-white/10 overflow-hidden relative">
                {/* Background decoration */}
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-5`} />
                
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedProject.color} flex items-center justify-center flex-shrink-0`}>
                      {React.createElement(selectedProject.icon, { className: "w-10 h-10 text-white", strokeWidth: 2 })}
                    </div>
                    <div className="flex-1">
                      <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className={`text-4xl font-bold mb-2 bg-gradient-to-r ${selectedProject.color} bg-clip-text text-transparent`}
                      >
                        {selectedProject.title}
                      </motion.h2>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-gray-400 text-lg font-medium"
                      >
                        {selectedProject.subtitle}
                      </motion.p>
                    </div>
                  </div>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-300 text-base mb-6 leading-relaxed"
                  >
                    {selectedProject.description}
                  </motion.p>

                  {/* Highlights */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mb-6"
                  >
                    <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      Key Highlights
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className="flex items-start gap-3 text-gray-300 text-sm"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${selectedProject.color} mt-2 flex-shrink-0`} />
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Stats */}
                  {selectedProject.stats && selectedProject.stats.length > 0 && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      className="mb-6"
                    >
                      <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        Performance Metrics
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {selectedProject.stats.map((stat, i) => (
                          <div
                            key={i}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                          >
                            <div className={`text-2xl font-bold bg-gradient-to-r ${selectedProject.color} bg-clip-text text-transparent mb-1`}>
                              {stat.value}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Tags */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-2 mb-8"
                  >
                    {selectedProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="flex flex-wrap gap-3"
                  >
                    {selectedProject.demoUrl && (
                      <motion.a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-6 py-3 rounded-xl bg-gradient-to-r ${selectedProject.color} text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                        View Demo
                      </motion.a>
                    )}
                    {selectedProject.githubUrl && (
                      <motion.a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors border border-white/20"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Github className="w-5 h-5" />
                        Source Code
                      </motion.a>
                    )}
                    {selectedProject.npmUrl && (
                      <motion.a
                        href={selectedProject.npmUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-red-600/20 text-red-400 font-semibold flex items-center justify-center gap-2 hover:bg-red-600/30 transition-colors border border-red-500/30"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Package className="w-5 h-5" />
                        View on NPM
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSidebar;