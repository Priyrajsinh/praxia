import { z } from "zod";

// ── Depth tags used on topic items (§7 section 3) ──────────────────────────
export const DepthTag = z.enum(["Competent", "Production", "Expert"]);
export type DepthTag = z.infer<typeof DepthTag>;

// ── Resource classification (§9 standard) ──────────────────────────────────
export const ResourceType = z.enum([
  "Book",
  "Course",
  "Paper",
  "Docs",
  "Tool",
  "Blog",
  "Video",
]);
export type ResourceType = z.infer<typeof ResourceType>;

export const ResourceLevel = z.enum([
  "Foundations",
  "Competent",
  "Production",
  "Expert",
  "Research",
]);
export type ResourceLevel = z.infer<typeof ResourceLevel>;

export const ResourceCost = z.enum(["Free", "Paid", "Freemium"]);
export type ResourceCost = z.infer<typeof ResourceCost>;

export const StageSlug = z.enum([
  "foundations",
  "data-analyst",
  "data-scientist",
  "ml-engineer",
  "ai-engineer",
  "research",
  "mathematics",
]);
export type StageSlug = z.infer<typeof StageSlug>;

// ── Full §9 resource schema ─────────────────────────────────────────────────
export const ResourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  author: z.string().min(1),
  year: z.number().int().positive().optional(),
  url: z.string().optional(),
  type: ResourceType,
  level: ResourceLevel,
  cost: ResourceCost,
  // One-sentence honest verdict — what it's best at + its limitation
  verdict: z.string().min(10),
  // Who this is for and when in the sequence to use it
  useIf: z.string().min(10),
  stages: z.array(StageSlug).min(1),
  rankInTopic: z.number().int().positive(),
  lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  needsReview: z.boolean().default(false),
});
export type Resource = z.infer<typeof ResourceSchema>;

// ── Topic item (§7 section 3) ───────────────────────────────────────────────
export const TopicSchema = z.object({
  concept: z.string().min(1),
  whyItMatters: z.string().min(10),
  depth: DepthTag,
});
export type Topic = z.infer<typeof TopicSchema>;

// ── Stage frontmatter / metadata (§7 section 1) ────────────────────────────
export const StageMetaSchema = z.object({
  title: z.string(),
  identity: z.string(),
  stageNumber: z.number().int().min(0).max(4),
  slug: StageSlug,
  timeRange: z.string(),
  prerequisites: z.array(z.object({ label: z.string(), href: z.string() })),
  // 0 = Aware, 1 = Competent, 2 = Production, 3 = Expert, 4 = Principal
  depthLadderPosition: z.number().int().min(0).max(4),
});
export type StageMeta = z.infer<typeof StageMetaSchema>;

// ── Validation helpers — throw at load time on bad data ────────────────────
export function validateResources(raw: unknown[]): Resource[] {
  return raw.map((r, i) => {
    const result = ResourceSchema.safeParse(r);
    if (!result.success) {
      throw new Error(
        `resources[${i}] schema violation: ${JSON.stringify(result.error.issues, null, 2)}`,
      );
    }
    return result.data;
  });
}

export function validateTopics(raw: unknown[]): Topic[] {
  return raw.map((t, i) => {
    const result = TopicSchema.safeParse(t);
    if (!result.success) {
      throw new Error(
        `topics[${i}] schema violation: ${JSON.stringify(result.error.issues, null, 2)}`,
      );
    }
    return result.data;
  });
}

export function validateStageMeta(raw: unknown): StageMeta {
  return StageMetaSchema.parse(raw);
}
