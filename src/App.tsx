import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { NavDots, Tag, ProjectCard, SkillCard, Button } from './components'

// Section names for navigation
const SECTIONS = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']

// Icon components
const IconCode = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const IconCloud = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
)

const IconSparkles = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

const IconMail = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const IconLinkedIn = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const IconConnect = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

/**
 * Main Portfolio App Component
 */
function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [showConnectMenu, setShowConnectMenu] = useState(false)

  // Track scroll position for parallax effects
  const { scrollYProgress } = useScroll({ container: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  // Handle scroll to update active section
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const sectionHeight = container.clientHeight
      const newSection = Math.round(scrollTop / sectionHeight)
      setActiveSection(Math.min(newSection, SECTIONS.length - 1))
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigate to section on dot click
  const scrollToSection = (index: number) => {
    const container = containerRef.current
    if (!container) return
    
    container.scrollTo({
      top: index * container.clientHeight,
      behavior: 'smooth',
    })
  }

  // Skills data
  const skillsData = [
    {
      title: 'Full-Stack & Data',
      icon: <IconCode />,
      skills: [
        'React, Next.js, TypeScript',
        'Python, Django, FastAPI',
        'PostgreSQL, REST APIs',
        'Tailwind CSS, Vite',
        'Auth & background jobs (Celery)',
      ],
    },
    {
      title: 'Cloud & DevOps',
      icon: <IconCloud />,
      skills: [
        'AWS & Azure fundamentals',
        'Docker, multi-container',
        'CI/CD pipelines',
        'Monitoring & alerting',
        'Infrastructure management',
      ],
    },
    {
      title: 'AI & Automation',
      icon: <IconSparkles />,
      skills: [
        'LangChain & agent frameworks',
        'Prompt chaining & orchestration',
        'Azure AI Foundry',
        'LLM integration & APIs',
        'Celery & async workflows',
      ],
    },
  ]

  // Projects data
  const projectsData = [
    {
      title: 'Pediatric Health Tracker',
      tagline: 'A digital companion for parents tracking child wellness.',
      description: [
        'Web app to track growth milestones, vaccinations, and health metrics',
        'Integrated messaging APIs for automated reminders and alerts',
        'Built interactive growth charts with percentile visualizations',
        'End-to-end deployment on cloud infrastructure',
      ],
      stack: ['React', 'Next.js', 'Django', 'PostgreSQL', 'Messaging APIs'],
      meta: 'Role: Full-stack architecture & deployment',
    },
    {
      title: 'Personal Finance Engine',
      tagline: 'Turning complex numbers into actionable plans.',
      description: [
        'Developed calculation engines and algorithms for financial analysis',
        'Built personalized goal-setting and recommendation workflows',
        'Designed document generation and management systems',
        'Focused on reliability and intuitive user flows',
      ],
      stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
      meta: 'Focus: Fintech logic & smooth UX',
    },
    {
      title: 'Production Infrastructure',
      tagline: 'Keeping early-stage products stable and scalable.',
      description: [
        'Orchestrated multi-container services on cloud VMs',
        'Implemented monitoring, alerting, and uptime dashboards',
        'Built repeatable deployment pipelines and config management',
        'Established observability practices for production systems',
      ],
      stack: ['Docker', 'Azure', 'CI/CD', 'Observability'],
      meta: 'Focus: DevOps & scalability',
    },
  ]

  // Tech tags for hero
  const heroTags = [
    'Python & FastAPI',
    'React & TypeScript',
    'PostgreSQL & APIs',
    'AWS & Azure',
    'Prompt Engineering',
    'LangChain & Agents',
  ]

  return (
    <>
      {/* Navigation Dots */}
      <NavDots
        sections={SECTIONS}
        activeIndex={activeSection}
        onDotClick={scrollToSection}
      />

      {/* Main scroll container */}
      <main
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {/* ========== SLIDE 1: Hero ========== */}
        <section className="h-screen snap-start relative flex items-center justify-center gradient-bg grid-pattern noise-overlay overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: '-1.5s' }} />

          <motion.div
            className="relative z-10 text-center px-6 max-w-5xl mx-auto"
            style={{ y: heroY }}
          >
            {/* Top label chip */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-slate-800/60 border border-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white font-semibold text-sm">Vipul Rajput</span>
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              <span className="text-slate-400 text-sm">Software Developer</span>
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              <span className="text-slate-400 text-sm">Cloud & Full-Stack</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="block text-indigo-400 glow-text">AI-Augmented</span>
              <span className="block text-white">Engineer</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Engineering scalable backend systems for claims automation and intelligent workflows — building toward Gen AI-powered products.
            </motion.p>

            {/* Tech tags */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {heroTags.map((tag, i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                >
                  <Tag variant="subtle">{tag}</Tag>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button onClick={() => scrollToSection(3)}>View Projects</Button>
              
              {/* Connect button with floating menu */}
              <div className="relative">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowConnectMenu(!showConnectMenu)}
                >
                  <IconConnect />
                  Connect
                </Button>
                
                {/* Floating menu */}
                {showConnectMenu && (
                  <motion.div
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 flex flex-col gap-2 p-3 rounded-xl bg-slate-800/95 border border-white/10 backdrop-blur-sm shadow-xl min-w-[160px]"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <a
                      href="mailto:vipulpr88@gmail.com"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
                    >
                      <IconMail />
                      Email
                    </a>
                    <a
                      href="https://www.linkedin.com/in/vipulkumar-rajput/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
                    >
                      <IconLinkedIn />
                      LinkedIn
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </motion.div>
          </motion.div>
        </section>

        {/* ========== SLIDE 2: About ========== */}
        <section className="h-screen snap-start relative flex items-center justify-center gradient-bg noise-overlay overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 px-6 max-w-4xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About <span className="text-cyan-400">Vipul</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Bio text */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <p className="text-slate-300 leading-relaxed">
                  I engineer <span className="text-white font-semibold">scalable backend systems</span> that 
                  automate and simplify <span className="text-cyan-400">claims management</span> — replacing 
                  repetitive work with <span className="text-white font-semibold">intelligent workflows</span>.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  From building robust APIs to optimizing databases and server-side performance, I focus on 
                  systems that <span className="text-cyan-400">scale effortlessly</span>. I also manage cloud 
                  infrastructure — keeping it secure, reliable, and ready to grow.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Currently exploring <span className="text-indigo-400">Gen AI</span>, agent frameworks, and 
                  intelligent automation — building toward products that think smarter, not just faster.
                </p>
              </motion.div>

              {/* Quick stats grid */}
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {[
                  { value: '2+', label: 'years building products' },
                  { value: 'Backend', label: 'APIs & systems' },
                  { value: 'Cloud', label: 'infra & DevOps' },
                  { value: 'Gen AI', label: 'focused & learning' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="p-4 rounded-xl bg-slate-900/40 border border-white/5 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.02, borderColor: 'rgba(34, 211, 238, 0.2)' }}
                  >
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== SLIDE 3: Skills ========== */}
        <section className="h-screen snap-start relative flex items-center justify-center gradient-bg noise-overlay overflow-hidden">
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 px-6 max-w-5xl mx-auto w-full">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Skills & <span className="text-violet-400">Stack</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {skillsData.map((skill, index) => (
                <SkillCard
                  key={skill.title}
                  title={skill.title}
                  icon={skill.icon}
                  skills={skill.skills}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ========== SLIDE 4: Projects ========== */}
        <section className="min-h-screen snap-start relative flex items-center justify-center gradient-bg noise-overlay overflow-hidden py-16">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
          
          <div className="relative z-10 px-6 max-w-5xl mx-auto w-full">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Featured <span className="text-indigo-400">Work</span>
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {projectsData.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  tagline={project.tagline}
                  description={project.description}
                  stack={project.stack}
                  meta={project.meta}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ========== SLIDE 5: Experience ========== */}
        <section className="h-screen snap-start relative flex items-center justify-center gradient-bg noise-overlay overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 px-6 max-w-4xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Experience & <span className="text-cyan-400">Impact</span>
            </motion.h2>

            <motion.div
              className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-4">
                <p className="text-slate-300 leading-relaxed text-lg">
                  I engineer <span className="text-white font-semibold">scalable backend systems</span> that 
                  automate and simplify claims management — replacing repetitive work with{' '}
                  <span className="text-cyan-400 font-medium">intelligent workflows</span>.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  From building robust APIs to optimizing databases and server-side performance, I focus on 
                  systems that scale effortlessly. I also manage the cloud infrastructure — keeping it secure, 
                  reliable, and ready to grow — so every release ships smoother and smarter.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">What I bring:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Scalable APIs & database optimization',
                  'Intelligent workflow automation',
                  'Cloud infrastructure management (AWS/Azure)',
                  'Building toward Gen AI-powered products',
                  'AI-augmented development (Cursor, copilots) — used as a multiplier, not a crutch',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/30 border border-white/5"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ x: 4, borderColor: 'rgba(34, 211, 238, 0.2)' }}
                  >
                    <span className="text-cyan-400 text-lg">✓</span>
                    <span className="text-slate-300 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ========== SLIDE 6: Contact ========== */}
        <section className="h-screen snap-start relative flex items-center justify-center gradient-bg noise-overlay overflow-hidden">
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-500/15 rounded-full blur-[100px]" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px]" />
          
          <div className="relative z-10 px-6 max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Let's <span className="text-indigo-400">Build</span> Something
            </motion.h2>

            <motion.p
              className="text-slate-400 text-lg mb-10 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Open to collaborations, cloud & full-stack roles, and building AI-powered products.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button href="mailto:vipulpr88@gmail.com">
                <IconMail />
                Email Me
              </Button>
              <Button variant="secondary" href="https://www.linkedin.com/in/vipulkumar-rajput/">
                <IconLinkedIn />
                LinkedIn
              </Button>
            </motion.div>

            {/* Footer */}
            <motion.footer
              className="text-slate-600 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p>Designed in dark mode. Built with React, TypeScript, and a love for clean systems.</p>
            </motion.footer>
          </div>
        </section>
      </main>
    </>
  )
}

export default App

