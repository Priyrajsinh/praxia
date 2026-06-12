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
    "Stage 1 of the Praxia map â€” turn questions into evidence. Full curriculum: statistical inference, EDA, SQL, visualisation, and the statistical report project.",
  openGraph: {
    title: "Data Analyst Â· Praxia",
    description:
      "Stage 1 â€” turn questions into evidence. Statistical inference, SQL at scale, A/B testing, and the rigorous statistical report project.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Analyst Â· Praxia",
    description:
      "Stage 1 â€” turn questions into evidence. Statistical inference, SQL at scale, A/B testing, and the rigorous statistical report project.",
  },
};

// â”€â”€ Stage metadata (Zod-validated at build time) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const meta = validateStageMeta({
  title: "Data Analyst",
  identity: "You turn questions into evidence.",
  stageNumber: 1,
  slug: "data-analyst",
  timeRange: "3â€“6 months from a Foundations base",
  prerequisites: [{ label: "Foundations", href: "/foundations" }],
  depthLadderPosition: 2, // targets Production depth on core topics
});

// â”€â”€ Core concepts (Â§7 section 3) â€” Zod-validated at build time â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const topics = validateTopics([
  {
    concept: "The analysis lifecycle and question framing",
    whyItMatters:
      "Every downstream mistake â€” wrong test, misleading chart, bad conclusion â€” traces back to a poorly framed question. Define it precisely first.",
    depth: "Competent",
  },
  {
    concept: "Data cleaning and wrangling",
    whyItMatters:
      "Real data is never clean. If you cannot clean it, you cannot analyse it; garbage in, garbage out is not a clichÃ©, it is the job.",
    depth: "Competent",
  },
  {
    concept: "Exploratory data analysis (EDA)",
    whyItMatters:
      "Models and tests are blind to patterns a well-made scatter plot reveals immediately. EDA is not optional warm-up â€” it is where the real story hides.",
    depth: "Competent",
  },
  {
    concept: "Descriptive statistics â€” location, dispersion, shape",
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
    concept: "Inferential statistics â€” sampling, CIs, hypothesis testing",
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
      "Statistical significance says the effect is non-zero; Cohen's d and Î·Â² say whether it matters. Running 20 tests uncorrected gives you roughly one false positive for free.",
    depth: "Expert",
  },
  {
    concept: "Experiment design and A/B testing basics",
    whyItMatters:
      "The analyst who designs experiments properly â€” randomisation, power analysis, pre-registration â€” is ten times more valuable than one who only analyses completed studies.",
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
    concept: "SQL for analytics â€” joins, window functions, CTEs",
    whyItMatters:
      "SQL is how you access the majority of enterprise data. Window functions and CTEs are what separate the analyst from the spreadsheet user.",
    depth: "Competent",
  },
]);

