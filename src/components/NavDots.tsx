import { motion } from 'framer-motion'

interface NavDotsProps {
  sections: string[]
  activeIndex: number
  onDotClick: (index: number) => void
}

/**
 * Vertical navigation dots component for slide navigation
 */
export function NavDots({ sections, activeIndex, onDotClick }: NavDotsProps) {
  return (
    <nav 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
      aria-label="Section navigation"
    >
      {sections.map((section, index) => (
        <button
          key={section}
          onClick={() => onDotClick(index)}
          className="group relative flex items-center justify-end"
          aria-label={`Navigate to ${section}`}
          aria-current={activeIndex === index ? 'true' : undefined}
        >
          {/* Tooltip */}
          <span className="absolute right-8 px-3 py-1.5 text-xs font-medium bg-slate-800/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-white/5">
            {section}
          </span>
          
          {/* Dot */}
          <motion.div
            className={`relative w-3 h-3 rounded-full transition-colors duration-300 ${
              activeIndex === index 
                ? 'bg-indigo-400' 
                : 'bg-slate-600 group-hover:bg-slate-500'
            }`}
            animate={{
              scale: activeIndex === index ? 1.4 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Glow effect for active dot */}
            {activeIndex === index && (
              <motion.div
                className="absolute inset-0 rounded-full bg-indigo-400"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        </button>
      ))}
    </nav>
  )
}

