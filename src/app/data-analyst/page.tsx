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
  title: "Data Analyst",
  description:
    "Stage 1 of the Praxia map — turn questions into evidence. Full curriculum: statistical inference, EDA, SQL, visualisation, and the statistical report project.",
};

// ── Stage metadata (Zod-validated at build time) ───────────────────────────
const meta = validateStageMeta({
  title: "Data Analyst",
  identity: "You turn questions into evidence.",
  stageNumber: 1,
  slug: "data-analyst",
  timeRange: "3–6 months from a Foundations base",
  prerequisites: [{ label: "Foundations", href: "/foundations" }],
  depthLadderPosition: 2, // targets Production depth on core topics
});

// ── Core concepts (§7 section 3) — Zod-validated at build time ────────────
const topics = validateTopics([
  {
    concept: "The analysis lifecycle and question framing",
    whyItMatters:
      "Every downstream mistake — wrong test, misleading chart, bad conclusion — traces back to a poorly framed question. Define it precisely first.",
    depth: "Competent",
  },
  {
    concept: "Data cleaning and wrangling",
    whyItMatters:
      "Real data is never clean. If you cannot clean it, you cannot analyse it; garbage in, garbage out is not a cliché, it is the job.",
    depth: "Competent",
  },
  {
    concept: "Exploratory data analysis (EDA)",
    whyItMatters:
      "Models and tests are blind to patterns a well-made scatter plot reveals immediately. EDA is not optional warm-up — it is where the real story hides.",
    depth: "Competent",
  },
  {
    concept: "Descriptive statistics — location, dispersion, shape",
    whyItMatters:
      "Mean, variance, skewness, IQR: these are the vocabulary of quantitative argument. Without them you are describing data in adjectives.",
    depth: "Competent",
  },
  {
    concept: "Probability distributions",
    whyItMatters:
      "Every parametric hypothesis test assumes a distribution. Violating the assumption invalidates the test. Know which applies and how to check.",
    depth: "Competent",
  },
  {
    concept: "Correlation versus causation",
    whyItMatters:
      "Confusing the two is the most consequential analytical mistake in business. A correlation justifies further investigation; only a controlled experiment justifies action.",
    depth: "Production",
  },
  {
    concept: "Inferential statistics — sampling, CIs, hypothesis testing",
    whyItMatters:
      "The formal apparatus for answering 'is this difference real?': t-tests, ANOVA, chi-square, non-parametric alternatives. The conclusion is meaningless if this is wrong.",
    depth: "Production",
  },
  {
    concept: "p-values and their seven common misinterpretations",
    whyItMatters:
      "p < 0.05 does not mean the effect is real, important, or reproducible. Misreading p-values has misled entire research fields.",
    depth: "Expert",
  },
  {
    concept: "Effect sizes and multiple-comparison correction",
    whyItMatters:
      "Statistical significance says the effect is non-zero; Cohen's d and η² say whether it matters. Running 20 tests uncorrected gives you roughly one false positive for free.",
    depth: "Expert",
  },
  {
    concept: "Experiment design and A/B testing basics",
    whyItMatters:
      "The analyst who designs experiments properly — randomisation, power analysis, pre-registration — is ten times more valuable than one who only analyses completed studies.",
    depth: "Production",
  },
  {
    concept: "Data visualisation principles",
    whyItMatters:
      "Bad charts lie. Good charts persuade. Excellent charts reveal things the analyst missed. Tufte's ink-to-data ratio is discipline, not pedantry.",
    depth: "Competent",
  },
  {
    concept: "Dashboarding",
    whyItMatters:
      "Eighty percent of analytical output is a dashboard. Building one that answers the right question and gets used is table stakes for the role.",
    depth: "Competent",
  },
  {
    concept: "Storytelling with data",
    whyItMatters:
      "An analysis that does not change a decision was a waste of time. Translating a statistical result into a narrative that drives action is a real, learnable skill.",
    depth: "Production",
  },
  {
    concept: "SQL for analytics — joins, window functions, CTEs",
    whyItMatters:
      "SQL is how you access the majority of enterprise data. Window functions and CTEs are what separate the analyst from the spreadsheet user.",
    depth: "Competent",
  },
]);

