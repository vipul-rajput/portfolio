import { motion } from 'framer-motion'

interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'subtle'
  className?: string
}

/**
 * Reusable tag/badge component for skills and labels
 */
export function Tag({ children, variant = 'default', className = '' }: TagProps) {
  const variants = {
    default: 'bg-slate-800/60 border-white/5 text-slate-300',
    accent: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
    subtle: 'bg-slate-900/60 border-white/5 text-slate-400',
  }

  return (
    <motion.span
      className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg border backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-indigo-500/30 ${variants[variant]} ${className}`}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.span>
  )
}

