import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { profile, projects, stills } from './data.js'

const BASE = import.meta.env.BASE_URL

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

/* Live timecode at 24fps — quietly ties film + data precision */
function useTimecode() {
  const [tc, setTc] = useState('00:00:00:00')
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setTc('24:00:00:00')
      return
    }
    const start = performance.now()
    let raf
    const pad = (n) => String(n).padStart(2, '0')
    const tick = (now) => {
      const elapsed = (now - start) / 1000
      const totalFrames = Math.floor(elapsed * 24)
      const f = totalFrames % 24
      const s = Math.floor(totalFrames / 24) % 60
      const m = Math.floor(totalFrames / (24 * 60)) % 60
      const h = Math.floor(totalFrames / (24 * 3600)) % 24
      setTc(`${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return tc
}

function TopBar({ tc }) {
  const [scrolled, setScrolled] = useState(false)
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
      </a>
      <div className="right">
        <nav>
          <a href="#work">Work</a>
          <a href="#think">How I think</a>
          <a href="#next">What's next</a>
          <a href="#contact">Contact</a>
        </nav>
        <span className="timecode" aria-hidden="true">{tc}</span>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell">
        <motion.div
          className="slate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span><b>{profile.roles.join(' / ')}</b></span>
          <span>MPP · UChicago Harris</span>
          <span>MFA Film · SAIC</span>
          <span>Reel 01</span>
        </motion.div>

        <h1>
          <motion.span
            style={{ display: 'block' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.headline[0]}
          </motion.span>
          <motion.span
            className="l2"
            style={{ display: 'block' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            It's the same thing I went to <span className="key">film school</span> to do.
          </motion.span>
        </h1>

        <motion.p
          className="framing"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
        >
          The through-line has never been the medium. In film I used a camera to get close to
          people and under-represented cultures; now I use models to study the same questions
          at a different scale. The tools changed — <span className="em">the obsession
          didn't.</span> I bring a visual and narrative sensibility into technical work, and I
          care as much about how people are represented in the data as I do about the metrics.
        </motion.p>

        <motion.div
          className="scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="ln" />
          Roll
        </motion.div>
      </div>
    </section>
  )
}

function Metric({ m }) {
  if (m.pending) {
    return (
      <div className="metric pending">
        <div className="val">metric pending</div>
        <div className="lbl">to confirm</div>
      </div>
    )
  }
  return (
    <div className="metric">
      <div className="val">{m.value}</div>
      <div className="lbl">{m.label}</div>
    </div>
  )
}

function Work() {
  return (
    <section id="work">
      <div className="shell">
        <Reveal className="section-head">
          <span className="tc">TC 00:01 — SELECTED WORK</span>
          <h2>Core technical work</h2>
          <span className="note">04 projects</span>
        </Reveal>

        <div className="work-grid">
          {projects.map((p, i) => {
            const inner = (
              <>
                <div className="fhead">
                  <span>Frame {String(i + 1).padStart(2, '0')} / 04</span>
                  <span className="kind">{p.kind}</span>
                </div>
                <div className="metrics">
                  {p.metrics.map((m, j) => (
                    <Metric key={j} m={m} />
                  ))}
                </div>
                <h3>{p.name}</h3>
                <p>{p.blurb}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                {p.repo ? (
                  <span className="src">View source ↗</span>
                ) : (
                  <span className="src none">Source — on request</span>
                )}
              </>
            )
            return (
              <Reveal key={p.name} delay={(i % 2) * 0.08}>
                {p.repo ? (
                  <a className="frame" href={p.repo} target="_blank" rel="noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div className="frame">{inner}</div>
                )}
              </Reveal>
            )
          })}
        </div>

        <p className="work-note">
          ▚ Metrics shown as “pending” are awaiting confirmed numbers — nothing here is
          estimated or inflated.
        </p>
      </div>
    </section>
  )
}

function Still({ src, caption }) {
  const [failed, setFailed] = useState(false)
  return (
    <figure className="still">
      <span className="ct tl" />
      <span className="ct tr" />
      <span className="ct bl" />
      <span className="ct br" />
      {!failed && (
        <img src={`${BASE}${src}`} alt={caption} onError={() => setFailed(true)} loading="lazy" />
      )}
      {failed && (
        <div className="ph">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="2" y="6" width="20" height="13" rx="1.5" />
            <path d="M2 9h20M7 6v3M12 6v3M17 6v3" />
            <circle cx="12" cy="13" r="2.6" />
          </svg>
          film still
          <span style={{ color: 'var(--fg-faint)', textTransform: 'none', letterSpacing: '0.04em' }}>
            add {src}
          </span>
        </div>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function Think() {
  return (
    <section id="think">
      <div className="shell">
        <Reveal className="section-head">
          <span className="tc">TC 00:02 — METHOD</span>
          <h2>How I think</h2>
          <span className="note">Same discipline, different tools</span>
        </Reveal>

        <div className="think-grid">
          <Reveal className="think-copy">
            <p>
              Before models, there was the camera. An MFA in film production taught me
              fieldwork: how to enter a community, earn trust, and represent people honestly on
              screen.
            </p>
            <p className="pull">
              Documentary fieldwork and responsible data work are the same discipline under a
              different name.
            </p>
            <p>
              Collecting survey data in the field, handling community records, deciding what a
              model is allowed to infer about someone — these are{' '}
              <span className="accent">representation problems</span> before they are technical
              ones. The camera taught me to be accountable for the frame I choose. I bring that
              same accountability to the data.
            </p>
          </Reveal>

          <Reveal className="stills" delay={0.12}>
            {stills.map((s) => (
              <Still key={s.src} src={s.src} caption={s.caption} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Next() {
  return (
    <section id="next" className="next">
      <div className="shell">
        <Reveal className="section-head">
          <span className="tc">TC 00:03 — TRAJECTORY</span>
          <h2>What's next</h2>
          <span className="note">Direction, not a finished product</span>
        </Reveal>

        <div className="next-grid">
          <Reveal>
            <h2>
              Visual storytelling, <span className="arc">built with AI.</span>
            </h2>
          </Reveal>
          <Reveal className="body" delay={0.1}>
            <p>
              I'm working toward the intersection I've been circling the whole time: combining
              visual storytelling with AI engineering — <span className="em">AI-assisted video
              and animation.</span>
            </p>
            <p>
              I don't have a finished product to show here, and I won't pretend otherwise. This
              is a direction and a trajectory. Right now I'm putting the engineering foundation
              first, and being deliberate about it.
            </p>
            <span className="status">
              <span className="d" />
              In progress — building the foundation
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Credits() {
  return (
    <section id="contact" className="credits">
      <div className="shell">
        <Reveal>
          <span className="tc" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', letterSpacing: '0.16em', color: 'var(--accent)' }}>
            TC 00:04 — END CREDITS
          </span>
          <h2 className="big" style={{ marginTop: '1.4rem' }}>
            Let's build something that <span className="accent">understands people.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="contact-row">
            <a className="clink" href={`mailto:${profile.email}`}>✉ {profile.email}</a>
            <a className="clink" href={profile.github} target="_blank" rel="noreferrer">
              ↗ github.com/berylhu43
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="roll">
            {profile.education.map((e) => (
              <div className="roll-item" key={e.degree}>
                <span className="deg">{e.degree}</span>
                <span className="sch">{e.school}</span>
                <span className="det">{e.detail}</span>
              </div>
            ))}
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
  const tc = useTimecode()
  return (
    <>
      <ScrollProgress />
      <Chrome />
      <TopBar tc={tc} />
      <main>
        <Hero />
        <Work />
        <Think />
        <Next />
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
