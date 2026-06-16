// Content for github.com/berylhu43 — Yuxuan Hu.

export const profile = {
  name: 'Yuxuan Hu',
  roles: ['Data Scientist', 'ML Engineer'],
  github: 'https://github.com/berylhu43',
  email: 'huhuyuyuxuan@gmail.com',
}

// Core technical work.
export const projects = [
  {
    name: 'MaraKuja OCR Pipeline',
    kind: 'Fine-tuning · Document AI',
    blurb:
      'A fine-tuned OCR pipeline that turns handwritten field forms into structured, analysis-ready data — adapting a vision model with QLoRA on a custom paired image / spreadsheet dataset.',
    tags: ['QLoRA', 'OCR', 'Vision', 'PyTorch'],
    repo: 'https://github.com/berylhu43/qlora-ocr-pipeline',
  },
  {
    name: 'CalWORKs RAG System',
    kind: 'Retrieval-Augmented Generation',
    blurb:
      'A retrieval-augmented generation system over CalWORKs benefits policy, built to answer caseworker and applicant questions with grounded, citable responses.',
    tags: ['RAG', 'LLMs', 'Retrieval', 'Evaluation'],
    repo: 'https://github.com/berylhu43/CalWORK-LLM-Model',
  },
  {
    name: 'Clinical Knowledge Graph Extraction',
    kind: 'NLP · Information Extraction',
    blurb:
      'An extraction pipeline that pulls entities and their relationships from clinical text into a structured knowledge graph for downstream querying.',
    tags: ['NLP', 'Knowledge Graph', 'Extraction', 'LLMs'],
    repo: 'https://github.com/berylhu43/Clinical_KG_OS_LLM',
  },
  {
    name: 'PalmWatch',
    kind: 'LLM Benchmarking · Accountability',
    blurb:
      'Benchmarks LLM-based and automated approaches for extracting structured tabular data from palm-oil supply-chain disclosures, in support of corporate-accountability research.',
    tags: ['LLMs', 'PDF Extraction', 'Benchmarking', 'Python'],
    repo: 'https://github.com/berylhu43/palm-oil-disclosure-parser',
  },
]

// Career trajectory — first two stages are past/completed, last two are
// a direction in progress (not finished products).
export const trajectory = [
  {
    label: 'Film',
    tag: 'Past',
    note: 'Camera as instrument — composition, attention, the cut.',
    state: 'done',
  },
  {
    label: 'Data Science',
    tag: 'Past',
    note: 'Structure from mess — models, pipelines, evaluation.',
    state: 'done',
  },
  {
    label: 'Agentic AI',
    tag: 'Now',
    note: 'Current focus — systems that act, not just predict.',
    state: 'now',
  },
  {
    label: 'AI-assisted Video / App',
    tag: 'Next',
    note: 'The direction — visual storytelling, built with AI.',
    state: 'next',
  },
]
