import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
  className?: string
}

/**
 * Animated button component with primary and secondary variants
 */
export function Button({ children, variant = 'primary', href, onClick, className = '' }: ButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 overflow-hidden whitespace-nowrap'
  
  const variants = {
    primary: 'bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg shadow-indigo-500/25',
    secondary: 'bg-slate-800/60 text-slate-300 border border-white/10 hover:border-indigo-500/30 hover:bg-slate-800',
  }

  const content = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </>
  )

  const motionProps = {
    className: `${baseStyles} ${variants[variant]} ${className}`,
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  }

  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...motionProps}>
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button onClick={onClick} {...motionProps}>
      {content}
    </motion.button>
  )
}