// ── Resources for this stage (from single source of truth) ─────────────────
const stageResources = getResourcesByStage("data-analyst");

// ══════════════════════════════════════════════════════════════════════════════

export default function DataAnalystPage() {
  return (
    <article>
      {/* ── §7 SECTION 1: Stage header ──────────────────────────────────── */}
      <header className="mb-2">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-faded-ink">
          Stage {meta.stageNumber} · {meta.timeRange}
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
          The data analyst&rsquo;s job is to turn a business question into a
          defensible answer. Not to build predictive models — that comes later —
          but to frame the question precisely, find or clean the data that
          speaks to it, apply the right statistical test, and communicate the
          result in a way that changes what someone does tomorrow.
        </p>

        <p>
          Day-to-day: SQL queries at 9am, a pivot table at 11, a seaborn scatter
          plot at 2pm, a deck to stakeholders by 4. The skill is not any single
          tool. It is the judgment to choose the right statistical approach,
          interpret it without the seven standard mistakes, and translate it for
          a room that does not speak statistics.
        </p>

        <Marginalia>
          Most people who call themselves data scientists have never correctly
          run an ANOVA. The analyst who knows statistics cold is more valuable
          than the model-builder who does not.
        </Marginalia>

        <p>
          <strong>Where this role sits relative to its neighbours.</strong> The
          data analyst is not a data scientist. You may never train a predictive
          model — and that is fine, because what you do is often harder to get
          right. Designing a sound experiment, choosing between parametric and
          non-parametric tests, correctly interpreting a confidence interval:
          these demand a rigour that much &ldquo;data science&rdquo; shortcuts.
          A bad model overfits. A bad analysis gives the company the wrong
          answer, which they then act on confidently.
        </p>

        <p>
          The role is also not a data engineer. You are a consumer of pipelines,
          not a builder of them. Your work begins when the data is (roughly)
          available. In practice you will still need to clean it, reshape it,
          and understand its provenance — the boundary blurs daily.
        </p>

        <p>
          What this stage is really training is statistical thinking: knowing
          your assumptions, checking them, quantifying uncertainty honestly, and
          knowing exactly what the data can and cannot say. That discipline is
          the foundation for every subsequent stage on this map.
        </p>
      </StageSection>

      {/* ── §7 SECTION 3: Core concepts ─────────────────────────────────── */}
      <StageSection id="core-concepts" title="Core concepts to master">
        <p className="mb-5 text-faded-ink text-sm">
          Depth tags:{" "}
          <span className="font-mono text-xs uppercase">Competent</span> = can
          do independently,{" "}
          <span className="font-mono text-xs uppercase text-route-red">
            Production
          </span>{" "}
          = reliable under pressure,{" "}
          <span className="font-mono text-xs uppercase text-teal">Expert</span>{" "}
          = can teach it and debug edge cases.
        </p>
        <TopicChecklist topics={topics} />
      </StageSection>

      {/* ── §7 SECTION 4: Mathematics ───────────────────────────────────── */}
      <StageSection id="mathematics" title="Mathematics required">
        <h3>Minimum — what you must understand to do this job properly</h3>

        <p>
          <strong>Probability basics:</strong> sample spaces, events,
          conditional probability, Bayes&rsquo; theorem at a conceptual level.
          Not the full measure-theoretic machinery — but enough to know why the
          t-test has a null distribution and what &ldquo;sampling from a
          population&rdquo; means.
        </p>

        <p>
          <strong>Distributions:</strong> the normal distribution (and why the
          CLT makes it ubiquitous), the t-distribution (and why it has heavier
          tails), the chi-square and F distributions (and what they model). Know
          the shapes, the parameters, and the conditions under which each
          appears. You do not need to derive them — you need to know which one
          applies.
        </p>

        <p>
          <strong>The logic of inference:</strong> what a null hypothesis is and
          why we test against it. What a p-value actually is (the probability of
          observing data at least this extreme, given the null is true — not the
          probability the null is false). What a 95% confidence interval is (a
          procedure that generates intervals containing the true parameter 95%
          of the time — not a 95% probability that this particular interval
          contains it).
        </p>

        <p>
          <strong>Descriptive formulas:</strong> mean, weighted mean, variance,
          standard deviation, percentiles, IQR. These are vocabulary; fluency is
          expected.
        </p>

        <Marginalia>
          The single most useful thing to understand deeply: why the t-test uses
          the t-distribution and not the normal. The answer involves the
          randomness of the sample variance. Everything else follows from that.
        </Marginalia>

        <h3>Research-grade — where real understanding lives</h3>

        <p>
          <strong>Derive the t-statistic.</strong> Understand why dividing by{" "}
          <em>s / √n</em> gives a t-distribution rather than a normal — the
          randomness of <em>s</em> is the reason. This derivation makes the
          whole apparatus of inference legible.
        </p>

        <p>
          <strong>The F-ratio in ANOVA geometrically.</strong> It is the ratio
          of between-group variance to within-group variance. When groups
          genuinely differ, the numerator is inflated; when they do not, both
          terms are just noise and their ratio follows the F-distribution under
          the null. Understanding this geometrically — not just computationally
          — transforms ANOVA from a black box into a sensible quantity.
        </p>

        <p>
          <strong>The CLT stated properly.</strong> Not &ldquo;big n →
          normal,&rdquo; but: the distribution of the sample mean converges to
          normal at rate O(1/√n), regardless of the population distribution,
          under finite variance. Understand when it fails: heavy-tailed
          distributions, small samples from skewed populations, correlated
          observations.
        </p>

        <p>
          <strong>Multiple comparisons in depth.</strong> Why running 20
          independent tests at α = 0.05 yields roughly one false positive by
          chance. The Bonferroni correction (divide α by the number of tests)
          and why it is conservative. The Benjamini-Hochberg procedure and why
          it is often preferred — it controls the false discovery rate rather
          than the family-wise error rate, giving more power when many tests are
          run.
        </p>

        <p className="text-sm text-faded-ink">
          →{" "}
          <Link href="/mathematics#probability">
            Probability &amp; Statistics in the mathematics curriculum
          </Link>{" "}
          covers this material in full, with worked derivations.
        </p>
      </StageSection>

      {/* ── §7 SECTION 5: Tools & engineering ───────────────────────────── */}
      <StageSection id="tools" title="Tools and engineering skills">
        <p>
          <strong>Python:</strong> pandas and NumPy are the workhorses.
          matplotlib and seaborn for visualisation. scipy.stats for hypothesis
          tests. statsmodels for regression and rigorous statistical modelling.
          You should be comfortable with the full data manipulation lifecycle in
          pandas: cleaning, groupby, merge, reshape, time series indexing. Write
          clean, reproducible notebooks — run from top to bottom, dependencies
          explicit.
        </p>

        <p>
          <strong>SQL:</strong> not just SELECT. Window functions (ROW_NUMBER,
          LAG/LEAD, RANK, running totals), common table expressions, subqueries,
          and the ability to reason about what a query is actually doing. Most
          production analytical data lives in a warehouse (BigQuery, Redshift,
          Snowflake); SQL is how you access it. Fluency is non-negotiable.
        </p>

        <p>
          <strong>Excel / Google Sheets:</strong> you will use these regardless
          of your Python fluency. VLOOKUP, INDEX-MATCH, pivot tables, and
          conditional formatting are not optional when you work with
          non-technical stakeholders who live in spreadsheets.
        </p>

        <p>
          <strong>A BI tool — Tableau or Power BI:</strong> the ability to build
          an interactive dashboard a stakeholder can self-serve is a genuine
          professional skill. Tableau Public is free and sufficient for building
          and sharing work publicly.
        </p>

        <p>
          <strong>Git:</strong> yes, even for analysis work. Version-control
          your notebooks, your SQL scripts, your data cleaning steps. Analysis
          that cannot be reproduced is analysis that cannot be trusted — and
          cannot be corrected when someone finds a mistake six months later.
        </p>
      </StageSection>

      {/* ── §7 SECTION 6: The project ────────────────────────────────────── */}
      <StageSection id="project" title="The project">
        <p>
          The most instructive project at this stage is a rigorous statistical
          report answering real research questions — the kind that appears in
          MS-entrance assignments, corporate A/B test post-mortems, and
          peer-reviewed applied papers. This is not a Kaggle score. It is a
          document that demonstrates you can think statistically and communicate
          that thinking clearly.
        </p>

        <h3>
          The flagship: a full statistical analysis on student performance data
        </h3>

        <p>
          Use the student performance dataset (publicly available). Frame three
          testable research questions — for example: &ldquo;Do students who
          study more than 10 hours per week score significantly higher on maths
          exams than those who study less?&rdquo; For each question:
        </p>

        <ol>
          <li>State the null and alternative hypotheses formally (H₀, H₁).</li>
          <li>
            Check assumptions: normality (Shapiro-Wilk + QQ plot), homogeneity
            of variances (Levene&rsquo;s test), independence of observations.
          </li>
          <li>
            Run the appropriate test: independent-samples t-test for two groups,
            one-way ANOVA for multiple groups. Apply a non-parametric
            alternative if assumptions fail.
          </li>
          <li>
            Report post-hoc comparisons if ANOVA is significant (Tukey HSD or
            Games-Howell if variances are unequal).
          </li>
          <li>
            Compute and report effect sizes: Cohen&rsquo;s d for t-tests, η² for
            ANOVA.
          </li>
          <li>
            Write results in APA format: &ldquo;A one-way ANOVA revealed a
            significant effect of study hours on maths performance, F(2, 297) =
            14.3, p &lt; .001, η² = .088, indicating a medium effect.&rdquo;
          </li>
        </ol>

        <p>
          <strong>The report — not the notebook — is the deliverable.</strong>{" "}
          The notebook is the working. A grader or interviewer should be able to
          read the report, understand exactly what was done and why each choice
          was made, and trust the conclusions. If the conclusion requires
          reading the code to follow, the report is not finished.
        </p>

        <Marginalia>
          The test is table stakes. The writing is the job. I have reviewed
          analyses where the statistics were correct and the conclusion was
          still wrong because the framing was unclear. Write the report like you
          are defending it.
        </Marginalia>

        <h3>Senior extension</h3>
        <p>
          Replace one group-comparison analysis with a multiple linear
          regression. Report standardised coefficients, interpret them correctly
          (holding other variables constant), check residuals for the regression
          assumptions, and discuss which predictors are practically significant
          versus statistically significant. The distinction matters.
        </p>

        <h3>Research extension</h3>
        <p>
          Write a pre-registration before running any test. Specify your
          hypotheses, your analysis plan, your stopping rule, and your minimum
          detectable effect size (computed via power analysis using G*Power or
          scipy). Then run the analysis and report exactly what you found —
          including null results. This is the discipline of reproducible
          research. Build it now, before you have bad habits to unlearn.
        </p>
      </StageSection>

      {/* ── §7 SECTION 7: Resources ──────────────────────────────────────── */}
      <StageSection id="resources" title="Resources">
        <p className="mb-6 text-faded-ink">
          Ordered by when to use them. The highest-ROI combination at this stage
          is <strong>StatQuest + Practical Statistics</strong> — intuition and
          practice in parallel. OpenIntro Statistics is the best free
          alternative to Practical Statistics if cost is a constraint. Every
          free canonical option is flagged.
        </p>
        <ResourceGroups resources={stageResources} />
      </StageSection>

      {/* ── §7 SECTION 8: How you know you're done ───────────────────────── */}
      <StageSection id="done" title="How you know you&rsquo;re done">
        <p>Exit criteria — you can answer &ldquo;yes&rdquo; to all of these:</p>

        <ul>
          <li>
            Given a two-sample comparison, you choose between a t-test, a
            Mann-Whitney U test, and their alternatives, and justify the choice
            based on sample size, distributional assumptions, and measurement
            scale.
          </li>
          <li>
            You can explain what a p-value is — and five things it is not — to
            someone without a statistics background.
          </li>
          <li>
            You can identify whether an A/B test result is underpowered and
            compute the required sample size for a given effect size and α.
          </li>
          <li>
            Given a multiple-comparison problem, you apply an appropriate
            correction and explain the trade-off between Type I (false
            positives) and Type II (false negatives) error.
          </li>
          <li>
            Your visualisations are Tuftian: ink encodes data, chart type
            matches the question, axes are honest, the title states the
            conclusion.
          </li>
          <li>
            An interviewer says &ldquo;walk me through a statistical analysis
            you ran&rdquo; and you have a real answer with precise methods,
            honest caveats, and a conclusion you stand behind.
          </li>
        </ul>

        <h3>Self-test questions</h3>
        <ol>
          <li>
            A coin flips heads 57 times in 100 tosses. Write the null and
            alternative hypotheses, run a two-sided binomial test, and interpret
            the result. What is the p-value, and what does it mean?
          </li>
          <li>
            You run 20 independent A/B tests on a website. Three show p &lt;
            0.05. How many false positives would you expect by chance? What
            correction do you apply, and what does it cost you in statistical
            power?
          </li>
          <li>
            What is the difference between statistical significance and
            practical significance? Construct a concrete example where one is
            present without the other.
          </li>
          <li>
            A t-test requires that the data be normally distributed. Your sample
            has n&nbsp;=&nbsp;150. Does this matter? Explain, with reference to
            the Central Limit Theorem.
          </li>
          <li>
            You run a one-way ANOVA with three groups and get F(2,&nbsp;147)
            &nbsp;=&nbsp;6.2, p&nbsp;=&nbsp;.003. What can you conclude? What
            can you not conclude? What do you run next?
          </li>
        </ol>
      </StageSection>

      {/* ── §7 SECTION 9: Bridge to next stage ──────────────────────────── */}
      <StageSection id="next-stage" title="Bridge to the next stage">
        <p>
          The data analyst answers questions about what happened and whether a
          difference is real. The data scientist asks: can I predict what will
          happen next?
        </p>

        <p>
          You carry forward everything: statistical rigour, SQL fluency, the
          habit of checking assumptions, and honesty about what the data can and
          cannot say. What changes is the scale of the mathematics and the reach
          of the toolset. Linear algebra and calculus — optional context at this
          stage — become essential. The scikit-learn API enters. You start
          thinking in features rather than variables, in training sets rather
          than samples, in predictive error rather than inferential error.
        </p>

        <p>
          The biggest conceptual shift is from inference to prediction.
          Inference asks: what does this sample tell me about the population?
          Prediction asks: given these inputs, what is the output? They use the
          same probability theory. The questions are fundamentally different,
          and that difference shapes everything about how you evaluate success.
        </p>

        <p>
          <strong>What to take into Stage 2:</strong> probability and
          distributions, solid; the discipline of not fooling yourself; Python
          and pandas, fluent; the habit of measuring and communicating
          uncertainty. These compound. They do not need to be relearned — only
          extended.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Link
            href="/data-scientist"
            className="inline-flex items-center gap-1.5 rounded border border-route-red bg-route-red/5 px-4 py-2 font-mono text-sm text-route-red transition-colors hover:bg-route-red hover:text-paper"
          >
            Data Scientist →
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
