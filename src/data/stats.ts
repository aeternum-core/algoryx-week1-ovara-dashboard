import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  FolderKanban,
  Users,
  UsersRound,
} from "lucide-react";

export interface Stat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export const stats: Stat[] = [
  {
    title: "Total Users",
    value: "12,480",
    change: "+8.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Active Teams",
    value: "248",
    change: "+5.4%",
    trend: "up",
    icon: UsersRound,
  },
  {
    title: "Active Projects",
    value: "126",
    change: "+12.1%",
    trend: "up",
    icon: FolderKanban,
  },
  {
    title: "Tasks Completed",
    value: "8,642",
    change: "+9.7%",
    trend: "up",
    icon: CheckCircle2,
  },
];