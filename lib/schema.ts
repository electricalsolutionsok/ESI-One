import { z } from 'zod';
export const Finding = z.object({
  kind:z.enum(['inclusion','exclusion','clarification','risk']),
  title:z.string(),
  proposed_text:z.string(),
  rationale:z.string(),
  source_file:z.string(),
  source_excerpt:z.string(),
  confidence:z.enum(['high','medium','low'])
});
export const Review=z.object({
  project_name:z.string(), customer:z.string(), contact:z.string(), customer_address:z.string(), project_location:z.string(),
  bid_date:z.string(), addenda:z.array(z.string()),
  summary:z.string(), findings:z.array(Finding), missing_information:z.array(z.string()), processing_limitations:z.array(z.string())
});
export type ReviewResult=z.infer<typeof Review>;
