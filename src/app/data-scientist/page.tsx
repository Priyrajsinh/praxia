import type { Metadata } from "next";
import Link from "next/link";
import { getResourcesByStage } from "@/lib/resources";
import { validateTopics, validateStageMeta } from "@/lib/schema";
import { DepthLadder } from "@/components/stage/depth-ladder";
import { TopicChecklist } from "@/components/stage/topic-checklist";
import { ResourceGroups } from "@/components/stage/resource-group";
import { Marginalia } from "@/components/stage/marginalia";
import { StageSection } from "@/components/stage/stage-section";
import { GateWall } from "@/components/gate/gate-wall";

export const metadata: Metadata = {
  title: "Data Scientist",
  description:
    "Stage 2 of the Praxia map â€” build models that predict and explain. Full curriculum: bias-variance, regularization, trees and boosting, clustering, evaluation, uncertainty, interpretability, and the end-to-end prediction project.",
  openGraph: {
    title: "Data Scientist Â· Praxia",
    description:
      "Stage 2 â€” build models that predict and explain. Classical ML, probabilistic thinking, evaluation, interpretability, and the end-to-end prediction project.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Scientist Â· Praxia",
    description:
      "Stage 2 â€” build models that predict and explain. Classical ML, probabilistic thinking, evaluation, interpretability, and the end-to-end prediction project.",
  },
};

// â”€â”€ Stage metadata (Zod-validated at build time) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const meta = validateStageMeta({
  title: "Data Scientist",
  identity: "You build models that predict and explain.",
  stageNumber: 2,
  slug: "data-scientist",
  timeRange: "4â€“8 months from a Data Analyst base",
  prerequisites: [{ label: "Data Analyst", href: "/data-analyst" }],
  depthLadderPosition: 3, // targets Expert depth on core algorithms
});

