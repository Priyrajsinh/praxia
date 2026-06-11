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
  title: "Foundations",
  description:
    "Stage 0 of the Praxia map — the bedrock before any role. Full curriculum: Python, Git, SQL, the command line, and the reproducible notebook project.",
};

// ── Stage metadata (Zod-validated at build time) ───────────────────────────
const meta = validateStageMeta({
  title: "Foundations",
  identity: "Before any role, you need the bedrock.",
  stageNumber: 0,
  slug: "foundations",
  timeRange: "4–8 weeks (2 weeks if you already code)",
  prerequisites: [],
  depthLadderPosition: 1, // Competent on all fundamentals
});

// ── Core concepts (§7 section 3) — Zod-validated at build time ────────────
const topics = validateTopics([
  {
    concept: "How computers represent data",
    whyItMatters:
      "Every bug involving integers overflowing, floats comparing unequally, or strings not matching traces back to not knowing this. Understanding bits, bytes, and types turns mysterious errors into predictable ones.",
    depth: "Competent",
  },
  {
    concept: "Variables, types, and control flow",
    whyItMatters:
      "The alphabet of every program. You cannot write anything without variables and branching logic; fluency here is what separates 'I read some Python' from 'I can actually code.'",
    depth: "Competent",
  },
  {
    concept: "Functions and modularity",
    whyItMatters:
      "The single practice that separates a 50-line script that works once from a 500-line codebase you can maintain. If you cannot break a problem into functions, you cannot build anything real.",
    depth: "Competent",
  },
  {
    concept: "Data structures — lists, dicts, sets, tuples",
    whyItMatters:
      "Every data manipulation you will ever do — from a pandas groupby to a graph traversal — is built from these four. Know when each is appropriate and what operations are fast on each.",
    depth: "Competent",
  },
  {
    concept: "Files and formats — CSV, JSON, plain text",
    whyItMatters:
      "Data lives in files. Reading a CSV without pandas, writing clean JSON, parsing a log file: these are the most common tasks in the field and are learned in an afternoon — but you still have to learn them.",
    depth: "Competent",
  },
  {
    concept: "The command line and shell",
    whyItMatters:
      "Every server, every pipeline, every deployment lives in a terminal. If you cannot navigate the shell, you cannot work in any production environment — and you will be slower in every environment.",
    depth: "Competent",
  },
  {
    concept: "Version control with Git",
    whyItMatters:
      "Code without Git is a Jenga tower — one bad edit and you cannot go back. Git is not a nice-to-have; it is the professional minimum, and the branching model is what makes collaboration possible.",
    depth: "Competent",
  },
  {
    concept: "How the internet works — HTTP, APIs, JSON",
    whyItMatters:
      "Every data source you will consume — public datasets, ML APIs, production databases — speaks HTTP. Understanding a request-response cycle lets you pull data from anywhere.",
    depth: "Competent",
  },
  {
    concept: "SQL fundamentals — SELECT, WHERE, GROUP BY, JOIN",
    whyItMatters:
      "The majority of enterprise data lives in relational databases. SQL is how you access it. The analyst who cannot write a JOIN is locked out of most real-world data before they start.",
    depth: "Competent",
  },
  {
    concept: "Algorithmic thinking and Big-O basics",
    whyItMatters:
      "Understanding why a nested loop over a million rows is slow, and how to fix it, is what separates code that works on a sample from code that works on production data.",
    depth: "Competent",
  },
]);

// ── Resources for this stage (from single source of truth) ─────────────────
const stageResources = getResourcesByStage("foundations");

// ══════════════════════════════════════════════════════════════════════════════

