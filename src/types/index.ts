import type { LucideIcon } from "lucide-react";

export interface Stat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export interface RecordItem {
  id: number;
  name: string;
  owner: string;
  status: "In Progress" | "Completed" | "Review" | "Pending";
  updated: string;
}

export interface ActivityItem {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "team" | "task" | "project" | "system";
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  status: "Active" | "Pending" | "Onboarding" | "Inactive";
  joinedDate: string;
  lastActive: string;
  teamsCount: number;
}

export interface OrderRecord {
  id: string;
  title: string;
  requester: string;
  department: string;
  priority: "High" | "Medium" | "Low";
  status: "In Progress" | "Completed" | "Review" | "Pending";
  createdDate: string;
  updatedDate: string;
}

export interface ProductModule {
  id: string;
  name: string;
  description: string;
  category: "Core Suite" | "Integrations" | "Utilities" | "Extensions";
  version: string;
  status: "Active" | "Beta" | "Maintenance";
  activeTeams: number;
  lastUpdated: string;
}

export interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
}

export interface ConversationThread {
  id: string;
  name: string;
  role: string;
  avatarText: string;
  online: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: MessageItem[];
}

export interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  category: "alert" | "task" | "message" | "workspace";
  read: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