// â”€â”€ Core concepts (Â§7 section 3) â€” Zod-validated at build time â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const topics = validateTopics([
  {
    concept: "Problem framing â€” supervised, unsupervised, and reinforcement",
    whyItMatters:
      "Choosing the wrong paradigm poisons every step that follows. A churn-prediction problem framed as clustering instead of supervised classification produces a model that cannot be evaluated or deployed. Frame first; code second.",
    depth: "Production",
  },
  {
    concept: "The bias-variance tradeoff",
    whyItMatters:
      "Every model decision â€” regularisation strength, tree depth, number of features â€” is a point on the bias-variance curve. Without this concept, hyperparameter tuning is superstition.",
    depth: "Expert",
  },
  {
    concept: "Train/val/test splits, cross-validation, and data leakage",
    whyItMatters:
      "A model that performs well on training data is not an achievement. A model that performs well on held-out data, without any information from the future, is. Data leakage is the single most common source of false wins in published ML benchmarks.",
    depth: "Expert",
  },
  {
    concept: "Feature engineering and feature selection",
    whyItMatters:
      "On tabular data, the features matter more than the model. The best XGBoost with mediocre features loses to a logistic regression with excellent features. Feature work is the highest-return activity in most real projects.",
    depth: "Production",
  },
  {
    concept: "Linear and logistic regression",
    whyItMatters:
      "Not just as baselines â€” as models whose coefficients have meaning. A logistic regression coefficient is an interpretable odds ratio. A linear regression residual plot tells you whether your model has systematic errors. These are not the simple models you skip; they are the models you understand deeply.",
    depth: "Expert",
  },
  {
    concept: "Regularisation â€” ridge (L2), lasso (L1), elastic net",
    whyItMatters:
      "Overfit a model badly enough and it memorises training data; regularisation is the penalty that prevents this. L1 gives sparsity (some weights go to zero); L2 gives stability. Knowing which to choose and why is a fundamentals question in every ML interview.",
    depth: "Production",
  },
  {
    concept: "Decision trees and random forests",
    whyItMatters:
      "The workhorse of tabular ML. Random forests are robust, require minimal hyperparameter tuning, and provide feature importances that are interpretable at first pass. Understanding how they work â€” variance reduction through bagging, feature subsampling â€” is not optional.",
    depth: "Production",
  },
  {
    concept: "Gradient boosting â€” XGBoost and LightGBM",
    whyItMatters:
      "The algorithm that wins structured/tabular competitions. XGBoost changed applied ML when it appeared; LightGBM made it practical at scale. On tabular data, boosted trees are still the default serious approach before deep learning.",
    depth: "Production",
  },
  {
    concept: "Clustering â€” k-means, hierarchical, DBSCAN",
    whyItMatters:
      "The entry to unsupervised learning. Clustering is frequently misused â€” k-means on high-dimensional data without preprocessing produces meaningless results. Knowing the assumptions of each algorithm (and when they break) is the practical skill.",
    depth: "Competent",
  },
  {
    concept: "Dimensionality reduction â€” PCA, t-SNE, UMAP",
    whyItMatters:
      "Visualising a 100-dimensional dataset requires collapsing it to 2D without destroying structure. PCA is linear and fast; t-SNE preserves local structure but distorts global; UMAP is faster than t-SNE and often better. More importantly, PCA has genuine predictive uses as preprocessing.",
    depth: "Competent",
  },
  {
    concept: "Model evaluation â€” ROC/AUC, calibration, precision/recall",
    whyItMatters:
      "Accuracy is almost never the right metric. A model predicting 'no fraud' on a 0.1% fraud dataset has 99.9% accuracy and catches zero fraud. ROC/AUC, precision-recall curves, and calibration curves are what honest evaluation looks like.",
    depth: "Expert",
  },
  {
    concept: "Uncertainty quantification and conformal prediction",
    whyItMatters:
      "A prediction without a confidence interval is an opinion. Conformal prediction provides coverage guarantees that are valid under minimal assumptions â€” no distributional assumptions, no model-correctness assumptions. This is the modern standard for honest uncertainty.",
    depth: "Production",
  },
  {
    concept: "Interpretability â€” SHAP, permutation importance",
    whyItMatters:
      "A model you cannot explain is a model you cannot debug, defend, or improve. SHAP values give each feature a locally consistent, globally coherent contribution to every prediction. The business stakeholder wants to know why; SHAP gives you the answer.",
    depth: "Production",
  },
  {
    concept:
      "Causal inference introduction â€” potential outcomes, selection bias",
    whyItMatters:
      "ML models predict; causal models explain. A model that predicts churn accurately from 'received a support call' does not tell you whether the support call caused the churn or whether unhappy customers happen to call support. Getting this wrong leads to interventions that make things worse.",
    depth: "Competent",
  },
  {
    concept:
      "Time series basics â€” stationarity, autocorrelation, decomposition",
    whyItMatters:
      "A huge fraction of real business data is time-indexed. Applying a standard train/test split to time series data gives a future-leaking evaluation. Time series has its own set of assumptions, its own train/val split protocol, and its own failure modes.",
    depth: "Competent",
  },
]);

