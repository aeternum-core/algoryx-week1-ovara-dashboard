export interface AnalyticsMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
}

export const analyticsOverviewMetrics: AnalyticsMetric[] = [
  {
    label: "Active Users (7d)",
    value: "9,840",
    change: "+14.2%",
    trend: "up",
    description: "vs. previous 7-day period",
  },
  {
    label: "Team Velocity",
    value: "94.6%",
    change: "+6.8%",
    trend: "up",
    description: "average sprint completion",
  },
  {
    label: "Project Progress",
    value: "78.4%",
    change: "+4.1%",
    trend: "up",
    description: "milestones achieved this month",
  },
  {
    label: "Task Completion Rate",
    value: "92.1%",
    change: "+3.5%",
    trend: "up",
    description: "tasks closed within SLA",
  },
];

export const weeklyActivityData = [
  { day: "Mon", activeUsers: 6400, tasksDone: 1120, heightPct: 62 },
  { day: "Tue", activeUsers: 7800, tasksDone: 1450, heightPct: 78 },
  { day: "Wed", activeUsers: 8200, tasksDone: 1530, heightPct: 84 },
  { day: "Thu", activeUsers: 9400, tasksDone: 1820, heightPct: 96 },
  { day: "Fri", activeUsers: 8900, tasksDone: 1690, heightPct: 90 },
  { day: "Sat", activeUsers: 5100, tasksDone: 820, heightPct: 48 },
  { day: "Sun", activeUsers: 4300, tasksDone: 640, heightPct: 40 },
];

export const teamEngagementBreakdown = [
  { team: "Engineering", members: 78, activeProjects: 14, completionRate: 94 },
  { team: "Product & Design", members: 42, activeProjects: 9, completionRate: 91 },
  { team: "Operations", members: 36, activeProjects: 7, completionRate: 88 },
  { team: "Customer Success", members: 54, activeProjects: 11, completionRate: 96 },
  { team: "Quality Assurance", members: 28, activeProjects: 6, completionRate: 85 },
];

export const projectMilestones = [
  { name: "Global Admin Redesign", progress: 85, dueDate: "In 4 days", lead: "Likith V" },
  { name: "Permission Granularity", progress: 100, dueDate: "Completed", lead: "Aisha Khan" },
  { name: "Audit Logging Pipeline", progress: 62, dueDate: "In 2 weeks", lead: "Rahul Mehta" },
  { name: "Workspace Search Optimization", progress: 45, dueDate: "In 3 weeks", lead: "Priya Sharma" },
];
