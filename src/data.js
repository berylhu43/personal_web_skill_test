// Content for github.com/berylhu43 — Yuxuan Hu.
// Metrics on projects are intentionally marked `pending` until confirmed;
// nothing here should overstate results.

export const profile = {
  name: 'Yuxuan Hu',
  roles: ['Data Scientist', 'ML Engineer'],
  // One-line identity statement framing the cross-disciplinary view.
  headline: [
    'I use machine learning to understand people.',
    "It's the same thing I went to film school to do.",
  ],
  // Short framing paragraph (the "through-line").
  framing:
    'The through-line has never been the medium. In film I used a camera to get close to people and under-represented cultures; now I use models to study the same questions at a different scale. The tools changed — the obsession didn’t. I bring a visual and narrative sensibility into technical work, and I care as much about how people are represented in the data as I do about the metrics.',
  github: 'https://github.com/berylhu43',
  email: 'huhuyuyuxuan@gmail.com',
  education: [
    {
      degree: 'MPP — Public Policy',
      school: 'University of Chicago, Harris School of Public Policy',
      detail: '2026',
    },
    {
      degree: 'MFA — Film Production',
      school: 'School of the Art Institute of Chicago',
      detail: '4.0 GPA',
    },
  ],
}

// Core technical work. Lead with metrics — fill `metrics` once confirmed.
// `pending: true` renders an honest placeholder instead of a fake number.
export const projects = [
  {
    name: 'MaraKuja OCR Pipeline',
    kind: 'Fine-tuning · Document AI',
    blurb:
      'A fine-tuned OCR pipeline that turns handwritten field forms into structured, analysis-ready data — adapting a vision model with QLoRA on a custom paired image / spreadsheet dataset.',
    tags: ['QLoRA', 'OCR', 'Vision', 'PyTorch'],
    repo: 'https://github.com/berylhu43/qlora-ocr-pipeline',
    metrics: [{ pending: true }, { pending: true }],
  },
  {
    name: 'CalWORKs RAG System',
    kind: 'Retrieval-Augmented Generation',
    blurb:
      'A retrieval-augmented generation system over CalWORKs benefits policy, built to answer caseworker and applicant questions with grounded, citable responses.',
    tags: ['RAG', 'LLMs', 'Retrieval', 'Evaluation'],
    repo: null,
    metrics: [{ pending: true }, { pending: true }],
  },
  {
    name: 'Clinical Knowledge Graph Extraction',
    kind: 'NLP · Information Extraction',
    blurb:
      'An extraction pipeline that pulls entities and their relationships from clinical text into a structured knowledge graph for downstream querying.',
    tags: ['NLP', 'Knowledge Graph', 'Extraction', 'LLMs'],
    repo: null,
    metrics: [{ pending: true }, { pending: true }],
  },
  {
    name: 'PalmWatch',
    kind: 'LLM Benchmarking · Accountability',
    blurb:
      'Benchmarks LLM-based and automated approaches for extracting structured tabular data from palm-oil supply-chain disclosures, in support of corporate-accountability research.',
    tags: ['LLMs', 'PDF Extraction', 'Benchmarking', 'Python'],
    repo: 'https://github.com/berylhu43/palm-oil-disclosure-parser',
    metrics: [{ pending: true }, { pending: true }],
  },
]

// Film stills used as atmospheric evidence (NOT a gallery).
// Drop files at public/stills/still-01.jpg etc. — until then a placeholder shows.
export const stills = [
  {
    src: 'stills/still-01.jpg',
    caption: 'Fieldwork — observing, not staging.',
  },
  {
    src: 'stills/still-02.jpg',
    caption: 'The frame is a choice you are accountable for.',
  },
]
