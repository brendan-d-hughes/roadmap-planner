export type Resource = {
    id: string;
    name: string;
    resourceType: string;
    team?: string;
    capacityPerDay: number;
    capabilities: string[];
    daysOff: { start: string; end: string }[];
    active: boolean;
    createdAt: number;
    updatedAt: number;
  };
  
  export type Item = {
    id: string;
    name: string;
    itemType: string;
    size: number;
    requiredResourceTypes: string[];
    requiredResourceIDs: string[];
    requiredCapabilities: string[];
    blockers: string[];
    blocks: string[];
    earliestStartDate?: string;
    dueDateTarget?: string;
    computed?: {
      start?: string;
      end?: string;
      unassignable?: boolean;
      reason?: string;
      resourceId?: string;
      criticalPath?: boolean;
      slackDays?: number;
    };
    status: string;
    statusLastChanged: number;
    projectId?: string;
    assignedResourceIDs: string[];
    resourceRelationship: "Planned" | "Firm";
    requiredTeams: string[];
    priority: number;
    createdAt: number;
    updatedAt: number;
  };
  