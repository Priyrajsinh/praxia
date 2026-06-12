import type { Metadata } from "next";
import Link from "next/link";
import { getResourcesByStage } from "@/lib/resources";
import { validateTopics, validateStageMeta } from "@/lib/schema";
import { DepthLadder } from "@/components/stage/depth-ladder";
import { TopicChecklist } from "@/components/stage/topic-checklist";
import { ResourceGroups } from "@/components/stage/resource-group";
import { Marginalia } from "@/components/stage/marginalia";
import { StageSection } from "@/components/stage/stage-section";

export const metadata: Metadata = {
  title: "Machine Learning Engineer",
  description:
    "Stage 3 of the Praxia map — make models work reliably in production, at scale. Full curriculum: deep learning internals, MLOps, model serving, drift monitoring, and the production ML platform project.",
};

// ── Stage metadata (Zod-validated at build time) ───────────────────────────
const meta = validateStageMeta({
  title: "Machine Learning Engineer",
  identity: "You make models work reliably in production, at scale.",
  stageNumber: 3,
  slug: "ml-engineer",
  timeRange: "6–12 months from a Data Scientist base",
  prerequisites: [{ label: "Data Scientist", href: "/data-scientist" }],
  depthLadderPosition: 3,
});

// ── Core concepts (§7 section 3) — Zod-validated at build time ────────────
const topics = validateTopics([
  {
    concept: "The model-vs-system distinction",
    whyItMatters:
      "A great model in a bad system is a bad product. Understanding where the model ends and the system begins — data pipelines, serving infrastructure, monitoring, rollback — is the central conceptual shift at Stage 3.",
    depth: "Production",
  },
  {
    concept:
      "Software engineering for ML — typing, testing, design patterns, pre-commit discipline",
    whyItMatters:
      "Production ML code is maintained by teams over years. Code that works once in a notebook is not code that works reliably under load. The pre-commit stack (black, isort, flake8, mypy, bandit, pytest) is the floor, not the ceiling — and yes, it applies to training pipelines too.",
    depth: "Production",
  },
  {
    concept:
      "Data engineering — pipelines, ETL/ELT, feature stores, data validation",
    whyItMatters:
      "Models are only as good as the data they receive. A feature pipeline that produces corrupted inputs fails silently and makes the model look responsible. Data validation before the model sees anything is the ML equivalent of input sanitisation. Point-in-time correctness in feature computation prevents the most common form of training-serving skew.",
    depth: "Production",
  },
  {
    concept: "Neural networks and backpropagation — from first principles",
    whyItMatters:
      "The chain rule applied to a computational graph. You cannot debug a training run you do not understand — and the difference between a network that trains and one that does not usually comes down to gradient flow, initialisation, and numerical stability, none of which are accessible unless you know the mechanics.",
    depth: "Expert",
  },
  {
    concept: "Convolutional neural networks (CNNs)",
    whyItMatters:
      "The architecture that made deep learning work on images — and the principle (local connectivity, weight sharing, translation invariance) that applies broadly to any spatially structured data. Understanding the convolution operation, pooling, and receptive fields is what lets you adapt the architecture when the default does not work.",
    depth: "Production",
  },
  {
    concept: "Recurrent networks — RNNs, LSTMs, GRUs",
    whyItMatters:
      "Sequence models before transformers — still used in production time series and event-sequence systems. Understanding vanishing gradients and gating mechanisms explains why transformers replaced recurrence and when LSTMs are still the right choice (low-latency streaming, very long sequences without a GPU budget).",
    depth: "Competent",
  },
  {
    concept: "Attention mechanisms and transformers",
    whyItMatters:
      "The architecture that now underlies virtually every state-of-the-art model in NLP, vision, and time series. Attention solves the information bottleneck of recurrence by allowing every position to attend directly to every other. Understanding this from the matrix-multiply level — scaled dot-product attention, Q/K/V projections, multi-head — is non-negotiable at Stage 3.",
    depth: "Expert",
  },
  {
    concept: "Training at scale — GPUs, mixed precision, distributed training",
    whyItMatters:
      "Mixed-precision training (FP16/BF16 with gradient scaling), gradient accumulation, and data parallelism are the techniques that make large models tractable. Understanding when each applies and what can go wrong — gradient overflow in FP16, communication bottlenecks in multi-GPU setups — is the practical engineering skill.",
    depth: "Production",
  },
  {
    concept:
      "MLOps — experiment tracking, model registry, CI/CD for ML, reproducibility",
    whyItMatters:
      "Models can degrade silently; experiments are expensive to re-run; 'it worked last week' is not a reproducibility guarantee. MLOps applies software engineering rigour to these problems specifically. Every experiment logged, every model version tracked, every result reproducible from the configuration.",
    depth: "Production",
  },
  {
    concept:
      "Model serving — REST and gRPC APIs, batch vs real-time, latency and throughput",
    whyItMatters:
      "A model that cannot be called is a model that cannot be used. Serving adds requirements that training does not: low latency, high throughput, graceful failure, model versioning, and rollback in seconds. The correct architecture (synchronous API, async batch, streaming) depends entirely on the latency and throughput budget.",
    depth: "Production",
  },
  {
    concept:
      "Monitoring — data drift, concept drift, PSI, KS tests, performance decay",
    whyItMatters:
      "Production models decay. Input distributions shift away from training data over weeks; prediction quality falls without raising an exception. Population Stability Index (PSI) and the Kolmogorov-Smirnov test are the standard statistical tools for detecting this shift before it becomes a business problem.",
    depth: "Production",
  },
  {
    concept: "Containers — Docker; orchestration — Kubernetes basics",
    whyItMatters:
      "A containerised model runs identically on a developer's laptop and a cloud GPU cluster. Kubernetes orchestrates those containers at scale: rolling updates, resource limits, health checks. The awareness-to-competent range is the realistic Stage 3 target; deep Kubernetes expertise belongs in platform engineering.",
    depth: "Production",
  },
  {
    concept:
      "Cloud platforms — AWS SageMaker / GCP Vertex AI; infrastructure as code with Terraform",
    whyItMatters:
      "Production ML lives in the cloud. SageMaker and Vertex AI abstract the infrastructure for training and serving at scale; Terraform describes that infrastructure as code so it is reproducible, version-controlled, and auditable. The ability to provision, update, and tear down a deployment cleanly is table stakes.",
    depth: "Competent",
  },
  {
    concept: "Security, privacy, and cost engineering",
    whyItMatters:
      "An ML system that leaks training data violates GDPR and destroys trust. Cost engineering — understanding the GPU-hour implications of model size and the inference-cost trade-off between latency and throughput — separates the engineer from the researcher in a production context.",
    depth: "Competent",
  },
]);

