import {
  CalendarDays,
  Check,
  Mail,
  MapPin,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

function ProfileCard() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <article className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            User Profile
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Account overview
          </p>
        </div>

        <button
          type="button"
          onClick={() => setProfileOpen((previous) => !previous)}
          aria-label="Open profile options"
          aria-expanded={profileOpen}
          title="Profile options"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {profileOpen && (
        <div className="absolute right-5 top-16 z-10 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
          <button
            type="button"
            onClick={() => setProfileOpen(false)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Check className="h-3.5 w-3.5" />
            Account settings
          </button>

          <button
            type="button"
            onClick={() => setProfileOpen(false)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Check className="h-3.5 w-3.5" />
            Edit profile
          </button>
        </div>
      )}

      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-lg font-semibold text-white">
          LV
        </div>

        <div className="min-w-0">
          <h4 className="truncate text-base font-semibold text-slate-900">
            Likith V
          </h4>

          <p className="mt-0.5 text-sm text-slate-500">
            Administrator
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Mail className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="truncate">admin@ovara.app</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
          <span>Workspace HQ</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" />
          <span>Joined January 2026</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        View Profile
      </button>
    </article>
  );
}

export default ProfileCard;