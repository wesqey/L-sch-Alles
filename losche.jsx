import { useState, useEffect } from "react";

const BRAND = "Lösch Alles";
const EMAIL = "loschalles.com";          // ← update with real domain/email
const TAGLINE = "A new project. Arriving.";
const YEAR = "2025";

const ITEMS = [
  { id: "001", name: "The Coat",      desc: "Oversize wool, unlined",       dark: true  },
  { id: "002", name: "Vestment",      desc: "Draped cotton gauze",          dark: false },
  { id: "003", name: "The Shirt",     desc: "Deadstock linen, overdyed",    dark: true  },
  { id: "004", name: "Fragment IV",   desc: "Reconstructed denim",          dark: false },
];

const MANIFESTO = [
  { size: "large", text: "Clothes made to" },
  { size: "large", text: "hold a body" },
  { size: "small", text: "through a long, dark season." },
  { size: "small", text: "Nothing more. Nothing less." },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=IBM+Plex+Mono:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:   #0c0b09;
    --deep:  #161412;
    --bone:  #e2ddd3;
    --ash:   #6a6560;
    --cream: #f0ebe1;
    --serif: 'Cormorant Garamond', Georgia, serif;
    --mono:  'IBM Plex Mono', 'Courier New', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--ink);
    color: var(--bone);
    font-family: var(--mono);
    font-weight: 300;
    overflow-x: hidden;
    cursor: crosshair;
  }

  /* grain */
  body::after {
    content: '';
    position: fixed; inset: 0; z-index: 9999;
    pointer-events: none; opacity: 0.038;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px 180px;
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; justify-content: space-between; align-items: center;
    padding: 28px 52px;
  }
  .nav-brand {
    font-family: var(--mono); font-size: 10px;
    letter-spacing: 0.24em; text-transform: uppercase; color: var(--bone);
  }
  .nav-links { display: flex; gap: 40px; list-style: none; }
  .nav-links a {
    font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--ash); text-decoration: none; transition: color 0.25s;
  }
  .nav-links a:hover { color: var(--bone); }

  /* HERO */
  .hero {
    height: 100vh; padding: 0 52px 88px;
    display: flex; flex-direction: column; justify-content: flex-end;
    position: relative; overflow: hidden;
  }
  .hero-ghost {
    position: absolute; right: -16px; top: 50%; transform: translateY(-52%);
    font-family: var(--serif); font-style: italic; font-weight: 300;
    font-size: clamp(180px, 26vw, 400px); line-height: 1;
    color: transparent; -webkit-text-stroke: 1px rgba(226,221,211,0.055);
    pointer-events: none; user-select: none; letter-spacing: -0.02em;
  }
  .hero-title {
    font-family: var(--serif); font-weight: 300; font-style: italic;
    font-size: clamp(88px, 14.5vw, 220px);
    line-height: 0.86; color: var(--cream); letter-spacing: -0.02em;
    opacity: 0; transform: translateY(44px);
    animation: fadeUp 1.4s cubic-bezier(0.16,1,0.3,1) 0.15s forwards;
  }
  .hero-bar {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 34px; padding-top: 24px;
    border-top: 1px solid rgba(106,101,96,0.2);
    opacity: 0; animation: fadeUp 1s ease 0.7s forwards;
  }
  .hero-tag {
    font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ash);
  }
  .hero-vol {
    font-family: var(--serif); font-style: italic; font-size: 14px;
    color: var(--ash); letter-spacing: 0.04em;
  }
  .scroll-hint {
    position: absolute; bottom: 48px; left: 52px;
    display: flex; align-items: center; gap: 14px;
    opacity: 0; animation: fadeIn 1s ease 1.5s forwards;
  }
  .scroll-hint span {
    font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ash);
  }
  .scroll-line {
    width: 42px; height: 1px;
    background: linear-gradient(to right, var(--ash), transparent);
    animation: breathe 2.8s ease-in-out infinite;
  }

  /* SECTION WRAPPER */
  .section { padding: 120px 52px; }

  .sec-label {
    display: flex; align-items: center; gap: 20px; margin-bottom: 72px;
  }
  .sec-label span {
    font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--ash); white-space: nowrap;
  }
  .sec-label::after {
    content: ''; height: 1px; flex: 1; max-width: 180px;
    background: rgba(106,101,96,0.25);
  }

  /* COLLECTION GRID */
  .collection-grid {
    display: grid; grid-template-columns: 1.3fr 0.88fr 0.88fr 1.1fr;
    gap: 18px; align-items: end;
  }
  .item-card { cursor: crosshair; }
  .item-card:nth-child(1) { margin-top: 56px; }
  .item-card:nth-child(2) { margin-top: 0; }
  .item-card:nth-child(3) { margin-top: 96px; }
  .item-card:nth-child(4) { margin-top: 28px; }

  .item-visual {
    aspect-ratio: 2/3; width: 100%;
    overflow: hidden; position: relative;
  }
  .item-visual-inner {
    width: 100%; height: 100%;
    transition: transform 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .item-card:hover .item-visual-inner { transform: scale(1.045); }

  .item-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(12,11,9,0.85) 0%, transparent 55%);
    opacity: 0; transition: opacity 0.45s;
    display: flex; align-items: flex-end; padding: 20px;
  }
  .item-card:hover .item-overlay { opacity: 1; }
  .item-inquire {
    font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--cream);
  }

  .item-meta { padding: 14px 0 0; }
  .item-num { font-size: 8px; letter-spacing: 0.22em; color: var(--ash); }
  .item-name {
    font-family: var(--serif); font-style: italic; font-weight: 300;
    font-size: 20px; color: var(--bone); margin-top: 5px; line-height: 1.15;
  }
  .item-desc { font-size: 9px; color: var(--ash); margin-top: 5px; letter-spacing: 0.07em; }

  /* MANIFESTO */
  .manifesto { background: var(--cream); color: var(--ink); padding: 144px 52px; }
  .manifesto-inner { max-width: 880px; }
  .mf-large {
    font-family: var(--serif); font-weight: 300; font-style: italic;
    font-size: clamp(46px, 6.2vw, 84px); line-height: 1.04; color: var(--ink);
    margin-bottom: 6px;
  }
  .mf-small {
    font-family: var(--serif); font-weight: 300; font-style: italic;
    font-size: clamp(28px, 3.6vw, 50px); line-height: 1.1;
    color: #9a958d; margin-bottom: 52px;
  }
  .mf-rule { border: none; border-top: 1px solid rgba(12,11,9,0.12); margin: 52px 0; }
  .mf-footer {
    display: flex; justify-content: space-between;
    align-items: flex-end; flex-wrap: wrap; gap: 24px;
  }
  .mf-note {
    font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em;
    text-transform: uppercase; color: #9a958d; line-height: 2; max-width: 360px;
  }
  .mf-initial {
    font-family: var(--serif); font-style: italic; font-weight: 300;
    font-size: 128px; line-height: 1;
    color: rgba(12,11,9,0.06); user-select: none;
  }

  /* NOTIFY */
  .notify { padding: 120px 52px 100px; display: flex; gap: 80px; align-items: flex-start; }
  .notify-left { flex: 1; }
  .notify-title {
    font-family: var(--serif); font-weight: 300; font-style: italic;
    font-size: clamp(52px, 8vw, 116px); line-height: 0.9;
    color: var(--cream); margin-bottom: 30px;
  }
  .notify-sub {
    font-size: 9px; letter-spacing: 0.24em;
    text-transform: uppercase; color: var(--ash);
  }
  .notify-right { flex: 0.55; padding-top: 64px; }
  .notify-label {
    display: block; font-size: 9px; letter-spacing: 0.24em;
    text-transform: uppercase; color: var(--ash); margin-bottom: 18px;
  }
  .notify-input-row {
    border-bottom: 1px solid rgba(106,101,96,0.45); padding-bottom: 12px; margin-bottom: 24px;
  }
  .notify-input {
    background: transparent; border: none; outline: none; width: 100%;
    font-family: var(--mono); font-size: 13px; font-weight: 300;
    color: var(--bone); letter-spacing: 0.05em; cursor: text;
  }
  .notify-input::placeholder { color: rgba(106,101,96,0.55); }
  .notify-btn {
    background: transparent; cursor: crosshair;
    border: 1px solid rgba(106,101,96,0.35); padding: 13px 28px;
    font-family: var(--mono); font-size: 9px; letter-spacing: 0.24em;
    text-transform: uppercase; color: var(--ash); transition: all 0.3s;
  }
  .notify-btn:hover { border-color: var(--bone); color: var(--bone); }
  .notify-success {
    font-family: var(--serif); font-style: italic;
    font-size: 20px; color: var(--ash); margin-top: 8px;
  }

  /* FOOTER */
  .footer {
    padding: 26px 52px; border-top: 1px solid rgba(106,101,96,0.14);
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
  }
  .footer-text {
    font-size: 8px; letter-spacing: 0.2em;
    text-transform: uppercase; color: rgba(106,101,96,0.45);
  }

  /* KEYFRAMES */
  @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { to { opacity: 1; } }
  @keyframes breathe {
    0%, 100% { opacity: 0.35; width: 42px; }
    50%       { opacity: 0.8;  width: 64px; }
  }

  /* RESPONSIVE */
  @media (max-width: 820px) {
    .nav { padding: 20px 24px; }
    .nav-links { display: none; }
    .hero, .section, .manifesto, .notify { padding-left: 24px; padding-right: 24px; }
    .collection-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
    .item-card:nth-child(1),
    .item-card:nth-child(2),
    .item-card:nth-child(3),
    .item-card:nth-child(4) { margin-top: 0; }
    .item-card:nth-child(2),
    .item-card:nth-child(4) { margin-top: 36px; }
    .notify { flex-direction: column; gap: 40px; }
    .footer { flex-direction: column; align-items: flex-start; }
  }
