import { z } from 'zod';

export const workflowBlueprintSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  jurisdictions: z.array(z.string()).min(1),
  fiscalYear: z.string().regex(/^\d{4}$/),
  entities: z.array(z.string()).nonempty(),
  steps: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        type: z.enum(['ingest', 'interaction', 'calculation', 'review', 'submission']),
        rbac: z.array(z.string()).default([]),
      }),
    )
    .min(1),
});

export type WorkflowBlueprint = z.infer<typeof workflowBlueprintSchema>;
