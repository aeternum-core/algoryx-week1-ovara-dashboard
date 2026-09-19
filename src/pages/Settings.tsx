import { useState } from "react";
import {
  Bell,
  Building2,
  Check,
  Globe,
  Laptop,
  Lock,
  Moon,
  Paintbrush,
  Save,
  ShieldCheck,
  Sun,
  User,
} from "lucide-react";
import { useSearch } from "../hooks/SearchContext";
import SearchResults from "../components/common/SearchResults";

function Settings() {
  const { searchQuery: globalQuery } = useSearch();
  const [activeTab, setActiveTab] = useState<"profile" | "workspace" | "appearance" | "notifications" | "security">("profile");

  // Interactive Form State
  const [profileData, setProfileData] = useState({
    name: "Likith V",
    email: "likith.v@ovara.platform",
    role: "Administrator",
    bio: "Administrator managing workspace configurations, administrator managing workspace settings and team operations.",
  });

  const [workspaceData, setWorkspaceData] = useState({
    workspaceName: "OVARA Central Workspace",
    subdomain: "admin@ovara.app",
    timezone: "UTC+05:30 (India Standard Time)",
    defaultRole: "Member",
  });

  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    taskAssignments: true,
    weeklyDigest: false,
    mentions: true,
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const tabs = [
    { key: "profile", label: "Profile", icon: User },
    { key: "workspace", label: "Workspace", icon: Building2 },
    { key: "appearance", label: "Appearance", icon: Paintbrush },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "security", label: "Security", icon: Lock },
  ] as const;

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {globalQuery.trim() && <SearchResults query={globalQuery} />}

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">Preferences</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Settings
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Manage your personal profile, organization preferences, and system security.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm border border-emerald-200">
            <Check className="h-4 w-4" />
            Changes saved successfully
          </div>
        )}
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2 pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all whitespace-nowrap focus:outline-none ${
                isActive
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="mt-6 max-w-3xl">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <form onSubmit={handleSave} className="ovara-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Personal Information
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Update your account details and business contact information.
              </p>
            </div>

            {/* Avatar Section */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white shadow-sm">
                LV
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{profileData.name}</p>
                <p className="text-xs text-slate-500">Administrator account</p>
                <button
                  type="button"
                  className="mt-2 rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Change Avatar
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Assigned Role
                </label>
                <input
                  type="text"
                  value={profileData.role}
                  readOnly
                  className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Workspace ID
                </label>
                <input
                  type="text"
                  value="OVARA-ORG-7782"
                  readOnly
                  className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2 text-sm text-slate-500 cursor-not-allowed font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Bio & Scope of Governance
              </label>
              <textarea
                rows={3}
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:bg-white leading-relaxed"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Workspace Tab */}
        {activeTab === "workspace" && (
          <form onSubmit={handleSave} className="ovara-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Workspace Configuration
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Configure primary domain, regional settings, and permissions baseline.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Workspace Name
                </label>
                <input
                  type="text"
                  value={workspaceData.workspaceName}
                  onChange={(e) => setWorkspaceData({ ...workspaceData, workspaceName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Internal Subdomain URL
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2">
                  <Globe className="h-4 w-4 text-slate-400 mr-2" />
                  <input
                    type="text"
                    value={workspaceData.subdomain}
                    onChange={(e) => setWorkspaceData({ ...workspaceData, subdomain: e.target.value })}
                    className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Workspace Primary Timezone
                </label>
                <select
                  value={workspaceData.timezone}
                  onChange={(e) => setWorkspaceData({ ...workspaceData, timezone: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500"
                >
                  <option>UTC+05:30 (India Standard Time)</option>
                  <option>UTC-05:00 (Eastern Time)</option>
                  <option>UTC+00:00 (Coordinated Universal Time)</option>
                  <option>UTC+01:00 (Central European Time)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Default Role for New Invites
                </label>
                <select
                  value={workspaceData.defaultRole}
                  onChange={(e) => setWorkspaceData({ ...workspaceData, defaultRole: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500"
                >
                  <option>Member</option>
                  <option>Viewer</option>
                  <option>Team Lead</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                <Save className="h-4 w-4" />
                Update Workspace
              </button>
            </div>
          </form>
        )}

        {/* Appearance Tab */}
        {activeTab === "appearance" && (
          <div className="ovara-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Interface & Theme Preferences
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Customize OVARA platform contrast and display styling.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-indigo-600 bg-slate-50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm font-semibold text-slate-900">Light / System Mode</span>
                  </div>
                  <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white">Active</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Clean crisp high-contrast layout optimized for daylight productivity.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Moon className="h-5 w-5 text-indigo-400" />
                    <span className="text-sm font-semibold text-white">Dark Mode (OVARA Dark)</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Deep slate surfaces for low-light environments. Toggle anytime via the Topbar Moon icon.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-700">Reduced Motion</p>
              <p className="mt-1 text-xs text-slate-500">
                OVARA automatically respects your operating system motion preferences via CSS media queries.
              </p>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <form onSubmit={handleSave} className="ovara-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Notification Preferences
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Choose how and when OVARA communicates important workspace events.
              </p>
            </div>

            <div className="space-y-4 divide-y divide-slate-100">
              <div className="flex items-center justify-between pt-3 first:pt-0">
                <div>
                  <p className="text-sm font-medium text-slate-900">Critical Incident Alerts</p>
                  <p className="text-xs text-slate-500">Receive urgent system notifications immediately</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.criticalAlerts}
                  onChange={(e) => setNotifications({ ...notifications, criticalAlerts: e.target.checked })}
                  className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">Task & Project Approvals</p>
                  <p className="text-xs text-slate-500">Get pinged when a milestone is submitted for review</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.taskAssignments}
                  onChange={(e) => setNotifications({ ...notifications, taskAssignments: e.target.checked })}
                  className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">Mentions & Messages</p>
                  <p className="text-xs text-slate-500">Alert when a team member directs a message or mention</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.mentions}
                  onChange={(e) => setNotifications({ ...notifications, mentions: e.target.checked })}
                  className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">Weekly Workspace Summary Digest</p>
                  <p className="text-xs text-slate-500">Curated weekly metrics and activity overview report</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.weeklyDigest}
                  onChange={(e) => setNotifications({ ...notifications, weeklyDigest: e.target.checked })}
                  className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                <Save className="h-4 w-4" />
                Save Preferences
              </button>
            </div>
          </form>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="ovara-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Security & Access Control
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Multi-factor authentication credentials and active administrative sessions.
              </p>
            </div>

            {/* 2FA Toggle */}
            <div className="rounded-xl border border-slate-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Two-Factor Authentication (2FA)
                  </p>
                  <p className="text-xs text-slate-500">
                    Require hardware key or authenticator app TOTP code on login.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  twoFactorEnabled
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </button>
            </div>

            {/* Active Sessions */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Active Admin Sessions
              </h4>

              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <Laptop className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        Antigravity IDE / Chrome (Windows)
                      </p>
                      <p className="text-xs text-slate-400">Current active session • Bengaluru, India</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    This Device
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <Laptop className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        Safari on macOS (Work Laptop)
                      </p>
                      <p className="text-xs text-slate-400">Last active 2 days ago</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-medium text-rose-600 hover:text-rose-700"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            </div>

            {/* Password UI */}
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-sm font-semibold text-slate-900 mb-3">
                Change Password
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="password"
                  placeholder="Current password"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-indigo-500"
                />
                <input
                  type="password"
                  placeholder="New password"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Settings;