`;

function ItemVisual({ item, index }) {
  const darkPalettes = [
    { a: "#1e1c19", b: "#2c2924", c: "#0e0d0b" },
    { a: "#d8d2c8", b: "#bdb8ae", c: "#e6e0d5" },
    { a: "#252220", b: "#1c1a18", c: "#302d29" },
    { a: "#e6e0d5", b: "#d0cbc0", c: "#ede7dc" },
  ];
  const p = darkPalettes[index % darkPalettes.length];
  const isDark = item.dark;

  return (
    <div className="item-visual">
      <div className="item-visual-inner">
        <div style={{
          width: "100%", height: "100%", position: "relative",
          background: `radial-gradient(ellipse at ${32 + index * 12}% 38%, ${p.b} 0%, ${p.a} 48%, ${p.c} 100%)`,
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.16 }}
          >
            <filter id={`fab${index}`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.018 0.72"
                numOctaves="2"
                seed={index * 11}
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8"
                xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <rect width="100%" height="100%"
              fill={isDark ? "#c8c3b9" : "#1a1816"}
              filter={`url(#fab${index})`}
            />
          </svg>
        </div>
        <div className="item-overlay">
          <span className="item-inquire">Inquire →</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://fonts.googleapis.com";
    document.head.appendChild(link);
    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=IBM+Plex+Mono:wght@300;400&display=swap";
    document.head.appendChild(link2);
  }, []);

  const handleSubmit = () => {
    if (email.includes("@")) setSubmitted(true);
  };

  return (
    <>
      <style>{CSS}</style>

      {/* ── NAV ─────────────────────────────────── */}
      <nav className="nav">
        <div className="nav-brand">{BRAND}</div>
        <ul className="nav-links">
          <li><a href="#collection">Collection</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#notify">Contact</a></li>
        </ul>
      </nav>

      {/* ── HERO ────────────────────────────────── */}
      <section className="hero">
        <div className="hero-ghost">{BRAND[0]}</div>
        <h1 className="hero-title">{BRAND}</h1>
        <div className="hero-bar">
          <span className="hero-tag">{TAGLINE}</span>
          <span className="hero-vol">Vol. I — {YEAR}</span>
        </div>
        <div className="scroll-hint">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── COLLECTION ──────────────────────────── */}
      <section className="section" id="collection">
        <div className="sec-label"><span>I — Collection</span></div>
        <div className="collection-grid">
          {ITEMS.map((item, i) => (
            <div key={item.id} className="item-card">
              <ItemVisual item={item} index={i} />
              <div className="item-meta">
                <div className="item-num">{item.id}</div>
                <div className="item-name">{item.name}</div>
                <div className="item-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MANIFESTO ───────────────────────────── */}
      <section className="manifesto" id="about">
        <div className="manifesto-inner">
          {MANIFESTO.map((line, i) => (
            <p key={i} className={line.size === "large" ? "mf-large" : "mf-small"}>
              {line.text}
            </p>
          ))}
          <hr className="mf-rule" />
          <div className="mf-footer">
            <p className="mf-note">
              An independent project rooted in quiet intention.<br />
              Each piece made once. No restocking.
            </p>
            <div className="mf-initial">{BRAND[0]}</div>
          </div>
        </div>
      </section>

      {/* ── NOTIFY ──────────────────────────────── */}
      <section className="notify" id="notify">
        <div className="notify-left">
          <h2 className="notify-title">
            First<br />to<br />know.
          </h2>
          <p className="notify-sub">Register for upcoming drops</p>
        </div>
        <div className="notify-right">
          {!submitted ? (
            <>
              <span className="notify-label">Email address</span>
              <div className="notify-input-row">
                <input
                  className="notify-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                />
              </div>
              <button className="notify-btn" onClick={handleSubmit}>
                Register →
              </button>
            </>
          ) : (
            <p className="notify-success">You'll hear from us.</p>
          )}
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="footer">
        <span className="footer-text">© {BRAND} {YEAR}</span>
        <span className="footer-text">
          All enquiries — contact@{EMAIL}
        </span>
        <span className="footer-text">Independent. Uncompromising.</span>
      </footer>
    </>
  );
}