// â”€â”€ Resources for this stage (from single source of truth) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const stageResources = getResourcesByStage("data-analyst");

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export default function DataAnalystPage() {
  return (
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
          The data analyst&rsquo;s job is to turn a business question into a
          defensible answer. Not to build predictive models â€” that comes later
          â€” but to frame the question precisely, find or clean the data that
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
          model â€” and that is fine, because what you do is often harder to get
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
          and understand its provenance â€” the boundary blurs daily.
        </p>

        <p>
          What this stage is really training is statistical thinking: knowing
          your assumptions, checking them, quantifying uncertainty honestly, and
          knowing exactly what the data can and cannot say. That discipline is
          the foundation for every subsequent stage on this map.
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
        <h3>Minimum â€” what you must understand to do this job properly</h3>

        <p>
          <strong>Probability basics:</strong> sample spaces, events,
          conditional probability, Bayes&rsquo; theorem at a conceptual level.
          Not the full measure-theoretic machinery â€” but enough to know why
          the t-test has a null distribution and what &ldquo;sampling from a
          population&rdquo; means.
        </p>

        <p>
          <strong>Distributions:</strong> the normal distribution (and why the
          CLT makes it ubiquitous), the t-distribution (and why it has heavier
          tails), the chi-square and F distributions (and what they model). Know
          the shapes, the parameters, and the conditions under which each
          appears. You do not need to derive them â€” you need to know which one
          applies.
        </p>

        <p>
          <strong>The logic of inference:</strong> what a null hypothesis is and
          why we test against it. What a p-value actually is (the probability of
          observing data at least this extreme, given the null is true â€” not
          the probability the null is false). What a 95% confidence interval is
          (a procedure that generates intervals containing the true parameter
          95% of the time â€” not a 95% probability that this particular
          interval contains it).
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

        <h3>Research-grade â€” where real understanding lives</h3>

        <p>
          <strong>Derive the t-statistic.</strong> Understand why dividing by{" "}
          <em>s / âˆšn</em> gives a t-distribution rather than a normal â€” the
          randomness of <em>s</em> is the reason. This derivation makes the
          whole apparatus of inference legible.
        </p>

        <p>
          <strong>The F-ratio in ANOVA geometrically.</strong> It is the ratio
          of between-group variance to within-group variance. When groups
          genuinely differ, the numerator is inflated; when they do not, both
          terms are just noise and their ratio follows the F-distribution under
          the null. Understanding this geometrically â€” not just
          computationally â€” transforms ANOVA from a black box into a sensible
          quantity.
        </p>

        <p>
          <strong>The CLT stated properly.</strong> Not &ldquo;big n â†’
          normal,&rdquo; but: the distribution of the sample mean converges to
          normal at rate O(1/âˆšn), regardless of the population distribution,
          under finite variance. Understand when it fails: heavy-tailed
          distributions, small samples from skewed populations, correlated
          observations.
        </p>

        <p>
          <strong>Multiple comparisons in depth.</strong> Why running 20
          independent tests at Î± = 0.05 yields roughly one false positive by
          chance. The Bonferroni correction (divide Î± by the number of tests)
          and why it is conservative. The Benjamini-Hochberg procedure and why
          it is often preferred â€” it controls the false discovery rate rather
          than the family-wise error rate, giving more power when many tests are
          run.
        </p>

        <p className="text-sm text-faded-ink">
          â†’{" "}
          <Link href="/mathematics#probability-statistics">
            Probability &amp; Statistics in the mathematics curriculum
          </Link>{" "}
          covers this material in full, with worked derivations â€” Bayes, MLE,
          CLT, and hypothesis testing.
        </p>
      </StageSection>

      {/* â”€â”€ Â§7 SECTION 5: Tools & engineering â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <StageSection id="tools" title="Tools and engineering skills">
        <p>
          <strong>Python:</strong> pandas and NumPy are the workhorses.
          matplotlib and seaborn for visualisation. scipy.stats for hypothesis
          tests. statsmodels for regression and rigorous statistical modelling.
          You should be comfortable with the full data manipulation lifecycle in
          pandas: cleaning, groupby, merge, reshape, time series indexing. Write
          clean, reproducible notebooks â€” run from top to bottom, dependencies
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
          <strong>A BI tool â€” Tableau or Power BI:</strong> the ability to
          build an interactive dashboard a stakeholder can self-serve is a
          genuine professional skill. Tableau Public is free and sufficient for
          building and sharing work publicly.
        </p>

        <p>
          <strong>Git:</strong> yes, even for analysis work. Version-control
          your notebooks, your SQL scripts, your data cleaning steps. Analysis
          that cannot be reproduced is analysis that cannot be trusted â€” and
          cannot be corrected when someone finds a mistake six months later.
        </p>
      </StageSection>

      {/* â”€â”€ Â§7 SECTION 6: The project â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <StageSection id="project" title="The project">
        <p>
          A single analysis is a demonstration that you understand the tools.
          Four projects together â€” a rigorous statistical report, a SQL
          investigation, a live dashboard, and an A/B test post-mortem â€” are a
          demonstration that you are ready for the job. Do all four. There is no
          shortcut through the portfolio.
        </p>

        <p className="text-sm text-faded-ink">
          Expected total time: 10â€“14 weeks alongside the curriculum. Build
          them in order â€” each one uses skills from the previous.
        </p>

        {/* â”€â”€ Project 1 â”€â”€ */}
        <h3 className="lg:clear-both">
          Project 1 â€” the rigorous statistical report (4â€“5 weeks)
        </h3>

        <p>
          <strong>What it proves:</strong> your statistical thinking is
          trustworthy.
        </p>

        <p>
          Choose a rich, multi-variable public dataset â€” World Bank
          development indicators, OECD health statistics, US Bureau of Labor
          Statistics employment series, or any domain you genuinely find
          interesting. Frame five distinct research questions, each requiring a
          different statistical approach: at minimum one t-test, one one-way
          ANOVA, one chi-square test of independence, one correlation analysis,
          and one regression. For every question, execute the full protocol:
        </p>

        <ol>
          <li>
            State Hâ‚€ and Hâ‚ in formal notation before touching the data.
          </li>
          <li>
            Check all required assumptions â€” normality (Shapiro-Wilk + QQ
            plot), homogeneity of variance (Levene&rsquo;s test), independence
            â€” and document the results. &ldquo;It looks fine&rdquo; is not a
            check. A Shapiro-Wilk W = 0.97, p = .23 is a check.
          </li>
          <li>
            Run the appropriate test. If assumptions are violated, run the
            correct non-parametric alternative and explain why.
          </li>
          <li>
            Report in APA format:{" "}
            <em>
              F(2, 147) = 8.3, p &lt; .001, Î·Â² = .10, indicating a medium
              effect.
            </em>
          </li>
          <li>
            Compute effect sizes (Cohen&rsquo;s d, r, Î·Â², or Ï† depending on
            the test). A statistically significant result with d = 0.04 is not a
            finding worth acting on.
          </li>
          <li>
            Apply Benjamini-Hochberg correction across all five tests. Adjust
            your conclusions accordingly.
          </li>
        </ol>

        <p>
          Then run a multiple linear regression on one of the outcomes: report
          standardised and unstandardised coefficients, RÂ², adjusted RÂ², and
          the F-statistic. Check residuals (homoscedasticity, normality,
          influential points via Cook&rsquo;s distance). Interpret every
          coefficient precisely: &ldquo;holding all other predictors constant, a
          one-unit increase in X is associated with a 0.31-unit increase in Y
          (Î² = 0.31, 95% CI [0.18, 0.44]).&rdquo;
        </p>

        <p>
          <strong>
            The deliverable is a written report â€” not a notebook.
          </strong>{" "}
          A 15â€“20 page document: introduction (the research questions and why
          they matter), methods (every test, every assumption check, and why
          each was chosen), results (tables and figures, one finding per
          paragraph), discussion (what the findings mean, what they cannot mean,
          and the three most important limitations). The test: could this report
          be submitted to an applied statistics conference without
          embarrassment? That is the bar.
        </p>

        <Marginalia>
          The statistics are table stakes. The writing is the job. Every
          analysis I&rsquo;ve seen fail in a board room had correct numbers and
          wrong conclusions â€” because the analyst could not frame the finding
          for someone who does not live in the data.
        </Marginalia>

        {/* â”€â”€ Project 2 â”€â”€ */}
        <h3 className="lg:clear-both">
          Project 2 â€” SQL + EDA investigation (2â€“3 weeks)
        </h3>

        <p>
          <strong>What it proves:</strong> you can work with real, messy,
          production-scale data.
        </p>

        <p>
          Use a multi-table dataset in a SQL environment â€” Google
          BigQuery&rsquo;s public datasets (Chicago taxi trips, Stack Overflow
          activity, US Census data) are free to query from the BigQuery console.
          Write SQL to answer 10 business questions of increasing complexity:
        </p>

        <ul>
          <li>
            <strong>Basic:</strong> &ldquo;What is the average trip duration by
            day of week?&rdquo;
          </li>
          <li>
            <strong>Intermediate:</strong> &ldquo;What is the 7-day rolling
            average of daily revenue, and which weeks show a &gt; 20% decline
            from the prior week?&rdquo; â€” requires{" "}
            <code>AVG() OVER (ORDER BY day ROWS 6 PRECEDING)</code> and{" "}
            <code>LAG()</code>.
          </li>
          <li>
            <strong>Advanced:</strong> &ldquo;For drivers in the top quartile of
            Q1 revenue, what fraction remained in the top quartile in Q2?
            Produce the full quartile transition matrix.&rdquo; â€” requires
            multiple CTEs, <code>NTILE(4)</code>, and a self-join.
          </li>
        </ul>

        <p>
          Then bring the dataset into Python. EDA: distributions, outliers (IQR
          fence and z-score, not just visual), missingness (how much, what
          pattern â€” MCAR vs. MAR vs. MNAR), correlations, surprises. Document
          every cleaning decision â€” not just what you did but why, and what
          the business consequence of getting it wrong would be. Close with a
          one-page written brief: three findings that would change a decision,
          addressed to a non-technical manager.
        </p>

        {/* â”€â”€ Project 3 â”€â”€ */}
        <h3 className="lg:clear-both">
          Project 3 â€” the live dashboard (2â€“3 weeks)
        </h3>

        <p>
          <strong>What it proves:</strong> you can communicate analysis to
          people who do not do analysis.
        </p>

        <p>
          Build and publish a dashboard on Tableau Public (free tier, no
          paywall). Pick a real, specific question â€” not &ldquo;here are some
          charts about the data&rdquo; but &ldquo;which US counties are most at
          risk for opioid mortality in the next two years?&rdquo; or
          &ldquo;which product categories are underperforming relative to
          inventory cost?&rdquo; The question has to be specific enough that the
          dashboard answers it.
        </p>

        <p>Requirements, every one of them:</p>

        <ul>
          <li>
            At least 6 distinct views connected by dashboard actions and filters
            â€” clicking a region in one view filters all others.
          </li>
          <li>
            At least one non-trivial calculated field (a rate, a ratio, a
            running total, a conditional category â€” not just{" "}
            <code>SUM([Sales])</code>).
          </li>
          <li>
            At least one parameter that lets the user adjust a threshold or
            change the grouping dynamically.
          </li>
          <li>
            Custom tooltips that provide context on hover â€” not the default
            dimension/measure dump.
          </li>
          <li>
            A written title and one-sentence narrative on each dashboard page
            stating what the viewer is looking at and what conclusion they
            should draw. If the chart requires explanation, the chart is not
            done.
          </li>
        </ul>

        <p>
          Publish to Tableau Public with a link in your portfolio. The test:
          hand it to someone who did not build it, describe the question it
          answers, and ask them to find the answer without your help. If they
          cannot, revise until they can.
        </p>

        <Marginalia>
          Every analyst thinks their dashboard is intuitive. It never is â€”
          until it has been tested on someone who didn&rsquo;t build it. The
          confused look on their face when they click the wrong thing is worth a
          week of self-review.
        </Marginalia>

        {/* â”€â”€ Project 4 â”€â”€ */}
        <h3 className="lg:clear-both">
          Project 4 â€” the A/B test post-mortem (2â€“3 weeks)
        </h3>

        <p>
          <strong>What it proves:</strong> you understand experimentation â€”
          the highest-value analyst skill at any technology company.
        </p>

        <p>
          Design a realistic A/B test from scratch on a plausible business
          scenario: a checkout flow redesign, a recommendation algorithm change,
          a push notification copy change. Execute all five phases before
          touching any data:
        </p>

        <ol>
          <li>
            <strong>Pre-registration.</strong> Write your hypotheses, your
            primary metric (what you are trying to move), two guardrail metrics
            (what must not get worse), your analysis plan, and your stopping
            rule. Lock this before generating a single row of simulated data.
          </li>
          <li>
            <strong>Power analysis.</strong> Decide on a minimum detectable
            effect (MDE) that would be practically meaningful. Compute the
            required N at Î± = 0.05, power = 0.80 using scipy.stats.{" "}
            <em>Then double it</em> and explain why naive power calculations
            consistently undershoot.
          </li>
          <li>
            <strong>Data simulation.</strong> Simulate the experiment â€” you
            control the ground truth. This is the point. Simulate three
            scenarios: (a) the treatment works as expected, (b) the treatment
            has no effect, (c) the treatment helps the primary metric but hurts
            a guardrail. The correct analysis should detect all three correctly.
          </li>
          <li>
            <strong>Analysis.</strong> Two-proportion z-test for the primary
            metric. Multiple-testing correction across all three metrics.
            Novelty effect check: does the treatment effect decay across the
            experiment window (plot treatment effect by day of exposure)?
            Segment analysis: does the treatment differ for new vs. returning
            users, mobile vs. desktop? If you have a pre-experiment covariate,
            apply CUPED and compare the variance reduction.
          </li>
          <li>
            <strong>Post-mortem document.</strong> Write it in the format a tech
            company would circulate: decision up front (ship / do not ship /
            iterate, with one-sentence reason), then the full analysis for
            anyone who goes deeper. One page of executive summary, appendix of
            statistical detail. Be precise about what you can and cannot
            conclude from an observational analysis versus a randomised
            experiment.
          </li>
        </ol>

        <p>
          Then re-analyse the same simulated data using a Bayesian Beta-Binomial
          model. Compare conclusions. In which scenario do the frequentist and
          Bayesian approaches disagree? Why? Write a half-page explanation for a
          non-statistician.
        </p>

        {/* â”€â”€ Extensions â”€â”€ */}
        <h3>Senior extension â€” for any one project</h3>
        <p>
          Present your findings to someone who is not a statistician. Record or
          take notes on the conversation. Revise the report or dashboard based
          on the questions they asked â€” those questions reveal exactly where
          your communication failed, and that is where the gap is. Iterate until
          a non-technical person can give you back the key finding in their own
          words.
        </p>

        <h3>Research extension â€” pre-registration in the wild</h3>
        <p>
          Before running Project 1, submit a pre-registration on the Open
          Science Framework (osf.io â€” free, public). State your hypotheses,
          your expected effect sizes, your analysis plan, and your stopping
          rule. Then execute the analysis exactly as registered â€” including
          any null results you did not expect. Write a one-page reflection: what
          did you expect, what did you find, and what would you pre-register
          differently next time? This is not academic formality. It is the
          discipline that separates the analysts whose conclusions you can trust
          from the ones who p-hacked their way to a story.
        </p>
      </StageSection>

      {/* â”€â”€ Â§7 SECTION 7: Resources â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <StageSection id="resources" title="Resources">
        <p className="mb-6 text-faded-ink">
          Ordered by when to use them. The highest-ROI combination at this stage
          is <strong>StatQuest + Practical Statistics</strong> â€” intuition and
          practice in parallel. OpenIntro Statistics is the best free
          alternative to Practical Statistics if cost is a constraint. Every
          free canonical option is flagged.
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
            Given a two-sample comparison, you choose between a t-test, a
            Mann-Whitney U test, and their alternatives, and justify the choice
            based on sample size, distributional assumptions, and measurement
            scale.
          </li>
          <li>
            You can explain what a p-value is â€” and five things it is not â€”
            to someone without a statistics background.
          </li>
          <li>
            You can identify whether an A/B test result is underpowered and
            compute the required sample size for a given effect size and Î±.
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

      {/* â”€â”€ Â§7 SECTION 9: Bridge to next stage â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
          of the toolset. Linear algebra and calculus â€” optional context at
          this stage â€” become essential. The scikit-learn API enters. You
          start thinking in features rather than variables, in training sets
          rather than samples, in predictive error rather than inferential
          error.
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
          uncertainty. These compound. They do not need to be relearned â€” only
          extended.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Link
            href="/data-scientist"
            className="inline-flex items-center gap-1.5 rounded border border-route-red bg-route-red/5 px-4 py-2 font-mono text-sm text-ink transition-colors hover:bg-route-red hover:text-primary-foreground"
          >
            Data Scientist â†’
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
