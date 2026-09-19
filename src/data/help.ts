import type { FAQItem } from "../types";

export const faqCategories = [
  "All",
  "Getting Started",
  "Workspace & Teams",
  "Security & Access",
  "Integrations",
];

export const faqData: FAQItem[] = [
  {
    question: "How do I invite team members to my OVARA workspace?",
    answer:
      "Administrators can navigate to Settings > Workspace or the Customers/Members directory and click 'Invite Member'. Provide their business email and assign the initial role.",
    category: "Getting Started",
  },
  {
    question: "How are role-based access controls managed?",
    answer:
      "OVARA provides granular roles (Administrator, Team Lead, Member, Viewer). Permissions can be adjusted under Settings > Security and customized per project.",
  category: "Security & Access",
  },
  {
    question: "Can I connect external webhook services to my workspace?",
    answer:
      "Yes. The Products & Modules section includes the 'Slack & Teams Bridge' and 'Custom Webhook Trigger Engine' for dispatching real-time workspace lifecycle events.",
    category: "Integrations",
  },
  {
    question: "Where can I review recent audit logs and changes?",
    answer:
      "Recent activities are continuously recorded on the Dashboard under Recent Activity and stored through the Workspace Audit Stream module for compliance reporting.",
    category: "Workspace & Teams",
  },
  {
    question: "How do I switch between light mode and dark mode?",
    answer:
      "Click the Sun/Moon icon in the top navigation bar, or toggle your appearance preference under Settings > Appearance.",
    category: "Getting Started",
  },
  {
    question: "What is the data retention policy for deleted workspace records?",
    answer:
      "Archived projects and soft-deleted records remain in the 30-day workspace recovery vault before scheduled cryptographic purge.",
    category: "Security & Access",
  },
];
