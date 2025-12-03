import { motion } from 'framer-motion'
import { Tag } from './Tag'

interface ProjectCardProps {
  title: string
  tagline: string
  description: string[]
  stack: string[]
  meta: string
  index: number
}

/**
 * Project card component with hover effects and animations
 */
export function ProjectCard({ title, tagline, description, stack, meta, index }: ProjectCardProps) {
  return (
    <motion.article
      className="relative group p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      {/* Gradient glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
            {title}
          </h3>
          <p className="text-cyan-400 text-sm font-medium">
            {tagline}
          </p>
        </div>

        {/* Description bullets */}
        <ul className="space-y-2 mb-6 text-slate-400 text-sm leading-relaxed">
          {description.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-indigo-400 mt-1 shrink-0">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {stack.map((tech) => (
            <Tag key={tech} variant="accent">
              {tech}
            </Tag>
          ))}
        </div>

        {/* Meta line */}
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
          {meta}
        </p>
      </div>
    </motion.article>
  )
}

