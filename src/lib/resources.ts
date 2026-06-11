/**
 * Single source of truth for every external resource in Praxia (§9 standard).
 *
 * HARD RULE (CONTEXT_FOR_CLAUDE_CODE.md Part A / Part C):
 * Every entry here comes from a verified Part A source.
 * Never invent or guess a URL or a price.
 * Paid items are labelled Paid; unverifiable items carry needsReview: true.
 *
 * The /resources master page and every stage page read from this one array.
 * Resources are never duplicated between pages.
 */

import { type Resource, validateResources } from "./schema";

// ── Raw data — validated at module load time ────────────────────────────────
const _raw: unknown[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATIONS (Stage 0)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "cs50x",
    title: "CS50x — Introduction to Computer Science",
    author: "Harvard University / David Malan",
    year: 2024,
    url: "https://cs50.harvard.edu/x/",
    type: "Course",
    level: "Foundations",
    cost: "Free",
    verdict:
      "The single best foundations course on the internet — rigorous, beloved, and free; no other course teaches this much this well.",
    useIf:
      "You are new to programming or want a properly rigorous foundation before anything else.",
    stages: ["foundations"],
    rankInTopic: 1,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "automate-boring-stuff",
    title: "Automate the Boring Stuff with Python",
    author: "Al Sweigart",
    year: 2019,
    url: "https://automatetheboringstuff.com/",
    type: "Book",
    level: "Foundations",
    cost: "Free",
    verdict:
      "Fastest path to useful Python for non-CS people — you are writing real scripts within hours, not learning abstract theory.",
    useIf:
      "You want to get productive in Python immediately and learn by solving real tasks, not toy exercises.",
    stages: ["foundations"],
    rankInTopic: 2,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "python-official-tutorial",
    title: "The Python Tutorial",
    author: "Python Software Foundation",
    url: "https://docs.python.org/3/tutorial/",
    type: "Docs",
    level: "Foundations",
    cost: "Free",
    verdict:
      "The authoritative reference — dry, but covers the language precisely; use it to look things up, not to learn from scratch.",
    useIf:
      "You already know basic Python and want to understand a specific feature properly, directly from the source.",
    stages: ["foundations"],
    rankInTopic: 3,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "pro-git",
    title: "Pro Git",
    author: "Scott Chacon & Ben Straub",
    url: "https://git-scm.com/book",
    type: "Book",
    level: "Foundations",
    cost: "Free",
    verdict:
      "The canonical Git reference — chapters 1–5 are all most practitioners ever need; the rest covers internals for the curious.",
    useIf:
      "You want to understand Git properly — not just the commands, but what the commit graph actually is.",
    stages: ["foundations"],
    rankInTopic: 4,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "mit-missing-semester",
    title: "The Missing Semester of Your CS Education",
    author: "MIT CSAIL",
    year: 2020,
    url: "https://missing.csail.mit.edu/",
    type: "Course",
    level: "Foundations",
    cost: "Free",
    verdict:
      "Fills the gap every formal program leaves: the shell, Vim, tmux, Git, debugging, profiling — tools you use every day but were never taught.",
    useIf:
      "You came from a bootcamp or self-taught path and feel slow in the terminal or lost when something breaks.",
    stages: ["foundations"],
    rankInTopic: 5,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DATA ANALYST (Stage 1)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "statquest",
    title: "StatQuest with Josh Starmer",
    author: "Josh Starmer",
    url: "https://www.youtube.com/@statquest",
    type: "Video",
    level: "Competent",
    cost: "Free",
    verdict:
      "The best statistics intuition anywhere — Starmer explains each concept from first principles, without the hand-waving that makes stats confusing; it is not a shortcut, it is an accelerant.",
    useIf:
      "You want to actually understand what hypothesis tests and distributions mean — not just run them — before or alongside a textbook.",
    stages: ["data-analyst", "data-scientist"],
    rankInTopic: 1,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "khan-academy-statistics",
    title: "Statistics and Probability",
    author: "Khan Academy",
    url: "https://www.khanacademy.org/math/statistics-probability",
    type: "Course",
    level: "Foundations",
    cost: "Free",
    verdict:
      "Solid foundational drilling — the exercises are genuinely useful, though the content stops well short of inference at the level you need for professional work.",
    useIf:
      "You need to build fluency in probability basics and descriptive statistics before moving to inferential tests.",
    stages: ["data-analyst", "mathematics"],
    rankInTopic: 2,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "openintro-statistics",
    title: "OpenIntro Statistics",
    author: "David Diez, Mine Çetinkaya-Rundel & Christopher Barr",
    year: 2019,
    url: "https://www.openintro.org/book/os/",
    type: "Book",
    level: "Competent",
    cost: "Free",
    verdict:
      "A genuinely good free statistics textbook — readable, covers inference properly, and has real exercises; the free PDF is the real deal, not a sample.",
    useIf:
      "You want a structured textbook for self-study that covers hypothesis testing and regression without costing anything.",
    stages: ["data-analyst"],
    rankInTopic: 3,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "practical-statistics-ds",
    title: "Practical Statistics for Data Scientists",
    author: "Peter Bruce, Andrew Bruce & Peter Gedeck",
    year: 2020,
    type: "Book",
    level: "Competent",
    cost: "Paid",
    verdict:
      "The best bridge between statistics and data science practice — it treats you as a programmer who needs to think statistically, not a stats student who needs to code.",
    useIf:
      "You are comfortable with Python/R and want to understand the statistical underpinnings of what you are already doing, or you are about to start Stage 2 and want the bridge.",
    stages: ["data-analyst", "data-scientist"],
    rankInTopic: 4,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "tableau-public",
    title: "Tableau Public",
    author: "Tableau / Salesforce",
    url: "https://public.tableau.com/",
    type: "Tool",
    level: "Competent",
    cost: "Free",
    verdict:
      "The fastest way to build and publish interactive dashboards; the free tier is genuinely capable and the gallery shows you what is possible.",
    useIf:
      "You need to develop BI and dashboarding skills — Tableau fluency is an explicit requirement on most analyst job descriptions.",
    stages: ["data-analyst"],
    rankInTopic: 5,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DATA SCIENTIST (Stage 2)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "islr",
    title: "An Introduction to Statistical Learning (ISLR / ISLP)",
    author: "James, Witten, Hastie & Tibshirani",
    year: 2023,
    url: "https://www.statlearning.com/",
    type: "Book",
    level: "Competent",
    cost: "Free",
    verdict:
      "THE canonical entry point to machine learning — readable, rigorous, and free; the R and Python editions both cover the same concepts, choose by your preference.",
    useIf:
      "You are starting machine learning for the first time or want to understand the classical algorithms properly before touching deep learning.",
    stages: ["data-scientist"],
    rankInTopic: 1,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "esl",
    title: "The Elements of Statistical Learning (ESL)",
    author: "Hastie, Tibshirani & Friedman",
    year: 2009,
    url: "https://hastie.su.domains/ElemStatLearn/",
    type: "Book",
    level: "Expert",
    cost: "Free",
    verdict:
      "The rigorous big brother of ISLR — dense, mathematically demanding, and necessary if you want to understand WHY the algorithms work at a deep level.",
    useIf:
      "You have finished ISLR and want to go deeper into the mathematical foundations, or you are preparing for research.",
    stages: ["data-scientist", "research"],
    rankInTopic: 3,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "hands-on-ml",
    title: "Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow",
    author: "Aurélien Géron",
    year: 2022,
    type: "Book",
    level: "Production",
    cost: "Paid",
    verdict:
      "The best practical ML book — clear code, real projects, and it takes you all the way from scikit-learn to neural networks in one coherent progression.",
    useIf:
      "You want to build things, not just understand theory — this is the book you work through from cover to cover.",
    stages: ["data-scientist", "ml-engineer"],
    rankInTopic: 9,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "mml-book",
    title: "Mathematics for Machine Learning",
    author: "Deisenroth, Faisal & Ong",
    year: 2020,
    url: "https://mml-book.com/",
    type: "Book",
    level: "Competent",
    cost: "Free",
    verdict:
      "The single best bridge between undergraduate mathematics and ML — covers linear algebra, calculus, and probability in the context of ML applications.",
    useIf:
      "You need to strengthen your mathematical foundations alongside ISLR or before tackling deep learning.",
    stages: ["data-scientist", "research", "mathematics"],
    rankInTopic: 2,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "ng-ml-specialization",
    title: "Machine Learning Specialization",
    author: "Andrew Ng / DeepLearning.AI",
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    type: "Course",
    level: "Competent",
    cost: "Freemium",
    verdict:
      "The canonical first ML course — Ng explains concepts with unusual clarity, though the assignments are now Python-based and more hands-on than the original.",
    useIf:
      "You learn better from video lectures and want a structured, guided path through classical ML with exercises.",
    stages: ["data-scientist"],
    rankInTopic: 8,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ML ENGINEER (Stage 3)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "d2l",
    title: "Dive into Deep Learning",
    author: "Zhang, Lipton, Li & Smola",
    year: 2023,
    url: "https://d2l.ai/",
    type: "Book",
    level: "Production",
    cost: "Free",
    verdict:
      "The best hands-on deep learning book — every chapter has runnable code in PyTorch, JAX, and TensorFlow; builds from scratch to transformers.",
    useIf:
      "You want to understand deep learning by building it, not just using it — this is the book you code through.",
    stages: ["ml-engineer"],
    rankInTopic: 1,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "goodfellow-dl",
    title: "Deep Learning",
    author: "Goodfellow, Bengio & Courville",
    year: 2016,
    url: "https://www.deeplearningbook.org/",
    type: "Book",
    level: "Expert",
    cost: "Free",
    verdict:
      "The theory canon of deep learning — rigorous, dense, and essential for understanding WHY neural networks work; not a first read, but an important eventual reference.",
    useIf:
      "You have practical DL experience and want to understand the theoretical underpinnings — backprop, regularization, optimization — at depth.",
    stages: ["ml-engineer", "research"],
    rankInTopic: 5,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "karpathy-zero-to-hero",
    title: "Neural Networks: Zero to Hero",
    author: "Andrej Karpathy",
    year: 2023,
    url: "https://karpathy.ai/zero-to-hero.html",
    type: "Video",
    level: "Production",
    cost: "Free",
    verdict:
      "You build a transformer from scratch — every gradient, every matrix multiply — and you understand it by the end; this is the closest thing to an essential ML video series.",
    useIf:
      "You want deep understanding of neural networks and transformers, not just API fluency — this series is non-negotiable.",
    stages: ["ml-engineer", "ai-engineer"],
    rankInTopic: 3,
    lastReviewed: "2026-06-11",
    needsReview: true,
  },
  {
    id: "fastai",
    title: "Practical Deep Learning for Coders",
    author: "Jeremy Howard / fast.ai",
    url: "https://course.fast.ai/",
    type: "Course",
    level: "Production",
    cost: "Free",
    verdict:
      "The best top-down practical DL course — starts with working code and walks backward to the theory; covers vision, NLP, and tabular data.",
    useIf:
      "You learn better top-down and want to build real models fast, then deepen your understanding of how they work.",
    stages: ["ml-engineer"],
    rankInTopic: 4,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "designing-ml-systems",
    title: "Designing Machine Learning Systems",
    author: "Chip Huyen",
    year: 2022,
    type: "Book",
    level: "Production",
    cost: "Paid",
    verdict:
      "The production MLOps bible — covers every step from data collection to monitoring in production, with clear frameworks and real-world cases; non-negotiable for this stage.",
    useIf:
      "You are moving from notebooks to production systems and need to understand what it actually takes to ship and maintain ML at scale.",
    stages: ["ml-engineer"],
    rankInTopic: 2,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "pytorch-tutorials",
    title: "PyTorch Tutorials",
    author: "Meta AI / PyTorch Team",
    url: "https://pytorch.org/tutorials/",
    type: "Docs",
    level: "Production",
    cost: "Free",
    verdict:
      "The official, authoritative PyTorch reference — the introductory tutorials are the fastest way to get productive; use the advanced sections for specific capabilities.",
    useIf:
      "You are learning PyTorch or need to understand a specific capability (custom datasets, ONNX export, distributed training).",
    stages: ["ml-engineer"],
    rankInTopic: 6,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "full-stack-deep-learning",
    title: "Full Stack Deep Learning",
    author: "Chloe He, Sergey Karayev, Josh Tobin",
    url: "https://fullstackdeeplearning.com/",
    type: "Course",
    level: "Production",
    cost: "Free",
    verdict:
      "Bridges the gap between training a model and shipping a product — covers tooling, infrastructure, and the product decisions around ML.",
    useIf:
      "You have trained models but have not shipped one to users, and want a structured path through the full production stack.",
    stages: ["ml-engineer"],
    rankInTopic: 7,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "docker-docs",
    title: "Docker Getting Started",
    author: "Docker Inc.",
    url: "https://docs.docker.com/get-started/",
    type: "Docs",
    level: "Production",
    cost: "Free",
    verdict:
      "The official Docker introduction — clear, practical, and the right starting point for containerising ML workloads.",
    useIf:
      "You are containerising a model or service for the first time and need to understand Docker from first principles.",
    stages: ["ml-engineer"],
    rankInTopic: 8,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI ENGINEER (Stage 4)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "huggingface-course",
    title: "Hugging Face NLP / LLM Course",
    author: "Hugging Face",
    url: "https://huggingface.co/learn",
    type: "Course",
    level: "Production",
    cost: "Free",
    verdict:
      "The best practical NLP-to-LLM path — hands-on, current, and covers fine-tuning, PEFT, and deployment in a coherent sequence.",
    useIf:
      "You want to move from understanding transformers to using them — fine-tuning, embedding, and serving models with the Hugging Face ecosystem.",
    stages: ["ai-engineer"],
    rankInTopic: 1,
    lastReviewed: "2026-06-11",
    needsReview: true,
  },
  {
    id: "deeplearningai-short-courses",
    title: "DeepLearning.AI Short Courses",
    author: "DeepLearning.AI",
    url: "https://www.deeplearning.ai/short-courses/",
    type: "Course",
    level: "Production",
    cost: "Free",
    verdict:
      "Bite-sized and current — the RAG, agents, and evals courses are the fastest way to get hands-on with specific LLM engineering topics.",
    useIf:
      "You want to get up to speed on a specific capability (RAG, evals, function calling) quickly and with working code.",
    stages: ["ai-engineer"],
    rankInTopic: 2,
    lastReviewed: "2026-06-11",
    needsReview: true,
  },
  {
    id: "nanoGPT",
    title: "nanoGPT",
    author: "Andrej Karpathy",
    url: "https://github.com/karpathy/nanoGPT",
    type: "Tool",
    level: "Expert",
    cost: "Free",
    verdict:
      "A minimal, readable GPT implementation from scratch — the best codebase to read when you want to understand what is actually happening inside an LLM.",
    useIf:
      "You want to understand transformer internals at the code level, beyond the Karpathy video series.",
    stages: ["ai-engineer"],
    rankInTopic: 3,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "lilian-weng-blog",
    title: "Lil'Log",
    author: "Lilian Weng",
    url: "https://lilianweng.github.io/",
    type: "Blog",
    level: "Expert",
    cost: "Free",
    verdict:
      "Exceptional deep-dives on agents, LLMs, and hallucination — among the best technical writing in ML; dense but worth every word.",
    useIf:
      "You want rigorous, well-sourced overviews of a specific LLM topic (agents, RLHF, attention, hallucination) beyond what a course covers.",
    stages: ["ai-engineer", "research"],
    rankInTopic: 4,
    lastReviewed: "2026-06-11",
    needsReview: true,
  },
  {
    id: "anthropic-docs",
    title: "Anthropic Developer Documentation",
    author: "Anthropic",
    url: "https://docs.claude.com/",
    type: "Docs",
    level: "Production",
    cost: "Free",
    verdict:
      "The authoritative reference for the Claude API, prompting best practices, and agent architecture — if you are building with Claude, start here.",
    useIf:
      "You are building with Claude or want the canonical prompting and tool-use patterns from Anthropic.",
    stages: ["ai-engineer"],
    rankInTopic: 5,
    lastReviewed: "2026-06-11",
    needsReview: true,
  },
  {
    id: "ragas-docs",
    title: "RAGAS Documentation",
    author: "Exploding Gradients",
    url: "https://docs.ragas.io/",
    type: "Docs",
    level: "Production",
    cost: "Free",
    verdict:
      "The standard RAG evaluation framework — covers faithfulness, answer relevancy, and context precision in a way you can actually integrate into a CI pipeline.",
    useIf:
      "You are building a RAG system and need to measure quality rigorously, not just vibes-test it.",
    stages: ["ai-engineer"],
    rankInTopic: 6,
    lastReviewed: "2026-06-11",
    needsReview: true,
  },
  {
    id: "langgraph-docs",
    title: "LangGraph Documentation",
    author: "LangChain Inc.",
    url: "https://langchain-ai.github.io/langgraph/",
    type: "Docs",
    level: "Production",
    cost: "Free",
    verdict:
      "The primary framework for multi-agent orchestration with explicit state — useful for building agents that need complex branching or human-in-the-loop.",
    useIf:
      "You are building a multi-agent system and need a framework for managing state, tool calls, and conditional routing.",
    stages: ["ai-engineer"],
    rankInTopic: 7,
    lastReviewed: "2026-06-11",
    needsReview: true,
  },
  {
    id: "qdrant-docs",
    title: "Qdrant Documentation",
    author: "Qdrant",
    url: "https://qdrant.tech/documentation/",
    type: "Docs",
    level: "Production",
    cost: "Free",
    verdict:
      "Clear, practical docs for one of the best vector databases — the quickstart gets you a working similarity search in minutes.",
    useIf:
      "You are building RAG or semantic search and want a production-grade vector database with good Rust-backed performance.",
    stages: ["ai-engineer"],
    rankInTopic: 8,
    lastReviewed: "2026-06-11",
    needsReview: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KEY PAPERS (Stage 4 + Research)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "paper-attention",
    title: "Attention Is All You Need",
    author: "Vaswani et al.",
    year: 2017,
    url: "https://arxiv.org/abs/1706.03762",
    type: "Paper",
    level: "Expert",
    cost: "Free",
    verdict:
      "The paper that introduced transformers — you need to have read this; the architecture is now everywhere and the original is still the clearest description.",
    useIf:
      "You want to understand how transformers work from the original source, before reading any second-hand explanation.",
    stages: ["ai-engineer", "research"],
    rankInTopic: 1,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "paper-bert",
    title:
      "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    author: "Devlin et al.",
    year: 2018,
    url: "https://arxiv.org/abs/1810.04805",
    type: "Paper",
    level: "Expert",
    cost: "Free",
    verdict:
      "The paper that established masked language modelling as the pretraining paradigm — still the canonical read for understanding BERT-family models.",
    useIf:
      "You are working with encoder-based models or want to understand the pretraining/fine-tuning paradigm from source.",
    stages: ["ai-engineer", "research"],
    rankInTopic: 2,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "paper-gpt3",
    title: "Language Models are Few-Shot Learners",
    author: "Brown et al.",
    year: 2020,
    url: "https://arxiv.org/abs/2005.14165",
    type: "Paper",
    level: "Expert",
    cost: "Free",
    verdict:
      "The GPT-3 paper that demonstrated in-context learning at scale — important for understanding why LLMs behave the way they do.",
    useIf:
      "You want to understand the origins of prompt engineering and in-context learning from the research that defined them.",
    stages: ["ai-engineer", "research"],
    rankInTopic: 3,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "paper-chain-of-thought",
    title:
      "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    author: "Wei et al.",
    year: 2022,
    url: "https://arxiv.org/abs/2201.11903",
    type: "Paper",
    level: "Expert",
    cost: "Free",
    verdict:
      "The paper that formalised chain-of-thought prompting — short, clear, and essential for anyone doing reasoning-heavy LLM work.",
    useIf:
      "You are designing prompts for complex reasoning tasks and want the research basis for why step-by-step thinking helps.",
    stages: ["ai-engineer", "research"],
    rankInTopic: 4,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "paper-rag",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    author: "Lewis et al.",
    year: 2020,
    url: "https://arxiv.org/abs/2005.11401",
    type: "Paper",
    level: "Expert",
    cost: "Free",
    verdict:
      "The original RAG paper — explains the retrieval-generation architecture that underpins most production LLM knowledge systems today.",
    useIf:
      "You are building a RAG system and want to understand the original architecture and its trade-offs.",
    stages: ["ai-engineer", "research"],
    rankInTopic: 5,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "paper-lora",
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    author: "Hu et al.",
    year: 2021,
    url: "https://arxiv.org/abs/2106.09685",
    type: "Paper",
    level: "Expert",
    cost: "Free",
    verdict:
      "The paper that made fine-tuning accessible — introduces the low-rank decomposition trick that is now the standard PEFT method.",
    useIf:
      "You are fine-tuning LLMs and want to understand why LoRA works and when it is appropriate.",
    stages: ["ai-engineer", "research"],
    rankInTopic: 6,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "paper-instructgpt",
    title:
      "Training language models to follow instructions with human feedback",
    author: "Ouyang et al.",
    year: 2022,
    url: "https://arxiv.org/abs/2203.02155",
    type: "Paper",
    level: "Expert",
    cost: "Free",
    verdict:
      "The InstructGPT / RLHF paper — explains how models are aligned with human preferences; essential for understanding why modern LLMs behave so differently from raw language models.",
    useIf:
      "You want to understand RLHF and instruction tuning from the original research.",
    stages: ["ai-engineer", "research"],
    rankInTopic: 7,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "paper-xgboost",
    title: "XGBoost: A Scalable Tree Boosting System",
    author: "Chen & Guestrin",
    year: 2016,
    url: "https://arxiv.org/abs/1603.02754",
    type: "Paper",
    level: "Production",
    cost: "Free",
    verdict:
      "The paper behind the algorithm that still wins tabular Kaggle competitions — surprisingly readable and explains the regularised objective clearly.",
    useIf:
      "You use XGBoost and want to understand the algorithm, not just the library — or you are preparing for technical interviews.",
    stages: ["data-scientist", "research"],
    rankInTopic: 1,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RESEARCH TRACK
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "prml-bishop",
    title: "Pattern Recognition and Machine Learning",
    author: "Christopher Bishop",
    year: 2006,
    url: "https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/",
    type: "Book",
    level: "Research",
    cost: "Free",
    verdict:
      "The Bayesian-flavoured ML canon — rigorous, comprehensive, and now free from the author; the probabilistic graphical model chapters are the best treatment available.",
    useIf:
      "You are moving into research and want the mathematical depth that ISLR does not provide — particularly Bayesian methods.",
    stages: ["research"],
    rankInTopic: 4,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "murphy-pml",
    title: "Probabilistic Machine Learning (2 volumes)",
    author: "Kevin Murphy",
    year: 2022,
    url: "https://probml.github.io/pml-book/",
    type: "Book",
    level: "Research",
    cost: "Free",
    verdict:
      "The modern research reference — encyclopaedic, up-to-date through 2022, and freely available; Vol. 1 covers foundations, Vol. 2 covers advanced methods.",
    useIf:
      "You are doing research and need a comprehensive, current reference — Bishop is the classic, Murphy is the modern standard.",
    stages: ["research"],
    rankInTopic: 8,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "how-to-read-a-paper",
    title: "How to Read a Paper",
    author: "S. Keshav",
    year: 2007,
    url: "https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf",
    type: "Paper",
    level: "Research",
    cost: "Free",
    verdict:
      "Three pages that will save you hundreds of hours — the 3-pass method is the correct way to read research papers and almost nobody teaches it.",
    useIf:
      "You are starting to read ML papers and feel like you are drowning — read this first, once, and apply it every time.",
    stages: ["research"],
    rankInTopic: 1,
    lastReviewed: "2026-06-11",
    needsReview: true,
  },
  {
    id: "papers-with-code",
    title: "Papers With Code",
    author: "Meta AI",
    url: "https://paperswithcode.com/",
    type: "Tool",
    level: "Research",
    cost: "Free",
    verdict:
      "The best place to find state-of-the-art results with reproducible code — benchmark tables, leaderboards, and linked implementations in one place.",
    useIf:
      "You want to find the current SOTA on a benchmark, or you want a paper's official implementation rather than a community reimplementation.",
    stages: ["research"],
    rankInTopic: 5,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "distill-pub",
    title: "Distill.pub",
    author: "Distill team (archive)",
    url: "https://distill.pub/",
    type: "Blog",
    level: "Expert",
    cost: "Free",
    verdict:
      "An archive of exemplary ML explanation — interactive, visually precise, and a high bar for what clear technical communication looks like; no longer actively publishing, but everything there is worth reading.",
    useIf:
      "You want the clearest possible explanation of a specific concept (attention, circuits, feature visualisation) that Distill covered.",
    stages: ["research", "ai-engineer"],
    rankInTopic: 7,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "arxiv",
    title: "arXiv — cs.LG recent submissions",
    author: "Cornell University",
    url: "https://arxiv.org/list/cs.LG/recent",
    type: "Docs",
    level: "Research",
    cost: "Free",
    verdict:
      "The preprint firehose — every important ML paper appears here before any journal; the skill is learning to filter signal from noise.",
    useIf:
      "You are tracking the field and want to stay current — but build the filtering skill first, or you will drown.",
    stages: ["research", "ai-engineer"],
    rankInTopic: 9,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MATHEMATICS (/mathematics)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "3b1b-linear-algebra",
    title: "Essence of Linear Algebra",
    author: "3Blue1Brown / Grant Sanderson",
    url: "https://www.3blue1brown.com/topics/linear-algebra",
    type: "Video",
    level: "Foundations",
    cost: "Free",
    verdict:
      "The best geometric intuition for linear algebra — transforms the subject from symbol manipulation to genuine understanding of what vectors and matrices are.",
    useIf:
      "You have seen the linear algebra formulas but do not have geometric intuition for what they mean — watch this before or alongside any formal course.",
    stages: ["mathematics", "data-scientist"],
    rankInTopic: 1,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "3b1b-calculus",
    title: "Essence of Calculus",
    author: "3Blue1Brown / Grant Sanderson",
    url: "https://www.3blue1brown.com/topics/calculus",
    type: "Video",
    level: "Foundations",
    cost: "Free",
    verdict:
      "Builds the intuition for derivatives and integrals that most textbooks never give — the chain rule visualisation alone is worth the series.",
    useIf:
      "You want to understand what derivatives actually are before applying them in gradient descent and backpropagation.",
    stages: ["mathematics", "data-scientist"],
    rankInTopic: 2,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "mit-1806",
    title: "MIT 18.06 Linear Algebra",
    author: "Gilbert Strang / MIT OpenCourseWare",
    url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
    type: "Course",
    level: "Competent",
    cost: "Free",
    verdict:
      "The canonical linear algebra course — Strang's lectures are legendary and the exercises are genuinely instructive; this is the course that makes linear algebra click.",
    useIf:
      "You need rigorous linear algebra — eigendecompositions, SVD, projections — for ML applications; 3Blue1Brown gives intuition, Strang gives tools.",
    stages: ["mathematics", "data-scientist"],
    rankInTopic: 3,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "convex-optimisation",
    title: "Convex Optimization",
    author: "Stephen Boyd & Lieven Vandenberghe",
    year: 2004,
    url: "https://web.stanford.edu/~boyd/cvxbook/",
    type: "Book",
    level: "Expert",
    cost: "Free",
    verdict:
      "The optimisation reference — comprehensive, mathematically rigorous, and free; most practitioners need chapters 1–5; researchers need the rest.",
    useIf:
      "You want to understand why gradient descent works, when it does not, and what the theory of convex optimisation actually says.",
    stages: ["mathematics", "research"],
    rankInTopic: 4,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
  {
    id: "stat110",
    title: "Introduction to Probability / Harvard Stat 110",
    author: "Joseph Blitzstein & Jessica Hwang",
    url: "https://projects.iq.harvard.edu/stat110",
    type: "Course",
    level: "Competent",
    cost: "Free",
    verdict:
      "The best probability course and textbook combination — Blitzstein's lectures are the clearest treatment of conditioning, distributions, and Bayes available for free.",
    useIf:
      "You need to build a solid probability foundation for machine learning — or you are headed toward research and need probability to be second nature.",
    stages: ["mathematics", "data-analyst", "data-scientist"],
    rankInTopic: 5,
    lastReviewed: "2026-06-11",
    needsReview: false,
  },
];

// Validate all entries at module load time — a bad entry fails the build.
export const resources: Resource[] = validateResources(_raw);

// ── Helpers ─────────────────────────────────────────────────────────────────

export function getResourcesByStage(
  stage: Resource["stages"][number],
): Resource[] {
  return resources
    .filter((r) => r.stages.includes(stage))
    .sort((a, b) => a.rankInTopic - b.rankInTopic);
}

export function getResourcesByType(
  stage: Resource["stages"][number],
  type: Resource["type"],
): Resource[] {
  return getResourcesByStage(stage).filter((r) => r.type === type);
}