export default function FoundationsPage() {
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
          <span className="font-mono text-xs text-faded-ink italic">
            None — this is the start.
          </span>
        </div>

        <div className="mt-5">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-faded-ink">
            Target depth at this stage
          </p>
          <DepthLadder position={meta.depthLadderPosition} />
        </div>
      </header>

      {/* ── §7 SECTION 2: What this stage actually is ───────────────────── */}
      <StageSection id="what-it-does" title="What this stage actually is">
        <p>
          Foundations is not a stage you pass through quickly to get to the
          interesting parts. It is the stage that determines whether everything
          after it is built on solid ground or on sand. Spend the time here. The
          practitioners who move fastest in Stages 1 and 2 are almost always the
          ones who did Foundations properly — not the ones who skimmed it.
        </p>

        <p>
          What you are building is not expertise in any one tool. You are
          building the mental model of how computation works: how data is
          represented, how programs execute, how files relate to programs, how a
          database stores and retrieves information. With that model in place,
          every new library or language you encounter becomes an instance of
          something you already understand — not a new thing to memorise.
        </p>

        <Marginalia>
          The people who struggle most in Stage 1 are not the ones who did not
          know statistics. They are the ones who did not know Python well enough
          to trust their own code. Foundations is what makes the rest honest.
        </Marginalia>

        <p>
          <strong>What this stage is not.</strong> It is not a computer science
          degree. You do not need to implement a red-black tree or prove
          correctness theorems. The bar is practical competence: you can write a
          small program from scratch, navigate the terminal without dread,
          manage a project in Git, query a relational database, and consume an
          API. That is the floor. Everything above it is bonus.
        </p>

        <p>
          <strong>Which path to take.</strong> If you have never written a line
          of code, CS50x is the right entry point — it is the best foundations
          course on the internet, and it will give you the full mental model in
          one rigorous run. If you already know another language and want fast
          Python utility, start with <em>Automate the Boring Stuff</em>. If you
          want the language reference rather than a course, the Python official
          tutorial is the authoritative source. All three are free.
        </p>

        <p>
          Do not let Foundations become a comfortable refuge. It is possible to
          spend six months here refining your Python style while never touching
          real data. The exit criterion is not &ldquo;comfortable with
          everything.&rdquo; It is: can you build the project below? If yes,
          move on.
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
        <TopicChecklist topics={topics} />
      </StageSection>

      {/* ── §7 SECTION 4: Mathematics ───────────────────────────────────── */}
      <StageSection id="mathematics" title="Mathematics required">
        <h3>Minimum — what you must know to follow the rest of the map</h3>

        <p>
          <strong>Arithmetic and algebra fluency.</strong> Variables as
          unknowns, solving for x, reading an equation. The ability to follow a
          mathematical argument that uses basic algebraic manipulation. This
          sounds trivially low, but many people discover they have gaps when
          they first see ML notation — address them now, before the math gets
          harder.
        </p>

        <p>
          <strong>Functions and graphs.</strong> What it means for y to be a
          function of x. How to read a graph. Logarithms and exponentials — why
          a log scale compresses large ranges, what happens when you take the
          log of a probability. These appear constantly in ML (log loss, the
          log-sum-exp trick, exponential growth curves) and being comfortable
          with them makes Stage 2 materially less confusing.
        </p>

        <p>
          <strong>Basic set theory and logic.</strong> Sets, membership (∈),
          unions (∪), intersections (∩), and the difference between AND and OR.
          The vocabulary of logic (if P then Q; the contrapositive; a
          counterexample). You will see this notation from Stage 1 onward.
        </p>

        <p>
          <strong>Summation notation.</strong> What Σ means, how to read an
          index, and how to evaluate a simple sum. This is the notation of
          averages, totals, and most statistical formulas. One afternoon of
          practice is all it takes.
        </p>

        <p>
          <strong>Descriptive statistics vocabulary.</strong> Mean, median,
          mode, variance, standard deviation, and why they differ. The ability
          to compute these by hand (not just in pandas) so you know what you are
          asking the computer to do.
        </p>

        <Marginalia>
          Spend one afternoon with summation notation before you start Stage 1.
          Every stats formula you encounter will use it. Without it, you are
          decoding notation at the same time as trying to understand the concept
          — and that slows everything down.
        </Marginalia>

        <h3>Research-grade seed — start building this habit now</h3>

        <p>
          You do not need these for Foundations. But starting to build
          mathematical literacy here — even slowly — compounds enormously by
          Stage 2 and beyond. The investment is small; the payoff is large.
        </p>

        <p>
          <strong>What a proof is.</strong> Read a proof by induction. Read a
          proof by contradiction. You do not need to write proofs at this stage,
          but understanding what &ldquo;prove&rdquo; means — that a statement
          holds for all cases, not just the cases you checked — changes how you
          think about whether your code is correct. This is the foundational
          epistemological move in mathematics.
        </p>

        <p>
          <strong>Mathematical notation literacy.</strong> The symbols ∀
          (&ldquo;for all&rdquo;), ∃ (&ldquo;there exists&rdquo;), ⊆ (&ldquo;is
          a subset of&rdquo;), ⟹ (&ldquo;implies&rdquo;), and iff (&ldquo;if and
          only if&rdquo;) are the vocabulary of every textbook from Stage 2
          onward. You do not need fluency now — but exposure. When you encounter
          them in a paper or textbook, do not skip; decode.
        </p>

        <p className="text-sm text-faded-ink">
          →{" "}
          <Link href="/mathematics#tier-1">
            Tier 1 of the mathematics curriculum
          </Link>{" "}
          covers these topics in full with worked examples — algebra, notation,
          summation, and proof technique.
        </p>
      </StageSection>

      {/* ── §7 SECTION 5: Tools & engineering ───────────────────────────── */}
      <StageSection id="tools" title="Tools and engineering skills">
        <p>
          <strong>Python:</strong> the language of data science, ML engineering,
          and AI. Learn it properly — not just &ldquo;I know how to run a
          script&rdquo; but truly comfortable with functions, classes, list
          comprehensions, error handling, modules, and the standard library.
          Fluency means you spend your mental energy on the problem, not on the
          syntax.
        </p>

        <p>
          <strong>The terminal:</strong> every server, pipeline, and deployment
          runs in a shell. Know how to navigate directories, read and write
          files, chain commands with pipes, write simple shell scripts, and
          understand environment variables. The Missing Semester course covers
          exactly this gap — the things nobody teaches.
        </p>

        <p>
          <strong>Git and GitHub:</strong> not just <code>git commit</code>, but
          the mental model — commits as a directed acyclic graph, branches as
          pointers, merges and rebases. Know what a PR is and why it exists.
          Every project you build from here on lives in a Git repository with a
          clear commit history. Starting this habit now costs nothing; not
          starting it costs credibility.
        </p>

        <p>
          <strong>Jupyter Notebooks:</strong> the interactive environment where
          most data work begins. Know how to structure a notebook so it runs
          reproducibly top-to-bottom, not as a pile of out-of-order cells. A
          notebook that only works if you ran the cells in a specific secret
          order is not a notebook — it is a liability.
        </p>

        <p>
          <strong>SQL:</strong> the language of relational databases, and how
          most production data is stored. You do not need a full database
          administration course — but you need to write SELECT statements with
          JOINs, GROUP BY, and subqueries without looking everything up. SQLite
          is available everywhere and sufficient for learning.
        </p>

        <p>
          <strong>VS Code:</strong> the practical standard for Python
          development. Set up a linter (Pylint or Flake8), a formatter (Black),
          and understand how to use the debugger. A debugger is not the last
          resort of someone who is stuck — it is the first tool of someone who
          understands what their code is doing.
        </p>
      </StageSection>

      {/* ── §7 SECTION 6: The project ────────────────────────────────────── */}
      <StageSection id="project" title="The project">
        <p>
          Three projects together — a reproducible data investigation, a
          Git-first codebase, and a SQL investigation — prove every Foundations
          competency. A single script does not. Build all three before calling
          this stage done.
        </p>

        <p className="text-sm text-faded-ink">
          Expected total time: 5–8 weeks alongside the curriculum. Build them
          roughly in order — each one builds on skills from the previous.
        </p>

        {/* ── Project 1 ── */}
        <h3 className="lg:clear-both">
          Project 1 — the reproducible data investigation (2–3 weeks)
        </h3>

        <p>
          <strong>What it proves:</strong> you can find, clean, and analyse real
          data in Python, with code that actually works from top to bottom.
        </p>

        <p>
          Choose a messy, interesting public dataset — US government open data
          portals, the UCI Machine Learning Repository, Kaggle&rsquo;s free
          datasets, or any domain you genuinely find interesting. Pick something
          with at least 5,000 rows and at least 8 columns, including mixed types
          (numeric, categorical, dates, some missing values). Then execute the
          full lifecycle:
        </p>

        <ol>
          <li>
            <strong>Load and audit.</strong> Load the data into a pandas
            DataFrame. Print shape, dtypes, and value counts for each column.
            Identify every column with missing values and report what fraction
            is missing, not just whether any values are missing.
          </li>
          <li>
            <strong>Clean — and document every decision.</strong> Handle missing
            values with a justified approach (drop vs. fill vs. leave — state
            which you chose and why). Detect and investigate outliers using the
            IQR fence (values below Q1 − 1.5×IQR or above Q3 + 1.5×IQR): report
            how many there are, look at them, and decide whether they are errors
            or real extreme values. Fix inconsistent categorical values (e.g.
            &ldquo;NYC&rdquo; vs &ldquo;New York City&rdquo; vs &ldquo;new
            york&rdquo;). Document every cleaning step in a comment or markdown
            cell: what you did and what you would have done differently with
            more time.
          </li>
          <li>
            <strong>Explore.</strong> Plot distributions for every numeric
            variable (histogram + box plot). Plot a correlation heatmap.
            Identify the three most interesting patterns or surprises in the
            data. Write one sentence per finding explaining why it might be
            true.
          </li>
          <li>
            <strong>Answer three questions.</strong> Frame three specific,
            answerable questions about the data (&ldquo;Do cities with higher X
            have lower Y?&rdquo; is a question; &ldquo;explore the data&rdquo;
            is not). Use groupby, aggregation, and plots to answer them. Write
            one paragraph per finding in plain English, as if for a
            non-technical reader.
          </li>
        </ol>

        <p>
          <strong>The deliverable is a notebook and a README.</strong> The
          notebook must run completely clean from{" "}
          <code>Kernel &gt; Restart &amp; Run All</code> with no errors. The
          README explains what the dataset is, what question you investigated,
          and what you found — three paragraphs, no jargon. Publish both to
          GitHub. The test: hand the link to someone who was not involved and
          ask them what the project found. If they cannot answer, the README
          needs work.
        </p>

        <Marginalia>
          A notebook that only works if you ran the cells in a specific order is
          a liability, not a portfolio piece. Restart and run all before every
          commit. Every time.
        </Marginalia>

        {/* ── Project 2 ── */}
        <h3 className="lg:clear-both">
          Project 2 — the Git-first codebase (1 week)
        </h3>

        <p>
          <strong>What it proves:</strong> you use version control properly —
          not as a backup tool but as a collaboration and correctness tool.
        </p>

        <p>
          Take a small project — a data cleaning script, a simple web scraper, a
          set of SQL utilities, any code that does something real — and build it
          entirely through Git-first practices. Requirements:
        </p>

        <ul>
          <li>
            At least 20 meaningful commits, each with a clear, conventional
            commit message (<code>feat:</code>, <code>fix:</code>,{" "}
            <code>refactor:</code>, <code>docs:</code>). A message that says
            &ldquo;update&rdquo; is not a commit message — it is a sign that you
            are not thinking about the change.
          </li>
          <li>
            At least two feature branches merged back to main via a pull
            request. Even on a solo project, the PR review is the moment you
            read your own diff critically. Develop the habit now.
          </li>
          <li>
            One intentionally simulated merge conflict, resolved cleanly.
            Understand what a merge conflict is (two branches modified the same
            lines), how Git marks it, and how to resolve it manually. This is
            not optional — merge conflicts are inevitable in real work.
          </li>
          <li>
            A <code>.gitignore</code> that excludes <code>__pycache__</code>,{" "}
            <code>.env</code>, <code>*.csv</code> data files, and any virtual
            environment directory. Never commit secrets or large data files.
          </li>
        </ul>

        <p>
          The deliverable is a public GitHub repository where the commit history
          tells a coherent story: you can read the log and understand what the
          project is, how it evolved, and where decisions were made. An
          interviewer will look at your commit history. Make it say something
          about how you work.
        </p>

        {/* ── Project 3 ── */}
        <h3 className="lg:clear-both">
          Project 3 — the SQL investigation (1–2 weeks)
        </h3>

        <p>
          <strong>What it proves:</strong> you can query a real relational
          database and communicate findings to a non-technical audience.
        </p>

        <p>
          Use Google BigQuery&rsquo;s free public datasets (Chicago taxi trips,
          Stack Overflow data, US Census — all queryable for free from the
          console) or download a public SQLite database (Chinook, Northwind, or
          any multi-table dataset from Kaggle). Answer 10 questions of
          increasing complexity:
        </p>

        <ul>
          <li>
            <strong>Basic (3 questions):</strong> single-table SELECT with
            filtering, sorting, and aggregation. &ldquo;What are the top 10
            categories by total revenue?&rdquo;
          </li>
          <li>
            <strong>Intermediate (4 questions):</strong> JOIN two or more
            tables, use GROUP BY with HAVING, use at least one subquery.
            &ldquo;Which customers have placed more orders than the average
            customer?&rdquo;
          </li>
          <li>
            <strong>Advanced (3 questions):</strong> window functions (at least
            one of: ROW_NUMBER, LAG/LEAD, RANK, running total). &ldquo;What is
            the month-over-month growth rate of sales, and which months had
            growth above 20%?&rdquo; — requires <code>LAG()</code> and a CTE.
          </li>
        </ul>

        <p>
          For each question: write the query, explain it in one sentence, and
          show the result. Then write a one-page plain-English briefing
          addressed to a non-technical manager: three findings from the data
          that would actually change a decision. The briefing has no SQL in it —
          if the finding requires SQL to explain, it is not a finding yet.
        </p>

        {/* ── Extensions ── */}
        <h3>Senior extension — automate the reproducibility</h3>
        <p>
          Add a <code>Makefile</code> or <code>run.sh</code> to your data
          investigation project so that anyone can clone the repo, run one
          command, and reproduce your entire analysis from raw data to final
          charts. Include dependency pinning (<code>requirements.txt</code> or{" "}
          <code>pyproject.toml</code>). Add a pre-commit hook that runs Black
          and Flake8 on every commit. This is what &ldquo;reproducibility&rdquo;
          actually means in practice — not &ldquo;I ran it once and it
          worked.&rdquo;
        </p>

        <h3>Research-grade extension — understand what you built</h3>
        <p>
          For one non-trivial function in your codebase, write a proof sketch:
          what are the preconditions, what does the function guarantee, and can
          you construct a case where it fails? This is informal — you are not
          writing a Coq proof. But the practice of reasoning about correctness
          rather than just testing with examples is the habit that separates
          research-grade thinking from production-grade thinking. It starts
          here.
        </p>
      </StageSection>

      {/* ── §7 SECTION 7: Resources ──────────────────────────────────────── */}
      <StageSection id="resources" title="Resources">
        <p className="mb-6 text-faded-ink">
          Two paths, one goal. <strong>CS50x</strong> is the long path —
          rigorous, complete, 10–20 weeks — and worth every hour if you have
          time. <strong>Automate the Boring Stuff</strong> is the fast path —
          useful Python in days. If you already code and just need Python
          fluency, start with Automate. The Python official tutorial is the
          reference you consult, not the course you study. Pro Git and the
          Missing Semester cover the tooling that formal courses always skip.
          All five are free.
        </p>
        <ResourceGroups resources={stageResources} />
      </StageSection>

      {/* ── §7 SECTION 8: How you know you're done ───────────────────────── */}
      <StageSection id="done" title="How you know you&rsquo;re done">
        <p>Exit criteria — you can answer &ldquo;yes&rdquo; to all of these:</p>

        <ul>
          <li>
            You can write a Python script from scratch — no copy-paste, no Stack
            Overflow mid-task — that loads a CSV, cleans it, computes summary
            statistics, and writes the results to a new file.
          </li>
          <li>
            You can explain, without looking it up, what a Git branch is, what a
            commit hash is, and what happens during a merge. You can resolve a
            merge conflict without panicking.
          </li>
          <li>
            Given a SQL prompt and a schema, you can write a query using JOIN,
            GROUP BY, and at least one aggregate function (SUM, COUNT, AVG) in
            under five minutes.
          </li>
          <li>
            You can navigate the terminal: find files, edit them, run scripts,
            understand the PATH, and pipe one command&rsquo;s output into
            another. You are not afraid of a <code>Permission denied</code>{" "}
            error — you know what it means.
          </li>
          <li>
            You understand Big-O at the level of: O(n) is a loop over n items,
            O(n²) is a loop inside a loop, and you can explain why a dictionary
            lookup is O(1) while searching a list for a value is O(n).
          </li>
          <li>
            An interviewer says &ldquo;walk me through a coding project you
            built.&rdquo; You have a real answer with a real GitHub link, a
            clear explanation of the problem, and a clean commit history.
          </li>
        </ul>

        <h3>Self-test questions</h3>
        <ol>
          <li>
            Write a Python function that takes a list of integers and returns a
            new list with all duplicates removed, preserving insertion order. Do
            not use <code>set()</code> directly. What is the time complexity of
            your solution?
          </li>
          <li>
            You have a CSV file with 1 million rows. You want to find the top 10
            most common values in a specific column. Write the Python code to do
            this without loading the entire file into memory at once.
          </li>
          <li>
            Without looking it up: what does <code>git rebase main</code> do
            when run on a feature branch? How does it differ from{" "}
            <code>git merge main</code>?
          </li>
          <li>
            Write a SQL query that finds all customers who placed at least 3
            orders in 2024, along with their total order value. What tables and
            joins would you need?
          </li>
          <li>
            You open a colleague&rsquo;s Jupyter notebook and run all cells in
            order. The last cell fails with a{" "}
            <code>NameError: name &apos;df_clean&apos; is not defined</code>.
            What likely went wrong, and how do you diagnose it?
          </li>
        </ol>
      </StageSection>

      {/* ── §7 SECTION 9: Bridge to next stage ──────────────────────────── */}
      <StageSection id="next-stage" title="Bridge to the next stage">
        <p>
          Foundations builds the instrument. Stage 1 puts it to use. The data
          analyst does not learn new programming concepts — they apply the ones
          from here at speed, under the pressure of a real question with a real
          stakeholder waiting for an answer.
        </p>

        <p>
          What changes at Stage 1 is the mathematics. Statistics —
          distributions, hypothesis tests, confidence intervals — enters
          properly, not as a vocabulary word but as a tool for making decisions
          under uncertainty. The Python you write in Stage 1 is the same Python
          as here; the thinking behind it is fundamentally different.
        </p>

        <p>
          <strong>What to carry forward:</strong> clean reproducible notebooks
          (non-negotiable from here on), Git as a reflex not a task, SQL
          fluency, and the discipline of asking &ldquo;is this code
          correct&rdquo; before &ldquo;does this code run.&rdquo; These are not
          revisited. They are assumed.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Link
            href="/data-analyst"
            className="inline-flex items-center gap-1.5 rounded border border-route-red bg-route-red/5 px-4 py-2 font-mono text-sm text-route-red transition-colors hover:bg-route-red hover:text-paper"
          >
            Data Analyst →
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
