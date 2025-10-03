import { Outlet, Link, useLocation } from 'react-router-dom';
import { Settings, Mic, Bell, Puzzle, Lock, Key } from 'lucide-react';

export function SettingsLayout() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard/settings', label: 'General', icon: Settings, end: true },
    { path: '/dashboard/settings/voice', label: 'Voice Selection', icon: Mic },
    { path: '/dashboard/settings/notifications', label: 'Notifications', icon: Bell },
    { path: '/dashboard/settings/integrations', label: 'Integrations', icon: Puzzle },
    { path: '/dashboard/settings/security', label: 'Security', icon: Lock },
    { path: '/dashboard/settings/api', label: 'API Keys', icon: Key },
  ];

  const isActive = (path: string, end?: boolean) => {
    if (end) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex gap-6 h-full">
      <aside className="w-64 flex-shrink-0">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.end);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  active
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