// â”€â”€ Resources for this stage (from single source of truth) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const stageResources = getResourcesByStage("data-scientist");

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export default function DataScientistPage() {
  return (
    <GateWall stageName="Data Scientist">
      <article>
        {/* â”€â”€ Â§7 SECTION 1: Stage header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <header className="mb-2">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-faded-ink">
            Stage {meta.stageNumber} Â· {meta.timeRange}
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
                â† {p.label}
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

        {/* â”€â”€ Â§7 SECTION 2: What this role actually does â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <StageSection id="what-it-does" title="What this role actually does">
          <p>
            The data scientist&rsquo;s job is to build models that generalise:
            that make accurate predictions on data they have never seen, explain
            the patterns they find in terms a human can act on, and quantify how
            uncertain those predictions are. Not to explore data â€” that was
            Stage 1. Not to serve models at scale â€” that is Stage 3. The
            distinct skill here is the full modelling cycle, done rigorously.
          </p>

          <p>
            Day-to-day: a problem framing conversation in the morning, feature
            engineering and EDA through the early afternoon, model comparison
            and cross-validation by 3pm, a SHAP waterfall chart explaining the
            biggest prediction to a stakeholder by 4. The skill is not any
            single algorithm. It is knowing which model assumptions hold for
            this dataset, evaluating without leakage, and explaining the result
            without misrepresentation.
          </p>

          <Marginalia>
            The most common data science mistake is not a wrong algorithm â€” it
            is a wrong evaluation. A model with leaked features wins every
            benchmark and fails every deployment. Evaluation discipline is the
            job.
          </Marginalia>

          <p>
            <strong>Where this role sits relative to its neighbours.</strong>{" "}
            The data scientist is not a data analyst. You are building
            predictive and generative models, not answering &ldquo;what
            happened&rdquo; questions with statistical tests. The inference
            mindset of Stage 1 â€” p-values, confidence intervals, hypothesis
            tests â€” does not go away; it is subsumed. Every model evaluation
            is a statistical question. Every uncertainty interval is inference.
            Stage 2 uses the same mathematical machinery as Stage 1, applied to
            a different problem.
          </p>

          <p>
            The data scientist is also not a machine learning engineer. You are
            responsible for the model&rsquo;s correctness and interpretability.
            The MLE is responsible for its reliability and scale in production.
            In small teams these roles merge; in mature ML organisations they do
            not. This stage ends at the point where you hand off a
            well-specified, well-evaluated model to engineering â€” not at the
            point where it is serving traffic.
          </p>

          <p>
            <strong>The most important single concept here is leakage.</strong>{" "}
            Data leakage means information from outside the training window
            contaminating the model â€” future data, target-correlated
            preprocessing fitted on the full dataset, labels leaking into
            features. It is the reason models that look incredible in
            development fail silently in production. Everything in this stage is
            downstream of understanding why leakage happens and how to prevent
            it.
          </p>
        </StageSection>

        {/* â”€â”€ Â§7 SECTION 3: Core concepts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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

        {/* â”€â”€ Â§7 SECTION 4: Mathematics â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <StageSection id="mathematics" title="Mathematics required">
          <h3>
            Minimum â€” what you must understand to use the algorithms correctly
          </h3>

          <p>
            <strong>Linear algebra â€” the geometry of data.</strong> Vectors as
            points in space; matrices as linear transformations. Matrix
            multiplication: what it means geometrically (a composition of
            transformations), not just how to compute it. The dot product as a
            measure of alignment. Rank as the dimensionality of the column
            space. Eigenvalues and eigenvectors at the conceptual level: the
            directions a transformation stretches, and by how much. You need
            these for PCA, for understanding gradient descent on the loss
            surface, and for reading any ML paper that uses matrix notation (all
            of them).
          </p>

          <p>
            <strong>Calculus â€” the mathematics of change.</strong> Derivatives
            as rates of change. Partial derivatives: how a function changes as
            one input varies while others are held fixed. The gradient: the
            vector of partial derivatives, pointing in the direction of steepest
            ascent. The chain rule: how derivatives compose through layers of
            functions â€” this is what backpropagation computes. You do not need
            to prove the chain rule; you need to apply it fluently to composite
            functions.
          </p>

          <p>
            <strong>
              Probability and statistics â€” carried forward from Stage 1,
              extended.
            </strong>{" "}
            Joint distributions, marginal distributions, and conditional
            distributions. Maximum likelihood estimation (MLE): the parameter
            values that make the observed data most probable. The maximum a
            posteriori (MAP) estimate: MLE plus a prior, which turns out to be
            equivalent to regularisation. Bayes&rsquo; theorem not just as a
            formula but as an update rule: prior belief + evidence = posterior
            belief.
          </p>

          <p>
            <strong>Optimisation â€” why gradient descent works.</strong> A loss
            function is a surface in parameter space. Gradient descent moves
            downhill by following the negative gradient. Learning rate controls
            step size â€” too large and you oscillate or diverge, too small and
            you crawl. The intuition for why this finds a minimum for convex
            losses and a local minimum for non-convex ones. Stochastic gradient
            descent: using a noisy estimate of the gradient computed on a
            mini-batch, which is often faster and sometimes regularises the
            solution.
          </p>

          <Marginalia>
            The most important thing to understand about gradient descent is
            that it finds a local minimum, not necessarily a global one. For
            convex losses, these are the same. For everything else, the
            architecture and initialisation matter enormously â€” and that is a
            Stage 3 topic.
          </Marginalia>

          <h3>Research-grade â€” where the algorithms become legible</h3>

          <p>
            <strong>Derive the bias-variance decomposition.</strong> The
            expected test error of a model decomposes into irreducible noise,
            bias squared (how far the average model prediction is from the
            truth), and variance (how much the model varies across different
            training sets). This derivation is not hard â€” it is an expectation
            calculation using the definition of variance â€” but it makes the
            tradeoff precise and explains why averaging models (bagging) reduces
            variance without increasing bias.
          </p>

          <p>
            <strong>The geometry of L1 vs L2 regularisation.</strong> L2
            regularisation (ridge) adds a spherical constraint to the parameter
            space; the optimum lives somewhere on the sphere. L1 regularisation
            (lasso) adds a diamond-shaped constraint. The corners of the diamond
            lie on the axes â€” where many parameters are exactly zero. This
            geometric picture explains why L1 gives sparse solutions and L2 does
            not. It is one of the most illuminating geometric arguments in all
            of applied mathematics, and it takes about twenty minutes to
            understand once you have the picture in front of you.
          </p>

          <p>
            <strong>Information theory â€” entropy and KL divergence.</strong>{" "}
            Shannon entropy H(X) = âˆ’Î£ p(x) log p(x) measures the average
            uncertainty in a random variable. The KL divergence D_KL(P â€– Q)
            measures how much information is lost when Q is used to approximate
            P. These appear everywhere: cross-entropy loss is KL divergence to a
            one-hot distribution; information gain in decision trees is a
            difference in entropy; variational inference minimises KL
            divergence. One chapter of any information theory textbook is
            sufficient.
          </p>

          <p>
            <strong>SVD and its connection to PCA.</strong> The singular value
            decomposition A = UÎ£Váµ€ decomposes any matrix into rotations and
            scaling. PCA is SVD applied to the centred data matrix. The
            principal components are the right singular vectors; the explained
            variance is the squared singular values. Understanding this makes
            PCA a tool rather than a black box, and it opens the door to the
            matrix factorisation methods used in recommender systems.
          </p>

          <p>
            <strong>The EM algorithm for mixture models.</strong> The
            expectation-maximisation algorithm alternates between assigning data
            points to clusters (E step) and updating cluster parameters given
            those assignments (M step). Gaussian mixture models are the classic
            case. Understanding EM transforms k-means from a heuristic into a
            special case of a principled probabilistic algorithm, and explains
            why k-means is sensitive to initialisation.
          </p>

          <p className="text-sm text-faded-ink">
            â†’ <Link href="/mathematics#linear-algebra">Linear algebra</Link>
            <span aria-hidden="true"> Â· </span>
            <Link href="/mathematics#calculus-optimization">
              Calculus and optimisation
            </Link>
            <span aria-hidden="true"> Â· </span>
            <Link href="/mathematics#probability-statistics">
              Probability and statistics
            </Link>{" "}
            â€” each section has worked derivations and a depth ladder.
          </p>
        </StageSection>

        {/* â”€â”€ Â§7 SECTION 5: Tools & engineering â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <StageSection id="tools" title="Tools and engineering skills">
          <p>
            <strong>
              scikit-learn â€” deeply, not just the fit/predict API.
            </strong>{" "}
            Pipelines (<code>Pipeline</code> and <code>ColumnTransformer</code>)
            so that preprocessing is part of the model object and cannot leak
            between train and test. Cross-validation with{" "}
            <code>cross_val_score</code> and <code>StratifiedKFold</code> â€”
            understanding why you pass the full unfitted pipeline, not a
            pre-fitted transformer. <code>GridSearchCV</code> and{" "}
            <code>RandomizedSearchCV</code> for hyperparameter search with
            nested cross-validation when the dataset is small. The{" "}
            <code>calibration_curve</code> utility for checking whether your
            model&rsquo;s predicted probabilities are meaningful.
          </p>

          <p>
            <strong>XGBoost and LightGBM.</strong> Both are gradient boosted
            trees with different implementation strategies â€” LightGBM uses
            leaf-wise growth and histogram binning, making it faster on large
            datasets; XGBoost uses level-wise growth and is often more stable.
            In practice: try both, tune the learning rate and number of rounds
            carefully (these interact), and use early stopping on a validation
            set. Understand the regularisation parameters (<code>lambda</code>,{" "}
            <code>alpha</code>, <code>min_child_weight</code>) â€” they are not
            knobs to turn until the model improves; they are controls on the
            bias-variance tradeoff with interpretable effects.
          </p>

          <p>
            <strong>SHAP.</strong> The standard for model explanations. SHAP
            values have a theoretical basis (they are the unique attribution
            satisfying four fairness axioms from cooperative game theory) and a
            practical implementation that is fast enough for production. Know
            the difference between global explanations (feature importance
            plots, beeswarm plots) and local explanations (waterfall plots,
            force plots for a single prediction). Know when SHAP explanations
            are misleading: highly correlated features split the attribution
            between them in ways that can be unintuitive.
          </p>

          <p>
            <strong>MLflow or Weights &amp; Biases.</strong> Experiment tracking
            is not optional once you have run more than ten experiments. The
            discipline of logging every run â€” parameters, metrics, artifact
            paths â€” so you can reproduce any previous result is the difference
            between a scientist and a notebook tinkerer. Pick one, use it from
            the first experiment of every project, and never run an unlogged
            experiment again.
          </p>

          <p>
            <strong>Conformal prediction libraries.</strong> The modern standard
            for uncertainty quantification requires minimal code â€” the{" "}
            <code>MAPIE</code> library wraps scikit-learn models and provides
            coverage-guaranteed prediction intervals in a few lines. The key
            insight: calibrate on a held-out calibration set after training, not
            on the training set, to get valid coverage guarantees.
          </p>

          <p>
            <strong>Pandas and NumPy at scale.</strong> Not just the basics â€”
            efficient aggregation (<code>groupby</code> with{" "}
            <code>transform</code> for group-level features), memory management
            (dtype selection, chunked reading for large files), and vectorised
            operations instead of Python loops. A pandas operation that takes 10
            minutes to run is usually a loop in disguise; vectorise it and it
            takes 10 seconds.
          </p>
        </StageSection>

        {/* â”€â”€ Â§7 SECTION 6: The project â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <StageSection id="project" title="The project">
          <p>
            Three projects â€” an end-to-end prediction system, a feature
            engineering deep-dive, and a paper reproduction â€” together prove
            the full Stage 2 competency. The first shows you can build and
            evaluate correctly. The second shows you can squeeze performance
            from data rather than just from model choice. The third shows you
            can engage with the research literature and understand what
            reproducible results look like.
          </p>

          <p className="text-sm text-faded-ink">
            Expected total time: 12â€“18 weeks alongside the curriculum. Build
            them in order â€” each one uses skills developed in the previous.
          </p>

          {/* â”€â”€ Project 1 â”€â”€ */}
          <h3 className="lg:clear-both">
            Project 1 â€” the end-to-end prediction system (6â€“8 weeks)
          </h3>

          <p>
            <strong>What it proves:</strong> you can build a production-credible
            predictive model â€” correctly evaluated, properly calibrated,
            uncertainty-quantified, and explained.
          </p>

          <p>
            Choose a tabular classification or regression problem with genuine
            stakes: credit risk, customer churn prediction, medical outcome
            prediction, equipment failure forecasting, or any domain where the
            prediction has a real cost if it is wrong. The dataset must have at
            least 10,000 rows, at least 15 features of mixed types (numeric,
            categorical, at minimum one date), and a meaningful class imbalance
            (for classification) or non-trivial noise (for regression). Public
            sources: Kaggle, the UCI ML Repository, government open data
            portals.
          </p>

          <p>
            Execute the full pipeline in order, using a scikit-learn Pipeline
            that wraps every step from raw features to final predictions:
          </p>

          <ol>
            <li>
              <strong>Problem framing and baseline.</strong> State the
              prediction task formally: what is the input, what is the output,
              what is the evaluation metric, and why. Build a baseline â€” a
              dummy classifier or the mean prediction for regression â€” and
              record its performance. Every model you build for the rest of the
              project must beat the baseline or it is not progress.
            </li>
            <li>
              <strong>EDA and leakage audit.</strong> For every feature, ask
              whether it can be known at prediction time in production. A
              feature computed from future data, a feature that directly encodes
              the target, or a feature that is only available after the event
              you are predicting â€” all are leaks. Document your audit. List
              every feature you excluded and why.
            </li>
            <li>
              <strong>Feature engineering.</strong> Build at least five derived
              features that your initial EDA suggested are meaningful. Document
              the hypothesis behind each: &ldquo;users who contacted support
              more than twice in the 30 days before their renewal date churn at
              3Ã— the base rate â€” so I am creating a binary flag for
              this.&rdquo; Test whether each feature improves performance in
              isolation before adding it to the full model.
            </li>
            <li>
              <strong>Model comparison under proper cross-validation.</strong>{" "}
              Compare at minimum: logistic regression (your interpretable
              baseline), random forest, XGBoost, and LightGBM. Use stratified
              5-fold or 10-fold cross-validation with the full Pipeline fitted
              inside each fold â€” never fit a preprocessor on the full dataset
              before splitting. Report mean Â± standard deviation of your
              primary metric across folds. The standard deviation tells you
              whether your result is stable.
            </li>
            <li>
              <strong>Calibration.</strong> For classification: plot the
              calibration curve of your best model. Is the predicted probability
              of 0.7 associated with about 70% of positive outcomes? If not,
              apply Platt scaling or isotonic regression calibration and
              re-plot. A model whose probabilities are not calibrated should not
              be used to make decisions that depend on those probabilities (most
              real decisions do).
            </li>
            <li>
              <strong>Conformal prediction intervals.</strong> Wrap your best
              model in a conformal predictor (MAPIE or equivalent). Set a
              coverage level of 90%. Report what fraction of held-out test
              examples fall within the predicted interval â€” it should be close
              to 90%. This is the first place you will encounter what
              &ldquo;coverage-guaranteed uncertainty&rdquo; actually means in
              practice.
            </li>
            <li>
              <strong>Interpretability.</strong> Compute SHAP values for your
              best model. Produce: (1) a global feature importance beeswarm
              plot, (2) a local explanation for the three most interesting
              individual predictions (the highest-confidence correct, the
              highest-confidence wrong, and the most uncertain). For each local
              explanation, write one sentence describing what the model
              &ldquo;saw&rdquo; in the data and whether the explanation makes
              domain sense.
            </li>
          </ol>

          <p>
            <strong>
              The deliverable is a technical report, not a notebook.
            </strong>{" "}
            A 10â€“15 page document: problem definition, data description
            (including the leakage audit), methods (every preprocessing and
            modelling step), results (all cross-validation numbers in a table,
            calibration plots, conformal coverage result), interpretation (SHAP
            plots + prose explanation), limitations (what the model cannot do
            and why), and a one-page executive summary written for a
            non-technical stakeholder. The notebook is the appendix. The report
            is the deliverable.
          </p>

          <Marginalia>
            The conformal prediction section will frustrate you the first time.
            The coverage guarantee is real but the intervals will be wider than
            you expect â€” because your model is genuinely that uncertain. That
            honesty is the point.
          </Marginalia>

          {/* â”€â”€ Project 2 â”€â”€ */}
          <h3 className="lg:clear-both">
            Project 2 â€” the feature engineering deep-dive (2â€“3 weeks)
          </h3>

          <p>
            <strong>What it proves:</strong> you understand that features matter
            more than models, and you can engineer them systematically rather
            than by intuition alone.
          </p>

          <p>
            Take a Kaggle competition dataset (any structured competition,
            active or historical) with a public leaderboard. Start with a
            baseline: raw features, minimal preprocessing, XGBoost with default
            hyperparameters. Record the cross-validation score and leaderboard
            position. Then, over two weeks, engineer features systematically:
          </p>

          <ul>
            <li>
              <strong>Interaction features:</strong> products and ratios of
              numeric features you hypothesise interact. Test each one: does
              adding it improve cross-validation score?
            </li>
            <li>
              <strong>Aggregation features:</strong> for grouped data (users,
              products, time windows), compute group statistics (mean, std, max,
              min, percentiles) and join them back. These are often the
              highest-value features in practice.
            </li>
            <li>
              <strong>Temporal features:</strong> if there is a date column,
              extract day of week, month, quarter, time since a reference event,
              and any domain-relevant seasonal signals.
            </li>
            <li>
              <strong>Encoding decisions:</strong> for high-cardinality
              categoricals, compare target encoding vs ordinal encoding vs
              leave-one-out encoding. Document which works better and why.
            </li>
          </ul>

          <p>
            The deliverable is a notebook documenting every feature you tried,
            the hypothesis behind it, and whether it improved performance.
            Expected outcome: a 5â€“15% improvement over baseline from features
            alone, before any hyperparameter tuning. Write a half-page
            reflection: which features helped most, which surprised you, and
            what you would try with more time.
          </p>

          {/* â”€â”€ Project 3 â”€â”€ */}
          <h3 className="lg:clear-both">
            Project 3 â€” reproduce and extend a published result (3â€“4 weeks)
          </h3>

          <p>
            <strong>What it proves:</strong> you can engage with the research
            literature and understand what rigorous evaluation looks like.
          </p>

          <p>
            Choose a paper that presents a machine learning algorithm or method
            with benchmark results on a public dataset. A strong default: the
            XGBoost paper (Chen &amp; Guestrin, 2016 â€” linked in the Resources
            section above) on any of its public benchmarks. Alternatively, find
            a recent tabular-ML paper on Papers With Code that reports results
            on a UCI or Kaggle dataset you can download. The criterion is
            simple: the paper must describe its experimental setup clearly
            enough that you can reproduce it from scratch.
          </p>

          <ol>
            <li>
              <strong>Reproduce the number.</strong> Implement or use the
              library implementation, reproduce the exact dataset split and
              preprocessing the paper describes, and run the evaluation. How
              close did you get to the reported number? Any discrepancy is worth
              investigating: is it a random seed difference, a preprocessing
              difference, a library version difference?
            </li>
            <li>
              <strong>Characterise the sensitivity.</strong> Vary two
              hyperparameters around the values the paper reports. How sensitive
              is performance to each? Papers often report results at a single
              tuned point without showing the sensitivity landscape â€” this
              step reveals whether the reported result is robust or fragile.
            </li>
            <li>
              <strong>Write a reproduction report.</strong> One to two pages:
              what you reproduced (or failed to reproduce and why), what the
              sensitivity analysis showed, and one observation that surprised
              you. This is the foundation of the skill of reading research
              papers critically â€” not accepting numbers, but checking them.
            </li>
          </ol>

          {/* â”€â”€ Extensions â”€â”€ */}
          <h3>Senior extension â€” model monitoring design</h3>
          <p>
            For your Project 1 model, design (but do not implement) a monitoring
            strategy: which metrics would you track in production, how would you
            detect data drift (PSI, KS test, or population stability analysis),
            and what threshold would trigger a retraining run? Write a one-page
            monitoring specification as if you were handing it to an ML engineer
            for implementation. This is the bridge to Stage 3 thinking:
            &ldquo;my model is not done when it is trained; it is done when it
            is maintained.&rdquo;
          </p>

          <h3>Research extension â€” novel evaluation</h3>
          <p>
            Identify a failure mode of your Project 1 model that is not captured
            by your primary metric â€” a subgroup where performance is
            systematically worse, a region of the input space where calibration
            breaks down, or a tail scenario where the conformal intervals are
            unexpectedly wide. Propose and implement a secondary evaluation that
            surfaces this failure. Write it up as a one-page appendix to your
            technical report. The ability to identify the failure modes your
            primary metric misses is the research-grade version of model
            evaluation.
          </p>
        </StageSection>

        {/* â”€â”€ Â§7 SECTION 7: Resources â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <StageSection id="resources" title="Resources">
          <p className="mb-6 text-faded-ink">
            Start with <strong>ISLR</strong> â€” it is the canonical entry,
            free, and available in both R and Python editions. Pair it with{" "}
            <strong>MML</strong> for the mathematics and{" "}
            <strong>StatQuest</strong> for intuition on each algorithm.{" "}
            <strong>Hands-On ML</strong> is the practical companion you work
            through when you want code. <strong>ESL</strong> is the rigorous big
            brother â€” consult it when ISLR&rsquo;s answer is &ldquo;it&rsquo;s
            more complicated than that.&rdquo; The mathematics resources
            (3Blue1Brown, MIT 18.06, Stat 110) cover the linear algebra,
            calculus, and probability this stage requires â€” use them in
            parallel with ISLR, not after.
          </p>
          <ResourceGroups resources={stageResources} />
        </StageSection>

        {/* â”€â”€ Â§7 SECTION 8: How you know you're done â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <StageSection id="done" title="How you know you&rsquo;re done">
          <p>
            Exit criteria â€” you can answer &ldquo;yes&rdquo; to all of these:
          </p>

          <ul>
            <li>
              Given a tabular dataset and a prediction task, you can choose
              between linear regression, logistic regression, random forest, and
              XGBoost â€” and justify the choice based on the number of samples,
              the presence of interactions, the interpretability requirement,
              and the training time budget.
            </li>
            <li>
              You can implement a scikit-learn Pipeline that wraps preprocessing
              and a model, run stratified k-fold cross-validation with the full
              pipeline, and explain why fitting the preprocessor inside each
              fold matters.
            </li>
            <li>
              You can explain what a SHAP value is â€” not just how to compute
              it, but what it means (the marginal contribution of a feature
              value, averaged over all possible feature orderings) â€” and
              describe a scenario where the SHAP explanation could be
              misleading.
            </li>
            <li>
              You can compute a conformal prediction interval and state its
              coverage guarantee precisely: &ldquo;with probability at least 1
              âˆ’ Î± over the calibration set, the interval contains the true
              label.&rdquo; You understand that this guarantee is marginal, not
              conditional.
            </li>
            <li>
              An interviewer says &ldquo;your model has 94% accuracy on the test
              set â€” how confident are you in this number?&rdquo; You can walk
              through: class imbalance, the evaluation protocol (single split
              vs. cross-validation), the possibility of leakage, calibration,
              and whether accuracy is even the right metric for this task.
            </li>
            <li>
              You understand the difference between correlation and causation at
              the operational level: you can give a concrete example from your
              own project where a predictive feature is not a causal factor, and
              explain the implication for any intervention based on that
              feature.
            </li>
          </ul>

          <h3>Self-test questions</h3>
          <ol>
            <li>
              You train a random forest on a dataset with 50 features. Feature
              importance (mean decrease in impurity) shows Feature A as most
              important. You remove Feature A, retrain, and performance drops by
              less than 0.5%. Explain what likely happened. How would you
              properly evaluate whether Feature A is genuinely important?
            </li>
            <li>
              Your logistic regression classifier has ROC-AUC = 0.91 on the test
              set. Your stakeholder asks: &ldquo;If the model outputs a
              probability of 0.7 for a customer, does that mean there is really
              a 70% chance they will churn?&rdquo; How do you answer? What would
              you check?
            </li>
            <li>
              Explain the bias-variance tradeoff to a non-technical product
              manager in two sentences. Then explain it formally: write the
              expected mean-squared error decomposition and identify each term.
            </li>
            <li>
              You are building a model to predict customer lifetime value (CLV)
              using features including the number of support tickets a customer
              has filed. Should you include this feature? What question would
              you ask to determine whether it is a leak?
            </li>
            <li>
              Your XGBoost model achieves 0.88 AUC in cross-validation but 0.72
              AUC on a held-out test set from three months later. List three
              possible explanations in decreasing order of likelihood, and
              describe how you would diagnose each.
            </li>
          </ol>
        </StageSection>

        {/* â”€â”€ Â§7 SECTION 9: Bridge to next stage â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <StageSection id="next-stage" title="Bridge to the next stage">
          <p>
            The data scientist asks: can I build a model that works? The machine
            learning engineer asks: can I make a model work reliably, at scale,
            for months? These are different questions, and they require
            different skills.
          </p>

          <p>
            Stage 3 is the transition from &ldquo;this model works in my
            notebook&rdquo; to &ldquo;this model works in production at 10,000
            requests per second, with monitoring, retraining pipelines, and a
            team of engineers depending on it.&rdquo; The mathematics of Stage 2
            continues â€” you need it for deep learning â€” but it is joined by
            software engineering, systems thinking, and the discipline of making
            things fail gracefully rather than just making them work once.
          </p>

          <p>
            Deep learning enters properly at Stage 3. The neural network is not
            a mystery if you understand the chain rule, gradient descent, and
            the building blocks from Stage 2. It is a very large, very
            expressive model trained by a very general optimisation algorithm.
            The concepts are the same; the scale and the failure modes are
            different.
          </p>

          <p>
            <strong>What to take into Stage 3:</strong> the modelling discipline
            (never evaluate without a proper protocol, never deploy without
            monitoring), Python fluency with pandas and scikit-learn, Git and
            experiment tracking as reflexes, and a working mental model of the
            bias-variance tradeoff. The research branch is available now â€” if
            Stage 3 production work is not your direction, Stage 2 is the point
            to consider branching toward research.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/machine-learning-engineer"
              className="inline-flex items-center gap-1.5 rounded border border-route-red bg-route-red/5 px-4 py-2 font-mono text-sm text-ink transition-colors hover:bg-route-red hover:text-primary-foreground"
            >
              ML Engineer â†’
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-1.5 rounded border border-teal bg-teal/5 px-4 py-2 font-mono text-sm text-ink transition-colors hover:bg-teal hover:text-paper"
            >
              Research Track â†’
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
    </GateWall>
  );
}
