import type { Metadata } from "next";
import Link from "next/link";
import katex from "katex";
import { getResourcesByStage } from "@/lib/resources";
import { ResourceGroups } from "@/components/stage/resource-group";
import { Marginalia } from "@/components/stage/marginalia";
import { StageSection } from "@/components/stage/stage-section";

export const metadata: Metadata = {
  title: "Mathematics",
  description:
    "The cross-referenced math spine â€” every stage links in here, tagged by which stage needs it and to what depth. Tiers 1â€“3 from algebra basics through real analysis, measure-theoretic probability, and statistical learning theory.",
  openGraph: {
    title: "Mathematics Â· Praxia",
    description:
      "The math spine cross-referenced to every stage. Tiers 1â€“3: from algebra basics through measure-theoretic probability and statistical learning theory.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mathematics Â· Praxia",
    description:
      "The math spine cross-referenced to every stage. Tiers 1â€“3: from algebra basics through measure-theoretic probability and statistical learning theory.",
  },
};

// â”€â”€ KaTeX server-side rendering â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Renders math strings to HTML at build time. KaTeX CSS is loaded by the
// /mathematics/layout.tsx (not globally) â€” no runtime JS needed.
function K({ children, block = false }: { children: string; block?: boolean }) {
  const html = katex.renderToString(children, {
    displayMode: block,
    throwOnError: false,
    trust: false,
  });
  if (block) {
    return (
      <div
        className="my-4 overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

// â”€â”€ Stage-need badge â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function NeedsBadge({
  stages,
  depth,
}: {
  stages: string;
  depth: "minimum" | "research";
}) {
  const isResearch = depth === "research";
  return (
    <span
      className={
        isResearch
          ? "inline-flex items-center rounded border border-teal/20 bg-teal/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink"
          : "inline-flex items-center rounded border border-route-red/20 bg-route-red/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink"
      }
    >
      {stages} Â· {depth}
    </span>
  );
}

// â”€â”€ Resources â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const mathResources = getResourcesByStage("mathematics");

// â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function Page() {
  return (
    <article className="space-y-0">
      {/* â”€â”€ Page header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header className="mb-10">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-faded-ink">
          The cross-referenced spine
        </p>
        <h1 className="mb-3 font-display text-4xl font-bold text-ink">
          Mathematics
        </h1>
        <p className="mb-4 font-body text-xl text-faded-ink">
          Every stage links here. Each topic is tagged with which stage needs it
          and to what depth â€” the <em>minimum</em> to be productive versus the{" "}
          <em>research-grade</em> understanding that holds under scrutiny.
        </p>
        <p className="font-body text-base text-faded-ink">
          Most people under-invest in mathematics. The map is blunt about this:
          the gap between someone who applies ML and someone who understands it
          is almost always a mathematics gap.
        </p>
      </header>

      {/* â”€â”€ Overview nav â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <nav aria-label="Mathematics curriculum sections" className="mb-10">
        <div className="flex flex-wrap gap-2">
          {[
            { href: "#tier-1", label: "Tier 1 â€” Foundations" },
            { href: "#linear-algebra", label: "Linear Algebra" },
            {
              href: "#calculus-optimization",
              label: "Calculus & Optimisation",
            },
            {
              href: "#probability-statistics",
              label: "Probability & Statistics",
            },
            { href: "#tier-3", label: "Tier 3 â€” Research" },
            { href: "#resources", label: "Resources" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded border border-margin bg-paper/60 px-2.5 py-1 font-mono text-xs text-faded-ink transition-colors hover:border-brass/40 hover:text-ink"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          TIER 1 â€” FOUNDATIONS MATH
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <StageSection id="tier-1" title="Tier 1 â€” Foundations Math">
        <Marginalia>
          Most people reach Stage 2 with gaps here. A shaky log-and-exp
          intuition quietly causes errors in cross-entropy and learning rate
          schedules for years.
        </Marginalia>

        <div className="mb-4 flex flex-wrap gap-2">
          <NeedsBadge stages="Foundations â†’ Stage 1" depth="minimum" />
        </div>

        <p className="mb-6 leading-relaxed text-faded-ink">
          These are the prerequisites the other tiers build on. If any of these
          feel uncertain, address them before Tier 2 â€” gaps here propagate
          everywhere.
        </p>

        <div className="space-y-8">
          {/* Algebra & Functions */}
          <div id="algebra-functions">
            <h3 className="mb-3 font-display text-xl font-semibold text-ink">
              Algebra and functions
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-faded-ink">
              Algebraic manipulation, function composition, and the behaviour of
              logarithms and exponentials. The key identity every ML
              practitioner uses daily is the relationship between multiplication
              and addition of logs (which turns products of probabilities into
              sums):
            </p>
            <K block>
              {String.raw`\log\!\left(\prod_{i=1}^{n} p_i\right) = \sum_{i=1}^{n} \log p_i`}
            </K>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              The natural logarithm <K>{String.raw`\ln x`}</K> and the
              exponential <K>{String.raw`e^x`}</K> are inverses:{" "}
              <K>{String.raw`e^{\ln x} = x`}</K>. The softmax function â€” the
              gating mechanism of neural networks and the output of every
              classifier â€” is built entirely from this pair. Logarithms also
              appear in entropy, KL divergence, and information theory (all Tier
              3).
            </p>
          </div>

          {/* Set theory & notation */}
          <div id="set-notation">
            <h3 className="mb-3 font-display text-xl font-semibold text-ink">
              Set theory, logic, and notation
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              Probability theory is built on set theory. The symbols{" "}
              <K>{String.raw`\in, \subseteq, \cap, \cup, \setminus`}</K> appear
              in almost every probability definition. Propositional logic
              (implication, equivalence, contrapositive) is needed for reading
              proofs. Mathematical quantifiers{" "}
              <K>{String.raw`\forall, \exists`}</K> appear throughout.
            </p>
          </div>

          {/* Summation & product notation */}
          <div id="summation-notation">
            <h3 className="mb-3 font-display text-xl font-semibold text-ink">
              Summation and product notation
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              Compact notation for sums and products. The training loss of
              nearly every model is a sum over data points; likelihoods are
              products. These notations let you read and write such expressions
              without confusion:
            </p>
            <K block>
              {String.raw`\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n \qquad \prod_{i=1}^{n} p_i = p_1 \cdot p_2 \cdots p_n`}
            </K>
          </div>

          {/* Proof techniques */}
          <div id="proof-techniques">
            <h3 className="mb-3 font-display text-xl font-semibold text-ink">
              Proof techniques â€” the research seed
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              You do not need to write proofs at Stage 0. But learning to read
              them â€” especially induction and proof by contradiction â€” is
              the research-seed investment that pays off at Stage 2 and beyond.
              Induction is the standard tool for recurrences and complexity
              arguments; contradiction is how most impossibility results are
              established.
            </p>
          </div>
        </div>
      </StageSection>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          TIER 2 â€” LINEAR ALGEBRA
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <StageSection id="linear-algebra" title="Linear Algebra" eyebrow="Tier 2">
        <div className="mb-4 flex flex-wrap gap-2">
          <NeedsBadge stages="Stage 2 (minimum)" depth="minimum" />
          <NeedsBadge stages="Stage 3 + Research" depth="research" />
        </div>

        <p className="mb-5 leading-relaxed text-faded-ink">
          Machine learning is applied linear algebra. Datasets are matrices;
          models map vectors to vectors; every neural-network forward pass is a
          sequence of matrix multiplications followed by non-linearities. Invest
          here before deep learning â€” the payoff is immediate.
        </p>

        <Marginalia>
          3Blue1Brown for intuition, Strang for tools. Do not skip either: one
          without the other leaves a gap between understanding and calculation.
        </Marginalia>

        <div className="space-y-8">
          {/* Vectors and matrices */}
          <div id="vectors-matrices">
            <h3 className="mb-2 font-display text-xl font-semibold text-ink">
              Vectors, matrices, and operations
            </h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded border border-route-red/20 bg-route-red/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
                Stage 2 Â· minimum
              </span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              A vector <K>{String.raw`\mathbf{x} \in \mathbb{R}^n`}</K> is a
              point in <K>{String.raw`n`}</K>-dimensional space. A matrix{" "}
              <K>{String.raw`A \in \mathbb{R}^{m \times n}`}</K> is a linear map
              from <K>{String.raw`\mathbb{R}^n`}</K> to{" "}
              <K>{String.raw`\mathbb{R}^m`}</K>. Matrix multiplication{" "}
              <K>{String.raw`AB`}</K> composes two linear maps. These are not
              just notational conventions â€” they are the geometric content.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              The <strong className="text-ink">Euclidean norm</strong> of a
              vector:
            </p>
            <K
              block
            >{String.raw`\|\mathbf{x}\|_2 = \sqrt{x_1^2 + x_2^2 + \cdots + x_n^2}`}</K>
            <p className="text-sm leading-relaxed text-faded-ink">
              The <strong className="text-ink">dot product</strong>{" "}
              <K>{String.raw`\mathbf{x}^\top \mathbf{y} = \sum_i x_i y_i = \|\mathbf{x}\|_2 \|\mathbf{y}\|_2 \cos\theta`}</K>{" "}
              measures alignment â€” the foundation of cosine similarity,
              attention scores, and the kernel trick.
            </p>
          </div>

          {/* Eigenvalues/vectors */}
          <div id="eigendecomposition">
            <h3 className="mb-2 font-display text-xl font-semibold text-ink">
              Eigenvalues, eigenvectors, and eigendecomposition
            </h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded border border-route-red/20 bg-route-red/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
                Stage 2â€“3 Â· minimum
              </span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              A vector <K>{String.raw`\mathbf{q}`}</K> is an eigenvector of{" "}
              <K>{String.raw`A`}</K> with eigenvalue{" "}
              <K>{String.raw`\lambda`}</K> if:
            </p>
            <K block>{String.raw`A \mathbf{q} = \lambda \mathbf{q}`}</K>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              For a symmetric positive-definite matrix â€” the type that appears
              in covariance matrices, kernel matrices, and Hessians â€” the
              eigendecomposition factors <K>{String.raw`A`}</K> as:
            </p>
            <K block>{String.raw`A = Q \Lambda Q^\top`}</K>
            <p className="text-sm leading-relaxed text-faded-ink">
              where <K>{String.raw`Q`}</K> is an orthonormal matrix of
              eigenvectors and <K>{String.raw`\Lambda`}</K> is diagonal with the
              eigenvalues. This decomposition is behind PCA, kernel methods,
              spectral clustering, and the analysis of gradient descent
              convergence (the condition number of <K>{String.raw`A`}</K> is the
              ratio <K>{String.raw`\lambda_{\max}/\lambda_{\min}`}</K>).
            </p>
          </div>

          {/* SVD */}
          <div id="svd">
            <h3 className="mb-2 font-display text-xl font-semibold text-ink">
              Singular Value Decomposition (SVD)
            </h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded border border-teal/20 bg-teal/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
                Stage 2â€“3 Â· research-grade
              </span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              The SVD generalises eigendecomposition to non-square matrices â€”
              which is essentially everything in ML, since data matrices are{" "}
              <K>{String.raw`n \times d`}</K> with <K>{String.raw`n \neq d`}</K>
              :
            </p>
            <K block>{String.raw`A = U \Sigma V^\top`}</K>
            <p className="text-sm leading-relaxed text-faded-ink">
              <K>{String.raw`U \in \mathbb{R}^{m \times m}`}</K> and{" "}
              <K>{String.raw`V \in \mathbb{R}^{n \times n}`}</K> are
              orthonormal; <K>{String.raw`\Sigma`}</K> is diagonal with the
              singular values{" "}
              <K>{String.raw`\sigma_1 \geq \sigma_2 \geq \cdots \geq 0`}</K>.
              Truncating to the top <K>{String.raw`k`}</K> singular values gives
              the best rank-<K>{String.raw`k`}</K> approximation to{" "}
              <K>{String.raw`A`}</K> in the Frobenius norm â€” this is the
              mathematics behind PCA, dimensionality reduction, and
              collaborative filtering. LoRA (the fine-tuning technique in Stage
              4) exploits exactly this low-rank structure.
            </p>
          </div>
        </div>
      </StageSection>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          TIER 2 â€” CALCULUS & OPTIMISATION
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <StageSection
        id="calculus-optimization"
        title="Calculus and Optimisation"
        eyebrow="Tier 2"
      >
        <div className="mb-4 flex flex-wrap gap-2">
          <NeedsBadge stages="Stage 2 (minimum)" depth="minimum" />
          <NeedsBadge stages="Stage 3 + Research" depth="research" />
        </div>

        <p className="mb-5 leading-relaxed text-faded-ink">
          Training a model is solving an optimisation problem. Calculus provides
          the language for describing how a function changes; optimisation
          provides the algorithms for making it as small as possible. These are
          inseparable.
        </p>

        <div className="space-y-8">
          {/* Chain rule */}
          <div id="chain-rule">
            <h3 className="mb-2 font-display text-xl font-semibold text-ink">
              The chain rule and backpropagation
            </h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded border border-route-red/20 bg-route-red/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
                Stage 2 Â· minimum
              </span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              The scalar chain rule:{" "}
            </p>
            <K
              block
            >{String.raw`\frac{d}{dx} f(g(x)) = f'(g(x)) \cdot g'(x)`}</K>
            <p className="text-sm leading-relaxed text-faded-ink">
              Backpropagation is just the chain rule applied recursively through
              a computational graph. Every gradient in a neural network is
              computed this way. The key insight is that the chain rule
              decomposes the derivative of the loss <K>{String.raw`L`}</K> with
              respect to early-layer weights into a product of local Jacobians,
              each computable from the forward pass.
            </p>
          </div>

          {/* Gradient and gradient descent */}
          <div id="gradient-descent">
            <h3 className="mb-2 font-display text-xl font-semibold text-ink">
              Gradients and gradient descent
            </h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded border border-route-red/20 bg-route-red/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
                Stage 2 Â· minimum
              </span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              The gradient <K>{String.raw`\nabla_{\mathbf{w}} L`}</K> is the
              vector of partial derivatives of the loss with respect to every
              parameter â€” the direction of steepest ascent. Gradient descent
              steps in the opposite direction:
            </p>
            <K
              block
            >{String.raw`\mathbf{w} \leftarrow \mathbf{w} - \alpha \nabla_{\mathbf{w}} L(\mathbf{w})`}</K>
            <p className="text-sm leading-relaxed text-faded-ink">
              where <K>{String.raw`\alpha > 0`}</K> is the learning rate. The
              learning rate is the most consequential hyperparameter in training
              â€” too large and the loss diverges, too small and training
              stalls. Adaptive methods (Adam, RMSProp) effectively adjust the
              per-parameter learning rate from curvature information.
            </p>
          </div>

          {/* Matrix calculus */}
          <div id="matrix-calculus">
            <h3 className="mb-2 font-display text-xl font-semibold text-ink">
              Matrix calculus
            </h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded border border-teal/20 bg-teal/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
                Stage 3 Â· research-grade
              </span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              Matrix calculus extends scalar calculus to vector and matrix
              arguments. The two most common identities you will use:
            </p>
            <K
              block
            >{String.raw`\frac{\partial}{\partial \mathbf{x}} (A\mathbf{x}) = A^\top \qquad \frac{\partial}{\partial \mathbf{x}} (\mathbf{x}^\top A \mathbf{x}) = (A + A^\top)\mathbf{x}`}</K>
            <p className="text-sm leading-relaxed text-faded-ink">
              These identities appear in the derivation of linear regression
              (where the normal equations emerge from{" "}
              <K>{String.raw`\nabla_{\mathbf{w}} \|\mathbf{y} - X\mathbf{w}\|^2 = 0`}</K>
              ), in the analysis of quadratic forms in attention, and in
              second-order optimisation methods.
            </p>
          </div>

          {/* Convexity */}
          <div id="convexity">
            <h3 className="mb-2 font-display text-xl font-semibold text-ink">
              Convexity and why it matters
            </h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded border border-teal/20 bg-teal/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
                Research Â· minimum for theory
              </span>
            </div>
            <p className="text-sm leading-relaxed text-faded-ink">
              A function <K>{String.raw`f`}</K> is convex if, for all{" "}
              <K>{String.raw`\mathbf{x}, \mathbf{y}`}</K> and{" "}
              <K>{String.raw`t \in [0,1]`}</K>:
            </p>
            <K
              block
            >{String.raw`f(t\mathbf{x} + (1-t)\mathbf{y}) \leq t f(\mathbf{x}) + (1-t)f(\mathbf{y})`}</K>
            <p className="text-sm leading-relaxed text-faded-ink">
              For convex functions, every local minimum is a global minimum â€”
              gradient descent is guaranteed to converge. Deep network loss
              landscapes are <strong className="text-ink">non-convex</strong>,
              which is why understanding when convexity fails and what the
              alternatives are (saddle-point theory, loss-landscape analysis)
              matters for serious research.
            </p>
          </div>
        </div>
      </StageSection>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          TIER 2 â€” PROBABILITY & STATISTICS
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <StageSection
        id="probability-statistics"
        title="Probability and Statistics"
        eyebrow="Tier 2"
      >
        <div className="mb-4 flex flex-wrap gap-2">
          <NeedsBadge stages="Stage 1 (minimum)" depth="minimum" />
          <NeedsBadge stages="Stage 2 + Research" depth="research" />
        </div>

        <p className="mb-5 leading-relaxed text-faded-ink">
          ML is applied probabilistic reasoning. Models make claims under
          uncertainty; probability is the language of uncertainty. Without this,
          you cannot evaluate models honestly, design experiments properly, or
          understand why any of the Bayesian methods work.
        </p>

        <Marginalia>
          Harvard Stat 110 (Blitzstein) is the best single investment here. The
          conditioning chapter alone is worth the whole course.
        </Marginalia>

        <div className="space-y-8">
          {/* Bayes */}
          <div id="bayes-theorem">
            <h3 className="mb-2 font-display text-xl font-semibold text-ink">
              Bayes&apos; theorem
            </h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded border border-route-red/20 bg-route-red/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
                Stage 1â€“2 Â· minimum
              </span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              The fundamental rule for updating beliefs given evidence:
            </p>
            <K
              block
            >{String.raw`P(A \mid B) = \frac{P(B \mid A)\, P(A)}{P(B)}`}</K>
            <p className="text-sm leading-relaxed text-faded-ink">
              In ML: posterior = likelihood Ã— prior / evidence. Naive Bayes,
              Bayesian networks, variational inference, and the theoretical
              underpinning of regularisation (L2 = Gaussian prior; L1 = Laplace
              prior) all flow from this single equation. Be sure you can derive
              it from the definition of conditional probability.
            </p>
          </div>

          {/* MLE/MAP */}
          <div id="mle-map">
            <h3 className="mb-2 font-display text-xl font-semibold text-ink">
              Maximum Likelihood Estimation and MAP
            </h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded border border-route-red/20 bg-route-red/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
                Stage 2 Â· minimum
              </span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              MLE finds the parameter <K>{String.raw`\hat{\theta}`}</K> that
              makes the observed data most probable under the model:
            </p>
            <K
              block
            >{String.raw`\hat{\theta}_{\text{MLE}} = \arg\max_{\theta} \sum_{i=1}^{n} \log p(x_i \mid \theta)`}</K>
            <p className="text-sm leading-relaxed text-faded-ink">
              The log-sum form (equivalent to the product-of-likelihoods by the
              Tier 1 log identity) is numerically stable and separates into
              per-sample terms. Minimising cross-entropy loss is exactly MLE
              under a categorical model. MAP extends MLE by adding a prior,
              which introduces the regularisation term.
            </p>
          </div>

          {/* CLT */}
          <div id="central-limit-theorem">
            <h3 className="mb-2 font-display text-xl font-semibold text-ink">
              The Central Limit Theorem
            </h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded border border-route-red/20 bg-route-red/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
                Stage 1â€“2 Â· minimum
              </span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              For i.i.d. random variables <K>{String.raw`X_1, \ldots, X_n`}</K>{" "}
              with mean <K>{String.raw`\mu`}</K> and variance{" "}
              <K>{String.raw`\sigma^2`}</K>, the sample mean converges in
              distribution to a Gaussian:
            </p>
            <K
              block
            >{String.raw`\bar{X}_n \xrightarrow{\,d\,} \mathcal{N}\!\left(\mu,\; \frac{\sigma^2}{n}\right)`}</K>
            <p className="text-sm leading-relaxed text-faded-ink">
              This is why confidence intervals around test-set performance have
              the form &ldquo;mean Â± zÂ·Ïƒ/âˆšn&rdquo;, why statistical tests
              use t or z statistics, and why batch gradients in SGD can be used
              as unbiased estimates of the full-data gradient. The CLT is the
              mathematical licence for sampling.
            </p>
          </div>

          {/* Hypothesis testing */}
          <div id="hypothesis-testing">
            <h3 className="mb-2 font-display text-xl font-semibold text-ink">
              Hypothesis testing and p-values
            </h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded border border-route-red/20 bg-route-red/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
                Stage 1 Â· minimum
              </span>
            </div>
            <p className="text-sm leading-relaxed text-faded-ink">
              A p-value is the probability of observing data at least as extreme
              as the data you actually observed,{" "}
              <em>assuming the null hypothesis is true</em>. It is not the
              probability the null is true. This distinction matters enormously
              in practice: a p = 0.03 result means the data is surprising under
              the null, not that the effect is large or real. Know the
              one-sample <K>{String.raw`t`}</K>-test, the two-sample{" "}
              <K>{String.raw`t`}</K>-test, ANOVA, chi-square, and when each
              applies. Know the Bonferroni and Benjaminiâ€“Hochberg corrections
              for multiple comparisons.
            </p>
          </div>
        </div>
      </StageSection>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          TIER 3 â€” ADVANCED / RESEARCH MATH
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <StageSection
        id="tier-3"
        title="Tier 3 â€” Advanced and Research Math"
        eyebrow="Research track"
      >
        <div className="mb-4 flex flex-wrap gap-2">
          <NeedsBadge stages="Research track" depth="research" />
        </div>

        <p className="mb-6 leading-relaxed text-faded-ink">
          These are the topics that separate practitioners who <em>use</em>{" "}
          results from researchers who <em>prove</em> them. Build them one at a
          time, as they become relevant to your subfield. You do not need all of
          Tier 3 before starting research â€” you need the slice your problem
          requires.
        </p>

        <Marginalia>
          Start Tier 3 topics as they appear in the papers you are reading, not
          in advance. Forced completeness here delays actual research.
        </Marginalia>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              id: "information-theory",
              title: "Information Theory",
              formulas: [
                {
                  label: "Entropy",
                  tex: String.raw`H(X) = -\sum_x p(x)\log_2 p(x)`,
                },
                {
                  label: "KL divergence",
                  tex: String.raw`D_{\mathrm{KL}}(P \,\|\, Q) = \sum_x P(x)\log\frac{P(x)}{Q(x)}`,
                },
              ],
              description:
                "Entropy, cross-entropy, KL divergence, mutual information. Cross-entropy loss = entropy + KL divergence between the true and predicted distributions â€” understanding this makes the loss function's geometry intuitive. KL divergence appears in VAEs, RL (PPO's clipping objective), and model calibration.",
              resources:
                "MML ch. 6; Cover & Thomas 'Elements of Information Theory'",
            },
            {
              id: "learning-theory",
              title: "Statistical Learning Theory",
              formulas: [
                {
                  label: "PAC bound (VC)",
                  tex: String.raw`R(h) \leq \hat{R}(h) + \sqrt{\frac{d\log(n/d) + \log(1/\delta)}{n}}`,
                },
              ],
              description:
                "PAC learning, VC dimension, Rademacher complexity, generalization bounds, concentration inequalities (Hoeffding, McDiarmid). This is the mathematical language for asking 'why does this generalise?' â€” the central question in ML theory. The generalization bound above says: test risk â‰¤ empirical risk + a complexity term that shrinks with data.",
              resources:
                "Mohri, Rostamizadeh & Talwalkar 'Foundations of ML'; Shalev-Shwartz & Ben-David 'Understanding ML'",
            },
            {
              id: "measure-probability",
              title: "Measure-Theoretic Probability",
              formulas: [
                {
                  label: "Expectation",
                  tex: String.raw`\mathbb{E}[X] = \int_\Omega X(\omega)\, d\mu(\omega)`,
                },
              ],
              description:
                "The rigorous foundation of probability: sigma-algebras, measurable functions, Lebesgue integration. Needed for theory papers that involve expectations over function classes or infinite-dimensional spaces. You will not use it daily, but you will need it to read PAC-Bayesian proofs, ergodic arguments, and diffusion model theory.",
              resources:
                "Durrett 'Probability: Theory and Examples'; Williams 'Probability with Martingales'",
            },
            {
              id: "real-analysis",
              title: "Real Analysis Essentials",
              formulas: [
                {
                  label: "Limit definition",
                  tex: String.raw`\lim_{x \to a} f(x) = L \iff \forall \varepsilon>0\; \exists \delta>0 : |x-a|<\delta \Rightarrow |f(x)-L|<\varepsilon`,
                },
              ],
              description:
                "Sequences, series, continuity, compactness, uniform convergence. The foundation of everything that says 'this converges' or 'this approximation holds uniformly.' Needed for understanding why neural networks can approximate arbitrary functions (universal approximation theorem) and why training eventually converges.",
              resources:
                "Rudin 'Principles of Mathematical Analysis'; Abbott 'Understanding Analysis' (more accessible)",
            },
            {
              id: "advanced-optimization",
              title: "Advanced Optimisation",
              formulas: [
                {
                  label: "Lagrangian (KKT)",
                  tex: String.raw`\mathcal{L}(\mathbf{x}, \boldsymbol{\lambda}) = f(\mathbf{x}) + \boldsymbol{\lambda}^\top g(\mathbf{x})`,
                },
              ],
              description:
                "Duality (Lagrangian, KKT conditions), non-convex landscapes, saddle points, second-order methods (Newton, quasi-Newton), convergence rates. SVMs are literally the dual of a constrained quadratic program. Modern optimizers (Adam, Lion, Shampoo) are motivated by second-order information without paying the full Hessian cost.",
              resources:
                "Boyd & Vandenberghe 'Convex Optimization' (free); Nocedal & Wright 'Numerical Optimization'",
            },
            {
              id: "pgms",
              title: "Probabilistic Graphical Models",
              formulas: [
                {
                  label: "Joint factorisation",
                  tex: String.raw`p(x_1, \ldots, x_n) = \prod_{i} p(x_i \mid \mathrm{pa}(x_i))`,
                },
              ],
              description:
                "Bayesian networks, Markov random fields, exact and approximate inference (variable elimination, belief propagation, variational inference, MCMC). PGMs are the mathematical language of structured uncertainty. VAEs, HMMs, and diffusion models are all PGMs. PRML (Bishop) and Murphy are the canonical treatments.",
              resources:
                "PRML (Bishop) chs. 8â€“10; Murphy 'Probabilistic Machine Learning' vol. 2",
            },
          ].map(({ id, title, formulas, description, resources }) => (
            <div
              key={id}
              id={id}
              className="rounded border border-teal/20 bg-teal/5 p-5"
            >
              <h3 className="mb-3 font-display text-lg font-semibold text-ink">
                {title}
              </h3>
              {formulas.map(({ label, tex }) => (
                <div key={label} className="mb-3">
                  <p className="mb-1 font-mono text-xs text-faded-ink">
                    {label}
                  </p>
                  <K block>{tex}</K>
                </div>
              ))}
              <p className="mb-3 text-sm leading-relaxed text-faded-ink">
                {description}
              </p>
              <p className="font-mono text-xs text-faded-ink">
                <span className="text-ink">Resources:</span> {resources}
              </p>
            </div>
          ))}
        </div>
      </StageSection>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          RESOURCES
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <StageSection
        id="resources"
        title="Resources"
        eyebrow="Ranked and curated"
      >
        <p className="mb-6 leading-relaxed text-faded-ink">
          The sequence that works for most people:{" "}
          <strong className="text-ink">
            3Blue1Brown for geometric intuition â†’ MML for ML-context
            derivations â†’ MIT 18.06 (Strang) for rigorous linear algebra â†’
            Stat 110 for probability â†’ Boyd for optimisation
          </strong>
          . These five resources cover Tiers 1â€“2 completely. Tier 3 requires
          field-specific texts listed per-topic above.
        </p>
        <ResourceGroups resources={mathResources} />
      </StageSection>

      {/* â”€â”€ Cross-links back to stages â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <StageSection
        id="back-to-stages"
        title="Where you need this"
        eyebrow="Cross-links"
      >
        <p className="mb-5 text-sm leading-relaxed text-faded-ink">
          Each stage has a mathematics section that links back here. If you are
          on a stage page and want to know where a specific topic fits in the
          ladder:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/foundations", label: "Foundations" },
            { href: "/data-analyst", label: "Data Analyst" },
            { href: "/data-scientist", label: "Data Scientist" },
            { href: "/machine-learning-engineer", label: "ML Engineer" },
            { href: "/ai-engineer", label: "AI Engineer" },
            { href: "/research", label: "Research Track" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-1.5 rounded border border-margin bg-paper/60 px-3 py-1.5 font-mono text-sm text-ink transition-colors hover:bg-margin"
            >
              {label}
            </Link>
          ))}
        </div>
      </StageSection>
    </article>
  );
}
