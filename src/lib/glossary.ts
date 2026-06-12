/**
 * Glossary data — every term used across Praxia stages, defined in plain
 * English in the site's own words. No copied text. Terms link back to the
 * stage or section where they first appear substantively.
 *
 * Organised A–Z. Each entry carries a `stage` anchor for deep-linking from
 * stage pages.
 */

export type GlossaryTerm = {
  term: string;
  definition: string;
  /** Where the concept is first used or explained in depth. */
  learnMore?: { label: string; href: string };
};

export const glossaryTerms: GlossaryTerm[] = [
  // ── A ─────────────────────────────────────────────────────────────────────
  {
    term: "A/B test",
    definition:
      "A controlled experiment that exposes two groups — control (A) and treatment (B) — to different versions of something (a design, a model, a recommendation) to measure whether a change causes a meaningful difference in the outcome you care about. The key word is 'causes': proper randomisation is what makes A/B testing the gold standard for causal inference in live systems.",
    learnMore: {
      label: "Data Analyst — experiment design",
      href: "/data-analyst#project",
    },
  },
  {
    term: "Ablation study",
    definition:
      "An experiment that removes one component of a system at a time to find out which component is responsible for a result. In ML research, a paper that reports a headline improvement but no ablations cannot tell you whether the gain came from the architecture, the training recipe, the data, or the random seed. Ablations are how honest researchers isolate their claims.",
    learnMore: { label: "Research Track", href: "/research#core-skills" },
  },
  {
    term: "Agent (AI)",
    definition:
      "An LLM that is given tools — web search, code execution, API calls, memory — and asked to complete a goal by deciding which tools to use and when, rather than answering a single prompt. The challenge is reliability: agents can fail silently, loop, or hallucinate actions, so robust production agents require careful error-handling, logging, and human-in-the-loop checkpoints.",
    learnMore: {
      label: "AI Engineer — agents",
      href: "/ai-engineer#core-concepts",
    },
  },
  {
    term: "Algorithm",
    definition:
      "A finite, unambiguous sequence of steps that produces a result for any valid input. The word is overused in popular culture; in computing it means something precise: a recipe that terminates, always, and gives the right answer when followed correctly.",
    learnMore: { label: "Foundations", href: "/foundations#core-concepts" },
  },
  {
    term: "ANOVA (Analysis of Variance)",
    definition:
      "A hypothesis test that checks whether the means of three or more groups differ more than chance alone can explain. It does this by comparing the variance between groups to the variance within groups — if the ratio (the F-statistic) is large enough, the null hypothesis of equal means is rejected. A significant F tells you some groups differ; it does not tell you which ones — a post-hoc test (Tukey, Bonferroni) is required for that.",
    learnMore: {
      label: "Data Analyst — core concepts",
      href: "/data-analyst#core-concepts",
    },
  },
  {
    term: "API (Application Programming Interface)",
    definition:
      "A defined contract for how one piece of software talks to another. An API says: send me this request in this format and I will send back this response. HTTP APIs (REST and GraphQL) are how most data sources, cloud services, and ML model providers expose their capabilities. Knowing how to read API documentation and call one from Python is a Foundations-level skill.",
    learnMore: { label: "Foundations — tools", href: "/foundations#tools" },
  },
  {
    term: "arXiv",
    definition:
      "A free, open-access preprint server where researchers in physics, mathematics, computer science, and AI post papers before (or instead of) journal publication. Most landmark ML papers — including the Transformer — appeared on arXiv first. Reading arXiv is how practitioners stay current; it is also where you will find papers that never survived peer review, so critical reading is essential.",
    learnMore: { label: "Research Track", href: "/research#resources" },
  },

  // ── B ─────────────────────────────────────────────────────────────────────
  {
    term: "Backpropagation",
    definition:
      "The algorithm for computing how much each weight in a neural network contributed to the output error — the gradient of the loss with respect to every parameter. It works by applying the chain rule of calculus from the output layer backwards to the input layer. Without backpropagation there is no efficient way to train deep networks; it is why deep learning became practical.",
    learnMore: {
      label: "Data Scientist — neural networks",
      href: "/data-scientist#core-concepts",
    },
  },
  {
    term: "Bayesian inference",
    definition:
      "A framework for updating beliefs in the light of evidence. You start with a prior (your belief before seeing data), observe data, and multiply by the likelihood (how probable the data is under each possible hypothesis) to get a posterior (your updated belief). Bayesian inference gives you a full distribution over hypotheses — not a yes/no decision — which is both more information and harder to misinterpret than a p-value.",
    learnMore: {
      label: "Mathematics — probability",
      href: "/mathematics#probability-statistics",
    },
  },
  {
    term: "Benchmark",
    definition:
      "A standardised test or dataset used to measure and compare the performance of models or systems. Benchmarks are the currency of ML research — they make results comparable across papers. The problem is that benchmarks become targets: models are increasingly trained on or optimised for them, which inflates apparent progress. A result on a well-known benchmark is evidence of capability; a result on an in-distribution test that was not held out is not.",
    learnMore: { label: "Research Track", href: "/research#core-skills" },
  },
  {
    term: "Benjamini-Hochberg procedure",
    definition:
      "A method for controlling the false discovery rate (FDR) when running multiple statistical tests simultaneously. It sorts p-values from smallest to largest, compares each to a threshold that scales with the test's rank, and calls significant every test below the threshold at which the procedure would still hold. Less conservative than Bonferroni (which controls family-wise error rate) — it allows more true positives at the cost of a controlled proportion of false positives.",
    learnMore: {
      label: "Data Analyst — core concepts",
      href: "/data-analyst#core-concepts",
    },
  },
  {
    term: "Bias-variance tradeoff",
    definition:
      "The fundamental tension in supervised learning: a model that is too simple (high bias) fails to capture the signal in the training data and underfits; a model that is too complex (high variance) captures the noise in the training data and overfits, performing well in-sample but poorly out-of-sample. Bias and variance move in opposite directions as model complexity increases; the art of model selection is finding the complexity level where their sum — the total error — is minimised.",
    learnMore: {
      label: "Data Scientist — core concepts",
      href: "/data-scientist#core-concepts",
    },
  },
  {
    term: "Big-O notation",
    definition:
      "A way of describing how the running time or memory use of an algorithm scales with the size of the input. O(1) is constant — it takes the same time regardless of input size; O(n) is linear — it scales proportionally; O(n²) is quadratic — it grows with the square of the input. Big-O ignores constant factors and focuses on asymptotic behaviour, which is what matters at scale.",
    learnMore: {
      label: "Foundations — core concepts",
      href: "/foundations#core-concepts",
    },
  },

  // ── C ─────────────────────────────────────────────────────────────────────
  {
    term: "Calculus",
    definition:
      "The mathematics of change. Differential calculus studies how quantities change (derivatives, gradients) — the foundation of gradient descent and backpropagation. Integral calculus studies accumulated quantities and areas under curves — important in probability theory. For ML, the critical intuition is that a derivative tells you which way is 'downhill' on the loss surface, which is exactly what gradient descent uses to update model weights.",
    learnMore: {
      label: "Mathematics — calculus",
      href: "/mathematics#calculus-optimization",
    },
  },
  {
    term: "Central Limit Theorem (CLT)",
    definition:
      "The result that the distribution of the sample mean converges to a normal distribution as sample size grows, regardless of the population distribution — provided the population has finite variance. This is why normal distributions appear everywhere in statistics: not because the underlying data is normal, but because averages are. The CLT is the justification for most parametric tests.",
    learnMore: {
      label: "Data Analyst — mathematics",
      href: "/data-analyst#mathematics",
    },
  },
  {
    term: "Chi-square test",
    definition:
      "A hypothesis test for categorical data. The test of independence checks whether two categorical variables are associated (e.g., does job type predict salary band?). The goodness-of-fit test checks whether observed category frequencies match expected ones. The chi-square statistic measures the discrepancy between observed and expected counts; large discrepancy → small p-value → reject independence.",
    learnMore: {
      label: "Data Analyst — core concepts",
      href: "/data-analyst#core-concepts",
    },
  },
  {
    term: "CI/CD",
    definition:
      "Continuous Integration / Continuous Deployment — the practice of automatically building, testing, and deploying code every time a change is pushed. In ML engineering, CI/CD extends to model training pipelines: model quality is tested automatically (offline metrics, regression tests on held-out sets) before a new version can go to production. It is the engineering discipline that keeps production systems reliable.",
    learnMore: {
      label: "ML Engineer — tools",
      href: "/machine-learning-engineer#tools",
    },
  },
  {
    term: "Confidence interval",
    definition:
      "A range of values computed from sample data such that, if you repeated the entire study many times, the interval would contain the true population parameter in (say) 95% of repetitions. A common misreading: a 95% CI does NOT mean there is a 95% probability that the true value lies in this particular interval — the true value is fixed; it is the interval that varies. The interval is a property of the procedure, not of this specific result.",
    learnMore: {
      label: "Data Analyst — core concepts",
      href: "/data-analyst#core-concepts",
    },
  },
  {
    term: "Context window",
    definition:
      "The maximum number of tokens an LLM can read and produce in a single call — both the input (prompt) and the output count against the limit. Information outside the context window is not available to the model during generation. Larger context windows increase cost and can degrade generation quality as the model attends to more tokens; RAG is partly a strategy for surfacing relevant information without stuffing everything into the context.",
    learnMore: {
      label: "AI Engineer — core concepts",
      href: "/ai-engineer#core-concepts",
    },
  },
  {
    term: "Containerisation",
    definition:
      "Packaging an application — code, runtime, dependencies, and configuration — into a portable, isolated unit (a container) that runs identically regardless of where it is deployed. Docker is the standard tool; Kubernetes orchestrates containers at scale. In ML engineering, containerisation solves 'it works on my machine' for model training and serving: the training environment can be frozen and reproduced exactly.",
    learnMore: {
      label: "ML Engineer — tools",
      href: "/machine-learning-engineer#tools",
    },
  },
  {
    term: "Correlation",
    definition:
      "A measure of how strongly two variables move together. A correlation of +1 means they move perfectly in the same direction; -1 means perfectly opposite; 0 means no linear relationship. Correlation is not causation: two variables can be strongly correlated because a third variable drives both (confounding), because the relationship is coincidental, or because one causes the other — the number alone cannot distinguish these cases.",
    learnMore: {
      label: "Data Analyst — core concepts",
      href: "/data-analyst#core-concepts",
    },
  },
  {
    term: "Cross-validation",
    definition:
      "A technique for estimating how a model will perform on unseen data by training and evaluating it on multiple different splits of the training data. In k-fold cross-validation, the data is divided into k equal folds; the model is trained on k-1 folds and evaluated on the remaining fold, k times in total. The result is a more reliable performance estimate than a single train/validation split, at the cost of k times the training computation.",
    learnMore: {
      label: "Data Scientist — core concepts",
      href: "/data-scientist#core-concepts",
    },
  },

  // ── D ─────────────────────────────────────────────────────────────────────
  {
    term: "Data drift",
    definition:
      "The gradual change in the statistical properties of the data a deployed model receives, compared to the data it was trained on. Drift can come from seasonal patterns, user behaviour shifts, upstream data pipeline changes, or genuine real-world change. A model that does not account for drift quietly degrades — reported metrics stay the same but real-world performance falls. Drift detection is a core responsibility of production ML engineering.",
    learnMore: {
      label: "ML Engineer — core concepts",
      href: "/machine-learning-engineer#core-concepts",
    },
  },
  {
    term: "Derivative",
    definition:
      "The instantaneous rate of change of a function — how much the output changes for an infinitesimal change in the input. In machine learning, the gradient is a vector of partial derivatives (one per parameter), pointing in the direction of steepest increase in the loss function. Gradient descent moves in the opposite direction — downhill — to minimise the loss.",
    learnMore: {
      label: "Mathematics — calculus",
      href: "/mathematics#calculus-optimization",
    },
  },

  // ── E ─────────────────────────────────────────────────────────────────────
  {
    term: "Effect size",
    definition:
      "A measure of how large an effect is, independent of sample size. Cohen's d (for differences in means) and η² (for ANOVA) are common examples. Statistical significance tells you the effect probably exists; effect size tells you whether it is large enough to matter. A study with n = 10,000 can detect an effect so small it is practically meaningless — effect size is the check on this.",
    learnMore: {
      label: "Data Analyst — core concepts",
      href: "/data-analyst#core-concepts",
    },
  },
  {
    term: "Eigenvalue / eigenvector",
    definition:
      "For a square matrix A, an eigenvector is a vector v such that Av = λv — multiplying by A only scales the vector, never rotates it. The scalar λ is the corresponding eigenvalue, the scaling factor. Eigenvalues and eigenvectors capture the 'natural axes' of a linear transformation and appear throughout ML: in PCA (principal components are eigenvectors of the covariance matrix) and in understanding how information flows through neural networks.",
    learnMore: {
      label: "Mathematics — linear algebra",
      href: "/mathematics#linear-algebra",
    },
  },
  {
    term: "Embedding",
    definition:
      "A dense, fixed-length vector representation of a discrete object — a word, a sentence, an image, a user. Embeddings encode semantic similarity as geometric proximity: things that mean similar things end up close together in the vector space. In AI engineering, embedding models convert text to vectors for storage in a vector database; at retrieval time, a query is embedded and the closest vectors are returned.",
    learnMore: {
      label: "AI Engineer — core concepts",
      href: "/ai-engineer#core-concepts",
    },
  },
  {
    term: "Exploratory data analysis (EDA)",
    definition:
      "The practice of interrogating a dataset before fitting any model or running any formal test — plotting distributions, computing summary statistics, checking for missing values, identifying outliers, and looking for unexpected patterns. EDA is not optional warm-up; it is where the story in the data usually hides, and where the analyst discovers whether their assumptions hold before putting any statistical machinery into motion.",
    learnMore: {
      label: "Data Analyst — core concepts",
      href: "/data-analyst#core-concepts",
    },
  },

  // ── F ─────────────────────────────────────────────────────────────────────
  {
    term: "False discovery rate (FDR)",
    definition:
      "The expected proportion of rejected null hypotheses that are actually true — the rate of false positives among your significant results. Controlling the FDR is less stringent than controlling the family-wise error rate (FWER), which requires that no false positives occur at all. The Benjamini-Hochberg procedure controls the FDR at a specified level, giving more power when testing many hypotheses simultaneously.",
    learnMore: {
      label: "Data Analyst — core concepts",
      href: "/data-analyst#core-concepts",
    },
  },
  {
    term: "Feature",
    definition:
      "An input variable fed to a machine learning model — a column in your training data, a pixel value in an image, a word in a document. Feature engineering is the process of constructing better inputs from raw data: encoding categories, creating interaction terms, extracting embeddings, normalising numeric ranges. Good features often matter more than model choice.",
    learnMore: {
      label: "Data Scientist — core concepts",
      href: "/data-scientist#core-concepts",
    },
  },
  {
    term: "Feature store",
    definition:
      "A centralised system for storing, versioning, and serving features to training and inference pipelines. Without a feature store, teams recompute the same features multiple times, inconsistently — features computed offline for training may differ from those computed online for serving, causing training-serving skew. A feature store solves this by making a single, auditable feature definition the source of truth.",
    learnMore: {
      label: "ML Engineer — core concepts",
      href: "/machine-learning-engineer#core-concepts",
    },
  },
  {
    term: "Fine-tuning",
    definition:
      "Adapting a pre-trained model (one already trained on a large general corpus) to a specific task or domain by continuing to train it on a smaller, targeted dataset. Fine-tuning a foundation model is far more efficient than training from scratch — the pre-trained weights already encode general knowledge; fine-tuning teaches the model what matters in your specific context. LoRA and QLoRA are techniques for doing this efficiently with less compute.",
    learnMore: {
      label: "AI Engineer — core concepts",
      href: "/ai-engineer#core-concepts",
    },
  },
  {
    term: "Function",
    definition:
      "A named, reusable block of code that takes inputs (arguments), does something with them, and optionally returns an output. Functions are the primary unit of code organisation: they give you a name for a computation, let you reuse it without rewriting it, and make your code testable by isolating one piece of behaviour from the rest. Writing code in functions is the first and most important discipline in software craft.",
    learnMore: {
      label: "Foundations — core concepts",
      href: "/foundations#core-concepts",
    },
  },

  // ── G ─────────────────────────────────────────────────────────────────────
  {
    term: "Git",
    definition:
      "A distributed version control system that tracks every change to every file in a codebase, with the full history available locally. Git's branching model — where branches are lightweight, cheap, and mergeable — makes parallel development and collaborative work practical. Every project you build should be in a Git repository from the first commit.",
    learnMore: { label: "Foundations — tools", href: "/foundations#tools" },
  },
  {
    term: "Gradient descent",
    definition:
      "An iterative optimisation algorithm that minimises a loss function by repeatedly moving parameters in the direction of steepest descent — the negative gradient. The step size (learning rate) controls how far to move each iteration: too large and it overshoots; too small and it converges slowly. Stochastic gradient descent (SGD) estimates the gradient from a random mini-batch of data rather than the full dataset, making each step much faster.",
    learnMore: {
      label: "Mathematics — optimisation",
      href: "/mathematics#calculus-optimization",
    },
  },

  // ── H ─────────────────────────────────────────────────────────────────────
  {
    term: "Hallucination",
    definition:
      "When an LLM generates text that is confident, fluent, and factually wrong — inventing citations, misquoting real documents, stating incorrect facts. Hallucinations arise because LLMs are trained to predict plausible next tokens, not to retrieve verified facts. They are not bugs to be patched; they are a consequence of the architecture. Mitigating them requires grounding (RAG), output verification, and not deploying LLMs in contexts where confident errors are catastrophic.",
    learnMore: {
      label: "AI Engineer — core concepts",
      href: "/ai-engineer#core-concepts",
    },
  },
  {
    term: "Hypothesis test",
    definition:
      "A formal procedure for deciding, from data, whether an observed effect is compatible with chance or whether it is real. You state a null hypothesis (e.g., 'the two groups have equal means'), compute a test statistic from the data, and check whether the statistic is extreme enough to reject the null at a given significance level. The test does not tell you the effect is real; it tells you the data is unlikely under the null.",
    learnMore: {
      label: "Data Analyst — core concepts",
      href: "/data-analyst#core-concepts",
    },
  },

  // ── I ─────────────────────────────────────────────────────────────────────
  {
    term: "Inference (ML)",
    definition:
      "Running a trained model on new inputs to produce predictions. Distinct from training: training is expensive, runs offline, and updates model weights; inference is what happens in production, potentially millions of times per day, and must be fast. Latency (time per prediction) and throughput (predictions per second) are the two key metrics of an inference system.",
    learnMore: {
      label: "ML Engineer — core concepts",
      href: "/machine-learning-engineer#core-concepts",
    },
  },

  // ── L ─────────────────────────────────────────────────────────────────────
  {
    term: "Label",
    definition:
      "The output variable a supervised learning model is trained to predict. In a spam classifier, the label is 'spam' or 'not spam'. In a house price predictor, the label is the sale price. Labels come from human annotation, historical records, or system logs. Label quality is often the binding constraint on model quality: a model cannot learn what the label does not capture.",
    learnMore: {
      label: "Data Scientist — core concepts",
      href: "/data-scientist#core-concepts",
    },
  },
  {
    term: "Large language model (LLM)",
    definition:
      "A neural network — almost always a transformer — trained on enormous amounts of text to predict the next token. At sufficient scale, this simple objective produces models capable of reasoning, translation, code generation, and question answering. LLMs do not store facts in a retrievable database; they encode statistical patterns in billions of parameters, which is why they can both synthesise and hallucinate.",
    learnMore: {
      label: "AI Engineer — core concepts",
      href: "/ai-engineer#core-concepts",
    },
  },
  {
    term: "Linear algebra",
    definition:
      "The mathematics of vectors, matrices, and linear transformations. In ML, data is represented as vectors and matrices, computations are matrix multiplications, and neural network layers are linear transformations followed by nonlinearities. Understanding linear algebra — not just the mechanics but the geometric intuition — is essential for reasoning about what a model is doing to its inputs.",
    learnMore: {
      label: "Mathematics — linear algebra",
      href: "/mathematics#linear-algebra",
    },
  },
  {
    term: "Literature survey",
    definition:
      "The systematic process of finding, reading, and synthesising the relevant prior work before starting a research project. A literature survey answers: what has already been done, what methods were used, what gaps remain, and what your contribution will add. A research question that has already been answered well is not a research question. The survey is how you find out.",
    learnMore: { label: "Research Track", href: "/research#core-skills" },
  },
  {
    term: "LoRA / QLoRA",
    definition:
      "Low-Rank Adaptation (LoRA) is a fine-tuning technique that freezes most model weights and adds small, trainable low-rank matrices to specific layers. This reduces the number of trainable parameters by 99%+ while preserving most of the adaptation signal. QLoRA extends LoRA to quantised (4-bit) model weights, enabling fine-tuning of very large models on consumer-grade hardware.",
    learnMore: {
      label: "AI Engineer — core concepts",
      href: "/ai-engineer#core-concepts",
    },
  },
  {
    term: "Loss function",
    definition:
      "A function that measures how wrong a model's predictions are — the gap between predicted outputs and true labels. Gradient descent minimises the loss by updating model parameters. Common choices: mean squared error for regression, cross-entropy for classification. The choice of loss function encodes what you care about: a loss that penalises large errors heavily will produce a very different model from one that treats all errors equally.",
    learnMore: {
      label: "Data Scientist — core concepts",
      href: "/data-scientist#core-concepts",
    },
  },

  // ── M ─────────────────────────────────────────────────────────────────────
  {
    term: "Matrix",
    definition:
      "A rectangular grid of numbers organised in rows and columns. Matrices represent linear transformations: multiplying a vector by a matrix transforms it into a new vector. In ML, weight matrices define what each layer of a neural network does to its inputs. Matrix multiplication is the dominant computational operation in deep learning — it is what GPUs are optimised to perform in parallel.",
    learnMore: {
      label: "Mathematics — linear algebra",
      href: "/mathematics#linear-algebra",
    },
  },
  {
    term: "Maximum likelihood estimation (MLE)",
    definition:
      "A method for estimating the parameters of a probability model by choosing the values that make the observed data most probable. For a given model (e.g., a Gaussian distribution), MLE asks: which mean and standard deviation would have made it most likely to observe these exact data points? The MLE solution for a Gaussian is the sample mean and sample variance — which is why these are the 'natural' estimates.",
    learnMore: {
      label: "Mathematics — probability",
      href: "/mathematics#probability-statistics",
    },
  },
  {
    term: "MLOps",
    definition:
      "The set of practices for deploying, monitoring, and maintaining machine learning models in production reliably and efficiently. MLOps extends DevOps principles — automation, versioning, continuous integration — to cover the full ML lifecycle: data pipelines, training, evaluation, deployment, monitoring, and retraining. The key insight is that a trained model is not a product; a production ML system is.",
    learnMore: {
      label: "ML Engineer — core concepts",
      href: "/machine-learning-engineer#core-concepts",
    },
  },
  {
    term: "Model monitoring",
    definition:
      "Ongoing measurement of a deployed model's behaviour and outputs — performance metrics, prediction distributions, input feature distributions, latency, error rates. Monitoring detects data drift, model degradation, and infrastructure failures before they become business incidents. A model without monitoring is a model you cannot trust.",
    learnMore: {
      label: "ML Engineer — core concepts",
      href: "/machine-learning-engineer#core-concepts",
    },
  },
  {
    term: "Multiple comparison correction",
    definition:
      "A statistical adjustment applied when running many hypothesis tests simultaneously to control the rate of false positives. If you run 20 tests at α = 0.05, you expect roughly one false positive by chance alone, even if nothing is real. Corrections like Bonferroni (divide α by the number of tests) or Benjamini-Hochberg (control the false discovery rate) adjust the threshold so the overall error rate stays honest.",
    learnMore: {
      label: "Data Analyst — core concepts",
      href: "/data-analyst#core-concepts",
    },
  },

  // ── N ─────────────────────────────────────────────────────────────────────
  {
    term: "Neural network",
    definition:
      "A computational model loosely inspired by the brain — layers of numerical units (neurons) connected by learnable weights, each layer applying a linear transformation followed by a nonlinearity. By stacking many such layers, neural networks can learn complex, hierarchical representations. They are the architectural backbone of modern deep learning, from image classifiers to LLMs.",
    learnMore: {
      label: "Data Scientist — core concepts",
      href: "/data-scientist#core-concepts",
    },
  },
  {
    term: "Null hypothesis",
    definition:
      "The default assumption in a hypothesis test — usually 'there is no effect' or 'the groups have equal means'. The test is designed to check whether the data provides enough evidence to reject this default. You never prove the null hypothesis true; you either reject it or fail to reject it. Failing to reject is not evidence that the null is correct — it may simply reflect insufficient statistical power.",
    learnMore: {
      label: "Data Analyst — core concepts",
      href: "/data-analyst#core-concepts",
    },
  },

  // ── O ─────────────────────────────────────────────────────────────────────
  {
    term: "Optimisation",
    definition:
      "The process of finding the inputs that minimise (or maximise) a function. In ML, optimisation means finding model parameters that minimise the training loss. Gradient descent and its variants (Adam, AdaGrad, RMSProp) are the primary optimisation algorithms. The loss landscape is high-dimensional and non-convex; modern optimisers reach good local minima reliably in practice, even if global optimality is not guaranteed.",
    learnMore: {
      label: "Mathematics — optimisation",
      href: "/mathematics#calculus-optimization",
    },
  },
  {
    term: "Overfitting",
    definition:
      "When a model learns the training data so well that it memorises noise and idiosyncrasies specific to the training set, performing poorly on new data. Overfitting is the central failure mode of supervised learning — a model that overfits has high variance: its performance depends too heavily on the particular training examples it saw. Regularisation, dropout, early stopping, and cross-validation are the primary mitigations.",
    learnMore: {
      label: "Data Scientist — core concepts",
      href: "/data-scientist#core-concepts",
    },
  },

  // ── P ─────────────────────────────────────────────────────────────────────
  {
    term: "p-value",
    definition:
      "The probability of observing data at least as extreme as what you observed, assuming the null hypothesis is true. A small p-value means the data is surprising under the null — it is evidence against the null, not evidence for the alternative. Common misreadings: a p-value is not the probability the null is false, not the probability the result is real, and not a measure of effect size. p < 0.05 is a threshold convention, not a law of nature.",
    learnMore: {
      label: "Data Analyst — core concepts",
      href: "/data-analyst#core-concepts",
    },
  },
  {
    term: "Peer review",
    definition:
      "The process by which submitted academic papers are evaluated by independent experts in the field before publication. Reviewers assess the validity of the methods, the significance of the contribution, and the quality of the writing. Peer review is imperfect — it does not catch all errors and can be slow — but it is still the primary quality filter for scientific claims. A result posted on arXiv is not peer-reviewed; a result in a top venue has been, though 'peer-reviewed' is not a synonym for 'correct'.",
    learnMore: { label: "Research Track", href: "/research#core-skills" },
  },
  {
    term: "Power analysis",
    definition:
      "A calculation performed before an experiment to determine the sample size required to detect an effect of a specified size at a given significance level and power. Statistical power is the probability of correctly rejecting a false null hypothesis; 0.80 is the conventional minimum. Underpowered studies — those with insufficient sample sizes — reliably miss real effects and are a primary driver of the reproducibility crisis.",
    learnMore: {
      label: "Data Analyst — project",
      href: "/data-analyst#project",
    },
  },
  {
    term: "Pre-registration",
    definition:
      "The practice of publicly committing to hypotheses, analysis plans, and stopping rules before collecting or analysing data. Pre-registration prevents hypothesis-after-results (HARKing) and p-hacking — the data-torturing that produces spurious 'significant' findings. The Open Science Framework hosts free, public pre-registrations. Pre-registering your analysis and reporting results exactly as planned — including null results — is how you build a trustworthy analytical reputation.",
    learnMore: {
      label: "Data Analyst — project",
      href: "/data-analyst#project",
    },
  },
  {
    term: "Probability distribution",
    definition:
      "A function that describes the relative likelihood of each possible outcome of a random variable. For discrete variables (coin flips, dice rolls), it is a list of probabilities that sum to one. For continuous variables (heights, temperatures), it is a density function where probabilities correspond to areas under the curve. Key distributions in ML and statistics: Normal, Bernoulli, Binomial, Poisson, t, chi-square, F, Beta, Dirichlet.",
    learnMore: {
      label: "Mathematics — probability",
      href: "/mathematics#probability-statistics",
    },
  },
  {
    term: "Prompt engineering",
    definition:
      "The practice of crafting inputs (prompts) to language models to elicit the outputs you want. Zero-shot prompting gives instructions alone; few-shot prompting includes examples; chain-of-thought prompting asks the model to reason step-by-step before answering. The name sounds simpler than it is: well-engineered prompts can dramatically change output quality, reliability, and safety.",
    learnMore: {
      label: "AI Engineer — core concepts",
      href: "/ai-engineer#core-concepts",
    },
  },

  // ── R ─────────────────────────────────────────────────────────────────────
  {
    term: "Regularisation",
    definition:
      "Techniques that constrain model complexity during training to reduce overfitting. L2 regularisation (Ridge) penalises the sum of squared weights, shrinking them towards zero. L1 regularisation (Lasso) penalises the sum of absolute weights, producing sparse solutions where many weights become exactly zero. Both add a penalty term to the loss function; stronger regularisation means a simpler model with potentially worse fit to training data but better generalisation.",
    learnMore: {
      label: "Data Scientist — core concepts",
      href: "/data-scientist#core-concepts",
    },
  },
  {
    term: "Reproducibility",
    definition:
      "The property that the same analysis, run on the same data with the same tools, produces the same results. In data analysis: a notebook that runs clean from top to bottom, every time. In ML research: a model that hits the reported benchmark when trained with the released code and weights. Reproducibility is the minimum bar for honest scientific work; in practice, many published results fail it.",
    learnMore: { label: "Research Track", href: "/research#core-skills" },
  },
  {
    term: "Reproducibility crisis",
    definition:
      "The discovery, across multiple scientific fields including ML and psychology, that a substantial proportion of published findings cannot be reproduced by independent researchers. Causes include selective reporting (only significant results get published), p-hacking, underpowered studies, undisclosed flexibility in analysis, and simple errors. The crisis is not a reason to distrust science; it is a reason to read every result with appropriate scepticism and to value pre-registered, well-powered studies over exploratory ones.",
    learnMore: { label: "Research Track", href: "/research#core-skills" },
  },
  {
    term: "Retrieval-augmented generation (RAG)",
    definition:
      "An architecture that improves LLM outputs by retrieving relevant documents from an external knowledge base at query time and including them in the prompt context. The model generates its answer based on the retrieved context rather than relying on weights alone. RAG reduces hallucinations on factual questions, allows models to reference up-to-date information, and makes sources auditable. Failure modes include poor retrieval (wrong documents), context stuffing (too many irrelevant chunks), and reranking errors.",
    learnMore: {
      label: "AI Engineer — core concepts",
      href: "/ai-engineer#core-concepts",
    },
  },

  // ── S ─────────────────────────────────────────────────────────────────────
  {
    term: "SQL",
    definition:
      "Structured Query Language — the standard language for querying and manipulating data in relational databases. SQL is how the majority of enterprise and production data is accessed. Basic SQL (SELECT, WHERE, GROUP BY, JOIN) is a Foundations skill; window functions (ROW_NUMBER, LAG, running totals) and CTEs are the analytics upgrade that separates fluent practitioners from beginners.",
    learnMore: { label: "Foundations — tools", href: "/foundations#tools" },
  },
  {
    term: "Statistical significance",
    definition:
      "The conclusion that an observed effect is unlikely to be due to chance alone, at a chosen significance level (typically α = 0.05). An effect is statistically significant if the p-value is below the threshold. Statistical significance is not the same as practical significance — a study with a very large sample can detect effects too small to matter; a study with a small sample may miss effects large enough to be important. Always pair significance with an effect size.",
    learnMore: {
      label: "Data Analyst — core concepts",
      href: "/data-analyst#core-concepts",
    },
  },
  {
    term: "Supervised learning",
    definition:
      "A category of machine learning in which the model is trained on examples that each pair an input with the correct output (the label). The model learns to map inputs to outputs by minimising its error on the training examples. Classification (predicting a category) and regression (predicting a continuous value) are both supervised learning tasks.",
    learnMore: {
      label: "Data Scientist — core concepts",
      href: "/data-scientist#core-concepts",
    },
  },

  // ── T ─────────────────────────────────────────────────────────────────────
  {
    term: "t-test",
    definition:
      "A hypothesis test for comparing means: the one-sample t-test checks whether a sample mean differs from a reference value; the two-sample t-test checks whether two groups have different means. It assumes the data are approximately normally distributed (or the sample is large enough for the CLT to apply). The test statistic is the difference in means divided by the standard error — a ratio of signal to noise.",
    learnMore: {
      label: "Data Analyst — core concepts",
      href: "/data-analyst#core-concepts",
    },
  },
  {
    term: "Tokenisation",
    definition:
      "The process of converting raw text into the integer tokens that an LLM operates on. Modern LLMs use subword tokenisation (e.g. Byte Pair Encoding or SentencePiece): common words become single tokens; rare words are split into multiple subword tokens. Tokenisation is not just preprocessing — it determines what the model 'sees', affects arithmetic reasoning (numbers split into digits), and creates failure modes when assumptions about character-level content don't hold.",
    learnMore: {
      label: "AI Engineer — core concepts",
      href: "/ai-engineer#core-concepts",
    },
  },
  {
    term: "Transformer",
    definition:
      "The neural network architecture introduced in 'Attention Is All You Need' (Vaswani et al., 2017) that underpins almost all large language models. Its key mechanism is self-attention: every token attends to every other token in the context, allowing the model to capture long-range dependencies that recurrent architectures struggled with. The transformer enabled parallel training on GPUs, which is a key reason language modelling became tractable at large scale.",
    learnMore: {
      label: "AI Engineer — core concepts",
      href: "/ai-engineer#core-concepts",
    },
  },
  {
    term: "Training / validation / test split",
    definition:
      "The standard partitioning of a labelled dataset for supervised learning. The training set is used to fit the model; the validation set is used to tune hyperparameters and select the best model; the test set is used exactly once at the end to report an unbiased performance estimate. The test set must never be used during development — any decision informed by the test set, however indirectly, invalidates its independence.",
    learnMore: {
      label: "Data Scientist — core concepts",
      href: "/data-scientist#core-concepts",
    },
  },

  // ── U ─────────────────────────────────────────────────────────────────────
  {
    term: "Underfitting",
    definition:
      "When a model is too simple to capture the signal in the data — it has high bias and low variance, performing poorly on both training and test data. Underfitting is the opposite of overfitting and is usually easier to diagnose (training error is high). The fix is more model capacity, better features, or longer training.",
    learnMore: {
      label: "Data Scientist — core concepts",
      href: "/data-scientist#core-concepts",
    },
  },
  {
    term: "Unsupervised learning",
    definition:
      "A category of machine learning in which the model is trained on data without labels — the goal is to discover structure, patterns, or representations in the data itself. Clustering (grouping similar points) and dimensionality reduction (compressing data into fewer dimensions) are the canonical unsupervised tasks. Self-supervised learning — where the model generates its own supervisory signal from the input data — is the approach used to pre-train LLMs.",
    learnMore: {
      label: "Data Scientist — core concepts",
      href: "/data-scientist#core-concepts",
    },
  },

  // ── V ─────────────────────────────────────────────────────────────────────
  {
    term: "Variable",
    definition:
      "In programming: a named location in memory that stores a value, which can change over the course of a program. In statistics: a quantity that can take different values across observations (also called a feature or column in a dataset). The dual meaning is not a coincidence — both uses refer to something that varies — but the two should not be confused when reading code alongside statistical analyses.",
    learnMore: {
      label: "Foundations — core concepts",
      href: "/foundations#core-concepts",
    },
  },
  {
    term: "Vector",
    definition:
      "An ordered list of numbers. In linear algebra, vectors represent points in space or directions of movement. In ML, every data point is a vector (one number per feature), and the parameters of a model can be 'flattened' into a vector. The key geometric insight: distance between vectors corresponds to similarity; vectors close together represent similar things — the foundation of embedding-based retrieval.",
    learnMore: {
      label: "Mathematics — linear algebra",
      href: "/mathematics#linear-algebra",
    },
  },
  {
    term: "Vector database",
    definition:
      "A database optimised for storing and querying high-dimensional vectors by approximate nearest-neighbour search. Given a query vector, a vector database finds the vectors most similar to it (by cosine similarity or Euclidean distance) in milliseconds, even over millions of stored vectors. In RAG pipelines, document chunks are embedded and stored in a vector database; queries are embedded and the nearest chunks are retrieved as context.",
    learnMore: {
      label: "AI Engineer — core concepts",
      href: "/ai-engineer#core-concepts",
    },
  },
  {
    term: "Version control",
    definition:
      "A system for recording changes to files over time so you can recall any previous state, understand who changed what and when, and collaborate without overwriting each other's work. Git is the dominant version control system. For analytical work, version control is not optional — it is the only way to make your work reproducible and auditable after the fact.",
    learnMore: { label: "Foundations — tools", href: "/foundations#tools" },
  },
];
