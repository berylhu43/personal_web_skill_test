import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { profile, projects, trajectory } from './data.js'

/* Reveal-on-scroll wrapper */
function Reveal({ children, delay = 0, y = 26, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* Cinematic chrome: letterbox bars + corner registration marks */
function Chrome() {
  return (
    <div className="chrome" aria-hidden="true">
      <div className="bar top" />
      <div className="bar bottom" />
      <span className="tick tl" />
      <span className="tick tr" />
      <span className="tick bl" />
      <span className="tick br" />
    </div>
  )
}

/* Timecode at 24fps — click to play/pause, like an editing timeline.
   Paused by default; accumulates elapsed frames only while playing. */
const padTC = (n) => String(n).padStart(2, '0')
function formatTC(frames) {
  const f = frames % 24
  const s = Math.floor(frames / 24) % 60
  const m = Math.floor(frames / (24 * 60)) % 60
  const h = Math.floor(frames / (24 * 3600)) % 24
  return `${padTC(h)}:${padTC(m)}:${padTC(s)}:${padTC(f)}`
}
function useTimecode() {
  // Plays by default, except for visitors who prefer reduced motion.
  const [playing, setPlaying] = useState(
    () =>
      typeof window === 'undefined' ||
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [frames, setFrames] = useState(0)
  const acc = useRef(0)
  useEffect(() => {
    if (!playing) return
    let raf
    let last = performance.now()
    const loop = (now) => {
      acc.current += ((now - last) / 1000) * 24
      last = now
      setFrames(Math.floor(acc.current))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [playing])
  return { tc: formatTC(frames), playing, toggle: () => setPlaying((p) => !p) }
}

function TopBar() {
  const [scrolled, setScrolled] = useState(false)
  const { tc, playing, toggle } = useTimecode()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="mark">
        <span className="rec" />
        YUXUAN&nbsp;HU
        <span className="role">{profile.roles.join(' / ')}</span>
      </a>
      <div className="right">
        <nav>
          <a href="#work">Work</a>
          <a href="#next">Trajectory</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          type="button"
          className={`timecode ${playing ? 'playing' : ''}`}
          onClick={toggle}
          title={playing ? 'Pause timecode' : 'Click to play'}
          aria-label={playing ? 'Pause timecode' : 'Play timecode'}
        >
          <span className="tc-ico" aria-hidden="true">{playing ? '⏸' : '▶'}</span>
          <span className="tc-val">{tc}</span>
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell">
        <h1>
          <motion.span
            style={{ display: 'block' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            I build systems that turn messy, unstructured information into{' '}
            <span className="key">usable, structured data</span>.
          </motion.span>
        </h1>

        <motion.div
          className="scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          <span className="ln" />
          Roll
        </motion.div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work">
      <div className="shell">
        <Reveal className="section-head">
          <span className="tc">TC 00:01 — SELECTED WORK</span>
        </Reveal>

        <div className="work-grid">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.08} className="work-cell">
              <a className="frame" href={p.repo} target="_blank" rel="noreferrer">
                <div className="fhead">
                  <span>Frame {String(i + 1).padStart(2, '0')} / 04</span>
                  <span className="kind">{p.kind}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.blurb}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <span className="src">View source ↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Trajectory() {
  return (
    <section id="next" className="next">
      <div className="shell">
        <Reveal className="section-head">
          <span className="tc">TC 00:02 — TRAJECTORY</span>
        </Reveal>

        <Reveal>
          <p className="traj-lede">
            One throughline, four stages —{' '}
            <span className="em">from the camera, to the model, to the agent.</span>
          </p>
        </Reveal>

        <div className="traj">
          <div className="traj-line" aria-hidden="true">
            <motion.div
              className="seg-done"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="seg-future"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 1.05, ease: 'linear' }}
            />
          </div>

          <div className="traj-stages">
            {trajectory.map((s, i) => (
              <motion.div
                className={`stage ${s.state} ${s.link ? 'has-link' : ''}`}
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {s.link ? (
                  <a
                    className="node node-link"
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Watch: ${s.label}`}
                  />
                ) : (
                  <span className="node" />
                )}
                <span className="s-tag">{s.tag}</span>
                {s.link ? (
                  <a className="s-link" href={s.link} target="_blank" rel="noreferrer">
                    <span className="s-label">{s.label}</span>
                    <span className="s-watch">▶ Watch ↗</span>
                  </a>
                ) : (
                  <span className="s-label">{s.label}</span>
                )}
                <span className="s-note">{s.note}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="traj-foot">
            <span className="d" />
            The last two stages are a direction and a trajectory — not finished products.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Credits() {
  return (
    <section id="contact" className="credits">
      <div className="shell">
        <Reveal className="section-head">
          <span className="tc">TC 00:03 — END CREDITS</span>
        </Reveal>

        <Reveal>
          <h2 className="big">
            Cut. Render. <span className="accent">Ship.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="credit-id">
            <span className="ci-name">{profile.name}</span>
            <span className="ci-role">{profile.roles.join(' / ')}</span>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="contact-row">
            <a className="clink" href={`mailto:${profile.email}`}>✉ {profile.email}</a>
            <a className="clink" href={profile.github} target="_blank" rel="noreferrer">
              ↗ github.com/berylhu43
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: 'left',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--accent)',
        zIndex: 60,
      }}
    />
  )
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Chrome />
      <TopBar />
      <main>
        <Hero />
        <Work />
        <Trajectory />
        <Credits />
      </main>
      <footer className="shell">
        <span>© {new Date().getFullYear()} Yuxuan Hu</span>
        <span>Data Science · Film · AI</span>
        <span>Cut in graphite &amp; cyan</span>
      </footer>
    </>
  )
}
