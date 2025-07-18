import { z } from "zod";

export const resourceSchema = z.object({
  name: z.string().min(2),
  resourceType: z.string(),
  team: z.string().optional(),
  capacityPerDay: z.number().int().positive().max(16),
  capabilities: z.array(z.string()).default([]),
  daysOff: z.array(z.object({
    start: z.string(), // ISO date
    end: z.string()
  })).default([]),
  active: z.boolean().default(true)
});

export const itemSchema = z.object({
  name: z.string().min(2),
  itemType: z.string(),
  size: z.number().positive().max(500),
  requiredResourceTypes: z.array(z.string()).default([]),
  requiredResourceIDs: z.array(z.string()).default([]),
  requiredCapabilities: z.array(z.string()).default([]),
  blockers: z.array(z.string()).default([]),
  blocks: z.array(z.string()).default([]),
  earliestStartDate: z.string().optional(),
  dueDateTarget: z.string().optional(),
  status: z.string().default("Defined"),
  projectId: z.string().optional(),
  assignedResourceIDs: z.array(z.string()).default([]),
  resourceRelationship: z.enum(["Planned","Firm"]).default("Planned"),
  requiredTeams: z.array(z.string()).default([]),
  priority: z.number().int().default(100)
});