// ── Resources for this stage (from single source of truth) ─────────────────
const stageResources = getResourcesByStage("ml-engineer");

// ══════════════════════════════════════════════════════════════════════════════

export default function MLEngineerPage() {
  return (
    <article>
      {/* ── §7 SECTION 1: Stage header ──────────────────────────────────── */}
      <header className="mb-2">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-faded-ink">
          Stage {meta.stageNumber}
          <span aria-hidden="true"> · </span>
          {meta.timeRange}
        </p>

        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {meta.title}
        </h1>

        <p className="mt-3 max-w-prose font-body text-xl leading-relaxed text-faded-ink">
          {meta.identity}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <span className="font-mono text-xs text-faded-ink uppercase tracking-wider">
            Prerequisites:
          </span>
          {meta.prerequisites.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded border border-margin bg-card px-2.5 py-1 font-mono text-xs text-ink hover:border-brass transition-colors"
            >
              ← {p.label}
            </Link>
          ))}
        </div>

        <div className="mt-5">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-faded-ink">
            Target depth at this stage
          </p>
          <DepthLadder position={meta.depthLadderPosition} />
        </div>
      </header>

      {/* ── §7 SECTION 2: What this role actually does ──────────────────── */}
      <StageSection id="what-it-does" title="What this role actually does">
        <p>
          The machine learning engineer&rsquo;s job is to take a model that
          works and make it a system that works — reliably, at scale, for
          months. Not to discover the model. Not to conduct the experiments. To
          ship it: containerised, monitored, reproducible, and maintainable by a
          team that did not build it. That is a harder problem than it sounds.
        </p>

        <p>
          Day-to-day: reviewing a training job at 9am (a gradient explosion
          flagged at step 4,000 overnight), debugging a serving latency
          regression at 11, writing a data-validation schema at 1pm, reviewing a
          PR for a new feature pipeline at 3, designing the monitoring spec for
          next week&rsquo;s model rollout at 4. The skill is not any single
          tool. It is the systems thinking that knows when the problem is in the
          data, when it is in the model, and when it is in the infrastructure.
        </p>

        <Marginalia>
          Every production ML failure I have seen traced to one of three things:
          silent data drift, training-serving skew, or no rollback plan. The MLE
          who has a monitoring strategy before the model ships is the one who
          doesn&rsquo;t get paged at 2am.
        </Marginalia>

        <p>
          <strong>Where this role sits relative to its neighbours.</strong> The
          ML engineer is not a data scientist. The data scientist owns
          correctness — the model&rsquo;s statistical properties, evaluation
          protocol, and interpretability. The MLE owns reliability — the
          system&rsquo;s uptime, latency, drift detection, and retraining
          cadence. In small teams these roles merge; in mature ML organisations
          they do not. The handoff point — a well-specified model with a
          documented evaluation protocol and feature contracts — is where
          misalignments cause production failures.
        </p>

        <p>
          The ML engineer is also not a software engineer who happens to deploy
          models. Deep learning internals matter here. The MLE who does not
          understand backpropagation cannot diagnose a failing training run. The
          one who does not understand attention cannot optimise a transformer
          serving pipeline. Stage 3 builds on Stage 2 fully — and extends it
          upward into systems engineering and downward into lower-level model
          mechanics.
        </p>

        <p>
          <strong>
            The deepest skill here is not technical: it is treating a trained
            model as a liability until it is monitored.
          </strong>{" "}
          A model in production is not done when it is deployed; it is done when
          there is a process for detecting when it has gone wrong, reverting to
          the last good version, and retraining on fresh data. Most production
          ML failures are not model failures — they are monitoring failures.
        </p>
      </StageSection>

      {/* ── §7 SECTION 3: Core concepts ─────────────────────────────────── */}
      <StageSection id="core-concepts" title="Core concepts to master">
        <p className="mb-5 text-faded-ink text-sm">
          Depth tags:{" "}
          <span className="font-mono text-xs uppercase">Competent</span> = can
          do independently,{" "}
          <span className="inline-flex items-center rounded border border-route-red/20 bg-route-red/10 px-1.5 py-0.5 font-mono text-xs uppercase text-ink">
            Production
          </span>{" "}
          = reliable under pressure,{" "}
          <span className="inline-flex items-center rounded border border-teal/20 bg-teal/10 px-1.5 py-0.5 font-mono text-xs uppercase text-ink">
            Expert
          </span>{" "}
          = can teach it and debug edge cases.
        </p>
        <p className="mb-5 text-xs text-faded-ink">
          Unfamiliar with a term? <Link href="/glossary">The glossary</Link>{" "}
          defines every concept used across the map.
        </p>
        <TopicChecklist topics={topics} />
      </StageSection>

      {/* ── §7 SECTION 4: Mathematics ───────────────────────────────────── */}
      <StageSection id="mathematics" title="Mathematics required">
        <h3>Minimum — what you must understand to work in this role</h3>

        <p>
          <strong>
            Linear algebra and calculus — carried forward from Stage 2, now
            applied at scale.
          </strong>{" "}
          Every neural network forward pass is a sequence of matrix multiplies
          and non-linearities. Every backward pass is gradient computation via
          the chain rule through those same operations. You do not need new
          mathematics here — you need the Stage 2 mathematics applied to larger,
          more deeply composed functions.
        </p>

        <p>
          <strong>Backpropagation as a computation-graph operation.</strong> The
          forward pass builds a graph of operations; the backward pass traverses
          it in reverse, accumulating gradients via the chain rule at each node.
          Understanding this at the implementation level — not just the concept
          — is what lets you debug vanishing gradients, exploding gradients, and
          incorrect gradient flow through custom layers.
        </p>

        <p>
          <strong>
            Optimisation — SGD, Adam, learning-rate schedules, gradient
            clipping, numerical stability.
          </strong>{" "}
          Adam maintains per-parameter adaptive learning rates using the first
          and second moments of the gradient. Cosine decay and warmup schedules
          are the default for transformer training. Gradient clipping prevents a
          single large update from destabilising an otherwise healthy training
          run. Knowing
          <em> why</em> these exist — and what goes wrong without them — is the
          practical skill.
        </p>

        <Marginalia>
          Log-sum-exp instead of raw softmax, correct weight initialisation (He
          for ReLU networks, Xavier for tanh), checking for NaNs in the first
          few steps — these numerical habits separate code that trains from code
          that &ldquo;trains most of the time.&rdquo;
        </Marginalia>

        <h3>Research-grade — where the internals become accessible</h3>

        <p>
          <strong>Derive backpropagation from the chain rule.</strong> Take a
          two-layer network, write the forward pass as a sequence of operations,
          and derive the gradient of the loss with respect to every parameter by
          applying the chain rule in reverse. This derivation — not the concept
          — is what makes initialisation, normalisation, and residual
          connections legible: you can see exactly which gradient problem each
          is solving.
        </p>

        <p>
          <strong>
            The mathematics of batch normalisation and layer normalisation.
          </strong>{" "}
          Batch norm standardises activations across the mini-batch: &mu;
          <sub>B</sub> = (1/m)&Sigma;x<sub>i</sub>, &sigma;²<sub>B</sub> =
          (1/m)&Sigma;(x<sub>i</sub> &minus; &mu;<sub>B</sub>)². It reduces
          internal covariate shift and allows higher learning rates. Layer norm
          operates across the feature dimension instead — which is why it is
          used in transformers, where batch statistics are unreliable at typical
          sequence-level granularity.
        </p>

        <p>
          <strong>
            The O(n²) complexity of self-attention and its implications.
          </strong>{" "}
          The attention matrix is n × n in sequence length. Doubling the
          sequence length quadruples the memory and compute cost. This is the
          cost model that motivates Flash Attention (recomputes attention
          without materialising the full matrix), sparse attention patterns, and
          the practical limits on context length at a given GPU budget.
        </p>

        <p>
          <strong>Optimisation theory: convergence and flat minima.</strong> SGD
          converges to a local minimum for smooth non-convex objectives under
          mild conditions on the learning rate schedule. Adam&rsquo;s
          per-parameter adaptivity often finds flat minima — regions where the
          loss surface is wide and shallow — which generalise better to new data
          than sharp minima. Understanding this explains why learning-rate
          schedules, weight decay, and stochastic gradient noise are all
          regularisation in disguise.
        </p>

        <p className="text-sm text-faded-ink">
          → <Link href="/mathematics#linear-algebra">Linear algebra</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/mathematics#calculus-optimization">
            Calculus and optimisation
          </Link>{" "}
          in the mathematics curriculum — worked derivations and a depth ladder.
        </p>
      </StageSection>

      {/* ── §7 SECTION 5: Tools & engineering ───────────────────────────── */}
      <StageSection id="tools" title="Tools and engineering skills">
        <p>
          <strong>PyTorch — deeply.</strong> Not just the high-level API but the
          internals: <code>autograd</code> and the dynamic computational graph,
          custom <code>nn.Module</code> implementations, a hand-written training
          loop, gradient clipping, mixed-precision training with{" "}
          <code>torch.amp</code>, and profiling with <code>torch.profiler</code>
          . The ability to inspect what the model is doing at the tensor level
          is the skill that separates debugging from guessing.
        </p>

        <p>
          <strong>
            The pre-commit discipline — non-negotiable in production.
          </strong>{" "}
          Black (formatting), isort (import ordering), flake8 (linting), mypy
          (static typing), bandit (security scanning), and pytest (unit and
          integration tests) — running on every commit, not as an afterthought.
          A training pipeline with no type annotations and no tests is a
          liability. The pre-commit hook catches problems before they reach code
          review.
        </p>

        <p>
          <strong>
            MLflow or Weights &amp; Biases — as discipline, not as tooling.
          </strong>{" "}
          Every experiment logged. Every model version tracked, with the exact
          configuration that produced it. Every result reproducible from the
          logged parameters and artifact path. The choice of tool matters less
          than the habit; both MLflow (self-hostable) and W&B (better UI,
          standard at most AI companies) enforce the same discipline.
        </p>

        <p>
          <strong>FastAPI for model serving.</strong> The modern standard for
          Python ML APIs: async, fast, type-safe, with automatic OpenAPI
          documentation. A model wrapped in a FastAPI endpoint with Pydantic
          input/output schemas is a deployable, testable service. Load the model
          once at startup; validate input shapes and types before they reach the
          model; return structured error responses when validation fails.
        </p>

        <p>
          <strong>Docker and Docker Compose.</strong> A container is the unit of
          deployment. Every model should have a <code>Dockerfile</code> that
          produces an image running identically everywhere. Multi-stage builds
          keep the runtime image small (build-stage with dev dependencies,
          runtime stage with only what the model needs). Docker Compose for
          local multi-service development: model server + feature store +
          monitoring stack running together in one command.
        </p>

        <p>
          <strong>Airflow or Prefect for pipeline orchestration.</strong> A
          training pipeline that runs manually is not a production training
          pipeline. Orchestration handles scheduling, retries, dependency
          resolution, and alerting when a step fails. Airflow is the industry
          standard (heavy, but ubiquitous); Prefect is the modern alternative
          (lighter, better developer experience). Understand DAGs, task
          dependencies, and how to write idempotent tasks that can be safely
          retried.
        </p>

        <p>
          <strong>Terraform for infrastructure-as-code.</strong> The ability to
          describe a cloud deployment in code that is version-controlled,
          reviewed, and reproducible. A <code>main.tf</code> that provisions a
          GPU instance, an object-store bucket for model artifacts, and a
          load-balanced serving endpoint is the Stage 3 target — not deep
          Terraform expertise, but enough to deploy, update, and tear down
          cleanly.
        </p>
      </StageSection>

      {/* ── §7 SECTION 6: The project ────────────────────────────────────── */}
      <StageSection id="project" title="The project">
        <p>
          Three projects — a production ML platform, a transformer built from
          scratch, and a full MLOps pipeline — together prove the full Stage 3
          competency. The first shows you can ship reliably. The second shows
          you understand what you are shipping. The third shows you can maintain
          it.
        </p>

        <p className="text-sm text-faded-ink">
          Expected total time: 16–22 weeks alongside the curriculum. The MLOps
          pipeline project (Project 3) layers directly on top of the production
          platform (Project 1) — build them in sequence.
        </p>

        {/* ── Project 1 ── */}
        <h3 className="lg:clear-both">
          Project 1 — the production ML platform (8–10 weeks)
        </h3>

        <p>
          <strong>What it proves:</strong> you can ship a model as a reliable,
          monitored, reproducible service from data to production.
        </p>

        <p>
          Build an end-to-end production system for a demand-forecasting or
          recommendation problem — two domains where the full data-to-production
          loop is most instructive and the monitoring needs are clearest. Strong
          dataset options: M5 Forecasting (retail demand, Kaggle), MovieLens 25M
          (recommendation), NYC Taxi demand, or any domain with genuine business
          stakes. The dataset must be large enough that batch processing matters
          (≥ 1M rows) and the prediction must have a real cost when wrong.
        </p>

        <ol>
          <li>
            <strong>Data pipeline with validation.</strong> Write an ingestion
            and validation pipeline using Airflow or Prefect. Validation: schema
            checks (Great Expectations or Pandera), distribution checks (flag if
            a feature&rsquo;s mean shifts &gt; 2σ from a reference window), and
            completeness checks (alert if missingness exceeds 5%). Version the
            datasets — a model trained on data version 3 must be reproducible
            with data version 3.
          </li>
          <li>
            <strong>Feature store with point-in-time correctness.</strong>{" "}
            Features are computed once and stored as named, versioned, typed
            entities. When you retrieve features for a January training example,
            you get the values as they were in January — not as they are today.
            This is the engineering that prevents training-serving skew for any
            model that uses historical features.
          </li>
          <li>
            <strong>Training pipeline as a reproducible DAG.</strong> Data
            extraction → feature computation → train/val split → model training
            → evaluation → model registration. Every run logged to MLflow or
            W&B. The model is registered only if it exceeds the evaluation
            threshold. The same code and same data must produce the same model —
            pin random seeds, library versions, and data versions.
          </li>
          <li>
            <strong>Serving API.</strong> Wrap the model in a FastAPI service: a{" "}
            <code>/predict</code> endpoint with Pydantic input validation, a{" "}
            <code>/health</code> endpoint, and a <code>/metrics</code> endpoint
            for Prometheus. Load the model once at startup from the model
            registry. Measure response time — under 100ms per prediction is the
            target for synchronous serving; benchmark it.
          </li>
          <li>
            <strong>Drift monitoring.</strong> Log the distribution of input
            features for every request (sampled at 10% to manage volume). Run a
            PSI or KS test comparing the current distribution against the
            training distribution on a daily batch job. Alert when PSI &gt; 0.2
            or the KS p-value &lt; 0.01. If ground truth arrives with a delay
            (as in forecasting), log model performance retrospectively and track
            its decay. Build a Grafana dashboard showing 30 days of prediction
            volume, drift status, and model performance.
          </li>
          <li>
            <strong>IaC deployment.</strong> Write a Terraform configuration
            that provisions the serving infrastructure on AWS or GCP: a
            load-balanced service with at least 2 replicas, auto-scaling on
            CPU/latency, and a managed database for the feature store. Destroy
            and re-create the infrastructure from the Terraform configuration —
            that is the reproducibility check.
          </li>
        </ol>

        <p>
          <strong>
            The deliverable is a GitHub repository with a complete README
            explaining the system architecture.
          </strong>{" "}
          Include an architecture diagram (hand-drawn is fine), a screenshot of
          the monitoring dashboard, the CI/CD configuration, and a section on
          what you would do differently with more time. The test: clone the
          repository, follow the README, and have the system running in under an
          hour.
        </p>

        <Marginalia>
          The feature store is the piece most people skip — and then they wonder
          why their model fails in production. Point-in-time correctness is not
          an optimisation. It is the correctness condition for any model trained
          on historical features.
        </Marginalia>

        {/* ── Project 2 ── */}
        <h3 className="lg:clear-both">
          Project 2 — build a transformer from scratch (3–4 weeks)
        </h3>

        <p>
          <strong>What it proves:</strong> you understand the architecture you
          are deploying, not just the API you are calling.
        </p>

        <p>
          Follow Karpathy&rsquo;s nanoGPT approach: build a character-level GPT
          in raw PyTorch, training end-to-end on a plain-text corpus.
          Shakespeare is the traditional choice; any plain-text corpus works.
          Every component from scratch — no Hugging Face, no Lightning:
        </p>

        <ul>
          <li>
            <strong>Tokenisation:</strong> a simple byte-pair encoding or
            character-level tokeniser. Understand the vocabulary size trade-off
            (more tokens = shorter sequences but larger embeddings).
          </li>
          <li>
            <strong>Embeddings:</strong> token embeddings + positional
            embeddings. Understand why positional information must be injected
            explicitly and what the sinusoidal encoding does geometrically.
          </li>
          <li>
            <strong>Scaled dot-product attention:</strong> Q/K/V projections,{" "}
            <code>QK&#7488; / &radic;d&#8096;</code>, softmax, output
            projection. Implement the matrix multiplies directly. Understand the
            scaling and why its absence saturates softmax at initialisation.
          </li>
          <li>
            <strong>Multi-head attention:</strong> split the{" "}
            <code>d_model</code> dimension into <em>h</em> heads, compute
            attention independently, concatenate and project. The multiple heads
            learn different relationships — it is not just more parameters.
          </li>
          <li>
            <strong>Feed-forward sublayer:</strong> two linear layers with GELU
            in between. This is where the model memorises; attention is where it
            routes.
          </li>
          <li>
            <strong>Layer norm and residual connections:</strong> every sublayer
            wrapped in a pre-norm residual. Residuals solve the vanishing
            gradient problem in deep networks by giving gradients a direct path
            back through every layer.
          </li>
          <li>
            <strong>Training loop:</strong> AdamW with cosine learning-rate
            decay and gradient clipping. Mixed precision (FP16 if a GPU is
            available). Log training and validation loss to W&amp;B.
          </li>
        </ul>

        <p>
          The deliverable is a GitHub repository with the complete
          implementation, a training log showing the loss curve, and generated
          samples at training checkpoints. The test: a reviewer who knows
          transformers should be able to read every component without comments
          and understand exactly what it does.
        </p>

        {/* ── Project 3 ── */}
        <h3 className="lg:clear-both">
          Project 3 — the MLOps pipeline (2–3 weeks)
        </h3>

        <p>
          <strong>What it proves:</strong> you can maintain a model in
          production, not just deploy it once.
        </p>

        <p>Add a complete MLOps layer on top of your Project 1 system:</p>

        <ul>
          <li>
            <strong>CI/CD for ML:</strong> a GitHub Actions pipeline that runs
            lint → typecheck → unit tests → integration tests → model evaluation
            on every pull request. The integration test trains a 1%-data proxy
            model and checks that evaluation metrics are within tolerance. Merge
            is blocked if any step fails.
          </li>
          <li>
            <strong>Automated retraining trigger:</strong> a scheduled DAG that
            triggers retraining when drift is detected (PSI &gt; 0.25 on any key
            feature), when performance falls below threshold, or weekly —
            whichever comes first. A retrained model is registered only if it
            outperforms the current production model on the held-out evaluation
            set.
          </li>
          <li>
            <strong>Canary rollout and rollback:</strong> deploy the new model
            to 10% of traffic using a stable hash of the request ID (not random
            per request). Monitor for 72 hours. Compare primary metric and two
            guardrail metrics between the canary and production groups.
            Implement a rollback that diverts all traffic back to the old model
            in under 60 seconds.
          </li>
        </ul>

        <p>
          The deliverable is a one-page MLOps runbook: what triggers each
          automation, what the alert conditions are, and what on-call action
          each alert requires. The test: given the runbook, could someone who
          did not build the system diagnose and resolve a model degradation
          event at 2am?
        </p>

        {/* ── Extensions ── */}
        <h3>
          Senior extension — multi-model ensemble with automated selection
        </h3>
        <p>
          Extend Project 1 to support multiple model candidates. Implement
          automated model selection: the serving layer routes requests to the
          model with the best performance on a rolling 7-day evaluation window.
          Document the trade-offs between latency, accuracy, and model
          complexity in the selection policy — this is the Stage 4 thinking
          applied to Stage 3 systems.
        </p>

        <h3>Research extension — novel architecture or training method</h3>
        <p>
          Choose a recent paper introducing a modification to the standard
          transformer (a new attention mechanism, normalisation scheme, or
          positional encoding). Implement the modification in your Project 2
          codebase, train both versions under identical conditions, and write a
          two-page comparison: did the modification improve performance on your
          task, what is the computational cost, and how does the paper&rsquo;s
          claim hold at your smaller scale?
        </p>
      </StageSection>

      {/* ── §7 SECTION 7: Resources ──────────────────────────────────────── */}
      <StageSection id="resources" title="Resources">
        <p className="mb-6 text-faded-ink">
          The modern trifecta is{" "}
          <strong>
            Karpathy&rsquo;s Zero to Hero + d2l.ai + Designing ML Systems
          </strong>
          : Karpathy gives you neural network internals by building a
          transformer from scratch; d2l takes you the same route with runnable
          multi-framework code; Chip Huyen&rsquo;s book tells you everything the
          lab does not about making models work in production. These three in
          parallel, with fast.ai as the top-down complement if you learn that
          way, cover this stage. Goodfellow et al. is the theory canon — consult
          it when you need a rigorous derivation of something you have already
          used in practice.
        </p>
        <ResourceGroups resources={stageResources} />
      </StageSection>

      {/* ── §7 SECTION 8: How you know you're done ───────────────────────── */}
      <StageSection id="done" title="How you know you&rsquo;re done">
        <p>Exit criteria — you can answer &ldquo;yes&rdquo; to all of these:</p>

        <ul>
          <li>
            Given a training run that is converging slowly or not at all, you
            can systematically diagnose: gradient magnitude (vanishing or
            exploding), learning rate (too high, too low, or no warmup),
            initialisation (poor variance at the first forward pass), or
            numerical instability (NaN in the loss or activations).
          </li>
          <li>
            You can implement a PyTorch training loop with gradient clipping,
            mixed-precision (FP16), and proper seed-setting for reproducibility,
            and explain what each does and why.
          </li>
          <li>
            You can describe the scaled dot-product attention mechanism — Q, K,
            V projections, <code>QK&#7488; / &radic;d&#8096;</code>, softmax,
            output projection — from memory, and explain why the scaling
            prevents softmax saturation at initialisation.
          </li>
          <li>
            You have a PSI or KS test running against a production model&rsquo;s
            input distribution, and you can explain what PSI &gt; 0.2 means
            operationally: the distribution has shifted enough that the model
            may be operating out of distribution, and retraining is warranted.
          </li>
          <li>
            An interviewer says &ldquo;your model&rsquo;s accuracy dropped 8
            points in the last two weeks — walk me through your diagnostic
            process.&rdquo; You have a systematic answer: check input drift
            first, then upstream data pipeline, then target distribution shift,
            then recent code changes.
          </li>
          <li>
            You can build a containerised FastAPI serving endpoint, deploy it
            from Terraform, implement a health check and a canary rollout, and
            execute a rollback — all from documented runbooks rather than tribal
            knowledge.
          </li>
        </ul>

        <h3>Self-test questions</h3>
        <ol>
          <li>
            You are training a 12-layer transformer. Gradients for layers 1–3
            are consistently near zero while layers 10–12 have normal
            magnitudes. What is the likely cause, and what architectural changes
            — already standard in modern transformers — address it?
          </li>
          <li>
            Your model has been in production six weeks. The primary metric is
            stable, but PSI = 0.31 on a key feature. Should you retrain? What
            additional information would you want before deciding?
          </li>
          <li>
            Describe training-serving skew: what causes it, give two concrete
            examples from feature engineering, and describe one engineering
            practice that prevents each.
          </li>
          <li>
            You train a model on 2024 data and need to evaluate whether it will
            perform acceptably on 2025 data before deploying. Describe your
            evaluation strategy — data splits, metrics, and the threshold that
            triggers retraining rather than deployment.
          </li>
          <li>
            A new model deployed to 5% of traffic shows a 2% improvement on the
            primary metric but 40% higher latency. What do you do?
          </li>
        </ol>
      </StageSection>

      {/* ── §7 SECTION 9: Bridge to next stage ──────────────────────────── */}
      <StageSection id="next-stage" title="Bridge to the next stage">
        <p>
          The machine learning engineer asks: can I make this model work
          reliably at scale? The AI engineer asks: can I build systems on top of
          foundation models that have already been trained at a scale I cannot
          replicate?
        </p>

        <p>
          Stage 4 is not a continuation of Stage 3 — it is a pivot in the stack
          you operate at. Instead of training models from scratch, you are
          building on models that are already among the most capable systems in
          the world for their tasks. The engineering skill shifts from training
          pipelines to orchestration, from model serving to prompt management,
          from data drift to hallucination detection.
        </p>

        <p>
          The transformer internals you built in Stage 3 matter intensely here.
          Understanding attention is what lets you reason about why long
          contexts are expensive, why in-context learning works, and why certain
          prompting strategies are more reliable than others. The MLE who
          understands the architecture is the one who can make AI Engineer
          systems work in production — not just in a demo.
        </p>

        <p>
          <strong>What to take into Stage 4:</strong> the full MLOps discipline
          (it applies directly to LLM systems), PyTorch fluency (for
          fine-tuning), transformer internals, FastAPI serving patterns, and the
          monitoring mindset. LLM evaluation is harder than classical model
          evaluation — non-deterministic outputs, no single ground truth,
          LLM-as-judge — and the rigour built here is what prevents the
          vibes-based evaluation that causes most LLM production failures.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/ai-engineer"
            className="inline-flex items-center gap-1.5 rounded border border-route-red bg-route-red/5 px-4 py-2 font-mono text-sm text-ink transition-colors hover:bg-route-red hover:text-paper"
          >
            AI Engineer →
          </Link>
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 rounded border border-teal bg-teal/5 px-4 py-2 font-mono text-sm text-ink transition-colors hover:bg-teal hover:text-paper"
          >
            Research Track →
          </Link>
          <Link
            href="/map"
            className="font-mono text-sm text-faded-ink underline decoration-brass underline-offset-2 hover:text-ink"
          >
            View the full map
          </Link>
        </div>
      </StageSection>
    </article>
  );
}
