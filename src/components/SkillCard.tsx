import { motion } from 'framer-motion'

interface SkillCardProps {
  title: string
  icon: React.ReactNode
  skills: string[]
  index: number
}

/**
 * Skill category card with animated list items
 */
export function SkillCard({ title, icon, skills, index }: SkillCardProps) {
  return (
    <motion.div
      className="relative group p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02, borderColor: 'rgba(99, 102, 241, 0.2)' }}
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Icon and title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>

        {/* Skills list */}
        <ul className="space-y-2">
          {skills.map((skill, i) => (
            <motion.li
              key={skill}
              className="flex items-center gap-2 text-sm text-slate-400"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
              {skill}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

